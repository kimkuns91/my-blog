import 'next-auth';

declare module 'next-auth' {
  interface User {
    _id: string;
    email: string;
    name: string;
    profileImg: string;
    role: string;
    provider: string;
    createdAt: Date;
    emailVerified: Date;
  }
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
      role: string;
      provider: string;
    };
  }
  interface Token {
    user: {
      id: string;
      email: string;
      name: string;
      profileImg: string;
      role: string;
      provider: string;
    };
  }
}
