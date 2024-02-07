import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  image: string;
  role: string;
  provider: string;
}

export type AuthStore = {
  user: User | null;
  setUser: (user: User) => void; // 로그인 시 사용자 정보 설정
  signOut: () => void; // 로그아웃 시 사용자 정보를 null로 설정
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null, // 초기 상태에서 사용자 정보는 null
      setUser: (user) => set({ user }), // 로그인 시 사용자 정보를 상태에 저장
      signOut: () => set({ user: null }), // 로그아웃 시 사용자 정보를 null로 설정
    }),
    {
      name: 'user-store', // 로컬 스토리지에 저장될 때 사용할 키 이름
      storage: createJSONStorage(() => localStorage), // 사용할 스토리지 타입 지정
    }
  )
);
