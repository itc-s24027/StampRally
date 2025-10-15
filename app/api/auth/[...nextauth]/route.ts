import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

/*
このファイル構造で
/api/auth/signin → ログイン画面
/api/auth/signout → ログアウト
/api/auth/session → セッション確認
が自動で動くようになるらしい
 */

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
