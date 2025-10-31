"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QuestionDTO } from "@/lib/types";
import LogoutBotton from "@/app/_components/LogoutBotton";
import CompleteModal from "@/app/_components/Complete";

export type Stamp = {
    id: number;
    result: boolean;
};

export default function QuestionsPage() {
    const [questions, setQuestions] = useState<QuestionDTO[]>([]);
    const [stamps, setStamps] = useState<Stamp[]>([]);
    const [loading, setLoading] = useState(true);
    const [showComplete, setShowComplete] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 質問一覧を取得
                const qRes = await fetch("/api/questionRegistry");
                const qData = await qRes.json();

                // スタンプ情報を取得
                const sRes = await fetch("/api/record/answer");
                const sData = await sRes.json();

                setQuestions(qData || []);
                setStamps(sData.stamps || []);
            } catch (error) {
                console.error("データ取得エラー:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // ✅ スタンプ6個でモーダルを表示
    useEffect(() => {
        if (stamps.filter((s) => s.result).length === 6) {
            setShowComplete(true);
        }
    }, [stamps]);

    if (loading) return <p>読み込み中...</p>;

    return (
        <main className="text-center">
            <h1 className="text-2xl font-bold m-4 ">問題一覧</h1>

            <h1 className="text-2xl font-bold mb-4"><span className="fs-4">縺懊ｓ縺ｶ縺ｧ</span>問題一覧<span className="fs-4">縺ｪ縺ｪ繧ゅｓ</span></h1>
            {questions.map((q) => {
                const qId = Number(q.id);
                const foundStamp = stamps.find((s) => s.id === qId);
                const isDone = foundStamp?.result ?? false;

                return (
                    <button
                        key={q.id}
                        onClick={() => {
                            if (isDone) return;
                            router.push(`/questions/${q.id}`);
                        }}
                        className="btn border-0 w-50 h-50"
                    >
                        <div className="card">
                            <div
                                className={`card-img ${
                                    isDone ? "bg-success-subtle" : ""
                                } text-muted`}
                            >
                                {q.id}F
                                <h5 className="card-title">第{q.id}問</h5>
                            </div>
                        </div>
                    </button>
                );
            })}

            <br />
            {/*<LogoutBotton />*/}

            {/* 🎉 モーダルを手動で出すボタン */}
            {stamps.filter((s) => s.result).length === 6 && (
                <button
                    className="btn btn-outline-secondary mt-3"
                    onClick={() => setShowComplete(true)}
                >
                    コンプリート画面を確認する
                </button>
            )}

            {/* 🎉 コンプリートモーダル */}
            <CompleteModal
                show={showComplete}
                onClose={() => setShowComplete(false)}
            />
        </main>
    );
}
