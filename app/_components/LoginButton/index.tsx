"use client";

import {signIn, signOut, useSession} from "next-auth/react";
import Image from "next/image";

export default function Index() {
    const {data: session} = useSession();

    if (session) {
        return (
            <div>
                <p>{session.user?.name}</p>
                <button onClick={() => signOut()}>ログアウト</button>
            </div>
        );
    }

    return (
        <>
            <button onClick={() => signIn("google")}>
                <Image src="/images/web_neutral_sq_SI@3x.png" alt="" width={250} height={60} />
            </button>
        </>
    );
}