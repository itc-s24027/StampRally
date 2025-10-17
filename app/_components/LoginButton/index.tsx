"use client";

import {signIn} from "next-auth/react";
import Image from "next/image";
import styles from "./index.module.css"

export default function Index() {

    return (
        <>
            <button className={styles.loginButton} onClick={() => signIn("google" , {callbackUrl: "http://localhost:3000/questions"})}>
                <Image src="/images/web_light_sq_SI@3x.png" alt="" width={567} height={120} />
            </button>
        </>
    );
}