import { Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { randomBytes, randomUUID } from 'crypto';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';
import prisma from './prisma';

export const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const existUser = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!existUser) throw new Error('해당 이메일로 가입한 적이 없습니다.');

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          existUser.password
        );

        if (!passwordMatch) throw new Error('비밀번호 오류 입니다.');

        return existUser as any;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString('hex');
    },
  },
  callbacks: {
    async signIn({ user, profile }) {
      if (profile) {
        console.log('signIn profile : ', profile);
      }
      console.log('signIn user : ', user);
      console.log('signIn profile : ', profile);
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.profileImg = user.profileImg;
        token.provider = user.provider;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('session: ', session);
      if (session.user) {
        session.user.id = token.id as string;
        session.user.image = token.profileImg as string;
        session.user.role = token.role as Role;
        session.user.provider = token.provider as string;
      }
      console.log('session: ', session);
      return session;
    },
  },
  secret: process.env.SECRET,
};
