import type { User } from '@/api/interfaces/user.interface';
import { create } from 'zustand';
import { checkAuthAction } from '../actions/check-auth.action';
import { registerAction } from '../actions/register.action';

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

type AuthState = {
    //Properties
    user: User | null,
    token: string | null,
    authStatus: AuthStatus,
    // Getters
    isAdmin: () => boolean;
  // isAdmin: boolean;
    //Actions
    register: (email: string, password: string, fullname: string) => Promise<boolean>
    logout: () => void;
    checkAuthStatus: () => Promise<boolean>;
};

export const useRegisterStore = create<AuthState>()((set, get) => ({
  //Imprementgación del Store
  user: null,
  token: null,
  authStatus: 'checking',

  // Getters
  isAdmin: () => {
    const roles = get().user?.roles || [];
    return roles.includes('admin');
    // return !! get().user?.roles.includes('admin)
  },

  //Actions
  register: async(email: string, password: string, fullname: string) => {
    console.log({email, password, fullname});

    try {
      const data = await registerAction(email, password, fullname);
      localStorage.setItem('token',data.token);

      set({ user: data.user, token: data.token, authStatus: 'authenticated' })
      return true;

    } catch (error) {
      localStorage.removeItem('token');
      set({ user: null, token: null, authStatus: 'not-authenticated' });
      return false;
    }
   
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, authStatus: 'not-authenticated' });
  },

  checkAuthStatus: async() => {

    try {
      const { user, token } = await checkAuthAction();
      set({
        user: user,
        token: token,
        authStatus: 'authenticated'
      });
      return true;
    } catch (error) {
      set({
        user: undefined,
        token: undefined,
        authStatus: 'not-authenticated'
      });
      return false;     
    }
  },

}));



// export const useCounterStore = create((set) => ({
//   count: 100,
//   inc: () => set((state: { count: number; }) => ({ count: state.count + 1 })),
//   dec: () => set((state: { count: number; }) => ({ count: state.count - 1 })),
//   incBy: (value: number) => set((state: { count: number; }) => ({ count: state.count + value })),
// }))
