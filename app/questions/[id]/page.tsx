"use client"

import styles from "./page.module.css"
import {useState} from "react";

export default function Question(id: number) {
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

    const [inputPass, setInputPass] = useState('');

    // 入力値が変更されるたびに実行されるハンドラ
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        // Stateを新しい入力値で更新
        setInputPass(event.target.value);
    };

    const questions = JSON.parse(JSON.stringify(questionsData));

    questions.map((question: questionData) => {
        if (question.id === id) {
            const handleSubmit = () => {
                if (question.password === inputPass) {
                    return (
                        <>
                            <main>
                                <div className={styles.question}>
                                    <h1 className="text-2xl font-bold mb-6 bg-gray-200 p-2 rounded">問題を選択してください</h1>
                                    <h1>{question.questionDescription.title}</h1>
                                    <p>{question.questionDescription.content}</p>
                                </div>
                            </main>
                        </>
                    )
                }
            };
            handleSubmit();
        }
    }
    )

            return (
                <>
                    <div className={styles.question}>
                        <h1>パスワードが違います</h1>
                    </div>
                </>
            )
    }