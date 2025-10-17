"use client";

import {signIn, signOut, useSession} from "next-auth/react";
import Image from "next/image";

type question = {
    id: string,
    password: number,
    questionDescription:
        {
            title: string,
            content: string,
            answer: string,
        }
}

const questions = {
    question: [
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
}

export default function Index() {
    const {data: session} = useSession();

    return (
        <>
            <button onClick={() => signIn("google" , {callbackUrl: "http://localhost:3000/questions"})}>
                <Image src="/images/web_neutral_sq_SI@3x.png" alt="" width={250} height={60} />
            </button>
        </>
    );
}