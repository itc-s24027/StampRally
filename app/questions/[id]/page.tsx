"use client"

import styles from "./page.module.css"
import React, {useMemo, useState} from "react";
import QuestionPage from "@/app/_components/QuestionPage";

type QuestionProps = {
    params: Promise<{
        id: number; // 受け取る Props も数値 (number) で定義します。これが正解です。
    }>
}

type questionData = {
    id: number,
    password: string,
    questionDescription:
        {
            title: string,
            content: string,
            answer: string,
        }
}

const questionsData : questionData[] =[
    {
        id: 1,
        password: "12345",
        questionDescription: {
            title: "第1問",
            content: "*****",
            answer: "***"
        }
    },
    {
        id: 2,
        password: "123456",
        questionDescription: {
            title: "第2問",
            content: "*****",
            answer: "***"
        }
    }
]

export default function Question({ params }: QuestionProps) {

    const [inputPass, setInputPass] = useState('');

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        // Stateを新しい入力値で更新
        setInputPass(event.target.value);
    };

    const unwrappedParams = React.use(params);
    const id = Number(unwrappedParams.id)

    const questionToDisplay = useMemo(() => {
        // question.id (number) === id (number) で比較
        return questionsData.find(question => question.id === id);
    }, [id]);

    console.log(typeof id);

    if (!questionToDisplay) return <h1>ページが存在しません</h1>

    const handleSubmit = () => {
        if (questionToDisplay.password === inputPass) {
            <QuestionPage id={questionToDisplay.id} password={questionToDisplay.password} questionDescription={questionToDisplay.questionDescription} />
        }
        return <h1>パスワードが違います</h1>
    };
    return (
        <>
            <input
                type="text"
                value={inputPass}
                onChange={handleChange}
                placeholder="ここに入力してください"
            />
            <button onClick={handleSubmit}>
                送信
            </button>
        </>
    );
}