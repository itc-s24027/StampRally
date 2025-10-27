import NextAuth, { NextAuthOptions, User, Account, Profile } from "next-auth";// 認証を管理
import GoogleProvider from "next-auth/providers/google";// 「Googleアカウント」のログイン機能
import { PrismaAdapter } from "@auth/prisma-adapter";// NextAuth と Prisma を接続する
import { prismaClient } from "@/lib/prismaClient"; // Prisma で DB 接続

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prismaClient), // NextAuthとPrismaをつなぐアダプター
    session: { strategy: "jwt" as const }, // JWT = JSON形式のデータを安全にやり取りするための仕組み
    secret: process.env.NEXTAUTH_SECRET, // セッションの暗号化
    providers: [ // ログイン方法（今回は Google のみ）
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    events: {
        // ユーザーがサインインしたときに呼ばれる関数
        async signIn({
                         user,
                         account,
                         profile
        }: {
            user: User
            account: Account | null
            profile?: Profile
        })  {
            // サインインしたユーザーが学生テーブルに存在しなければ処理を中断する
            if (!user?.id) return;

            const existing = await prismaClient.user.findUnique({
                where: { id: user.id }
            })
            if (!existing) {
                await prismaClient.user.create({
                    data: {
                        id: user.id,
                        name: user.name ?? "",
                        email: user.email ?? "",
                    },
                })
            }
        },
    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST };
