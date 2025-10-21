// 問題詳細画面

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface QuestionPageProps {
    params: Promise<{ id: string }>;
}

export default async function QuestionPage({ params }: QuestionPageProps) {
    const { id } = await params;

    const cookieStore = await cookies();
    const authCookie = cookieStore.get(`auth_question_${id}`);

    // 認証用クッキーがない場合、パスワード要求画面へリダイレクト
    if (!authCookie || !authCookie.value) {
        redirect(`/questions/${id}/auth`);
    }

    return (
        <main>
            <h1>問題 {id}</h1>
            <p>ここに問題文を表示します</p>
        </main>
    );
}