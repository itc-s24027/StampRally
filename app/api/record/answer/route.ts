import { NextResponse } from 'next/server';
import supabase from '@/lib/supabaseClient';

// POSTリクエストで回答を受け取り、判定・保存する
export async function POST(request: Request) {
    // 1. 回答データの受け取りと基本チェック
    const formData = await request.formData();
    // FormDataの値はstringかFileなので、型を明示的に取得
    const questionId = formData.get("questionId") as string | null;
    const userAnswer = formData.get("userAnswer") as string | null;
    const userId = formData.get("userId") as string | null;

    // パラメータチェック
    if (!questionId || userAnswer === null || !userId) {
        return NextResponse.json({
            success: false,
            error: "パラメータ不足: questionId, userAnswer, userIdのいずれかが欠けています。"
        }, { status: 400 });
    }

    // --- 2. 該当の問題から正解を取得 ---
    const { data: questionData, error: questionError } = await supabase
        .from("Questions")
        .select("correct_answer")
        .eq("id", questionId)
        .single();

    if (questionError) {
        console.error("問題データ取得エラー:", questionError);

        const errorMessage = questionError.code === 'PGRST116' // Supabaseでデータが見つからない時のコード (NotFound)
            ? "指定された問題IDが見つかりませんでした。無効な問題です。"
            : "問題データを読み込む際にサーバー側でエラーが発生しました。";

        return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }

    // --- 3. 判定ロジック ---
    const correctAnswer = questionData.correct_answer;
    // DBから取得した正解とユーザーの回答を厳密に比較
    const isCorrect = userAnswer === correctAnswer;

    let stampObtained = false; // スタンプ取得フラグの初期化

    // --- 4. 回答履歴をAnswersテーブルに保存 ---
    const { error: answerError } = await supabase
        .from("Answers")
        .insert({
            user_id: userId,
            question_id: questionId,
            answer: userAnswer,
            is_correct: isCorrect,
        });

    if (answerError) {
        console.error("回答保存エラー:", answerError);

        let errorMessage = "回答履歴の保存中に予期せぬエラーが発生しました。";
        if (answerError.code === '23503') {
            errorMessage = "ユーザーIDまたは問題IDが無効です。登録されていないIDで保存しようとしました。";
        } else if (answerError.code === '23502') {
            errorMessage = "回答の必須情報が欠けているため保存できませんでした。";
        }

        return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }

    // --- 5. 正解の場合、Stampsテーブルにスタンプを付与 ---
    if (isCorrect) {
        // 5-1. スタンプの二重登録チェック
        const { data: existingStamp, error: selectStampError } = await supabase
            .from("Stamps")
            .select("id")
            .eq("user_id", userId)
            .eq("question_id", questionId)
            .maybeSingle();

        if (selectStampError) {
            console.error("スタンプ存在チェックエラー:", selectStampError);
            // 致命的でないため処理は続行
        }

        // 5-2. スタンプがなければ新規挿入
        if (!existingStamp) {
            const { error: insertStampError } = await supabase
                .from("Stamps")
                .insert({
                    user_id: userId,
                    question_id: questionId,
                    obtained: true,
                });

            if (insertStampError) {
                console.error("スタンプ挿入エラー:", insertStampError);
                // スタンプの付与は失敗したが、回答自体は正解と記録されているため成功扱い
            } else {
                stampObtained = true; // 新規スタンプ取得フラグを立てる
            }
        }
    }

    // 6. 最終的な結果を返却
    const message = isCorrect
        ? (stampObtained ? "正解！スタンプゲット！" : "正解！(スタンプは取得済みです)")
        : "残念...不正解";

    return NextResponse.json({
        success: true,
        is_correct: isCorrect,
        stamp_newly_obtained: stampObtained,
        message: message
    }, { status: 200 });
}