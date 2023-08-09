import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '../../../lib/prisma'
import bcrypt from 'bcrypt'

const authOptions: AuthOptions
    = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            //@ts-ignore
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid Credentials")
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email 
                    }, include: {
                        categories:true
                    }
                })
                if (!user || !user?.password) {
                    throw new Error("This user does not exist")
                }
                const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);
                if (!isCorrectPassword) {
                    throw new Error("Email and password does not match")
                }

                return user
            }
        })
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    name:user.name,
                    isAdmin: user.isAdmin,
                    // @ts-ignore
                    categories: user.categories,
               }
            }
            return token
        },
        async session({session, token, user}) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id, 
                    name:token.name,
                    isAdmin: token.isAdmin,
                    categories: token.categories
                    
                }
            };
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };