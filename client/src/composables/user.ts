import * as firebase from 'firebase/app';
import 'firebase/auth';
import { reactive, computed, InjectionKey } from '@vue/composition-api';

export default function useUser() {
  const state = reactive({
    user: {} as firebase.User,
  });

  const setUser = (user: firebase.User | null) => {
    state.user = user ?? {} as firebase.User;
  };

  const getUser = () => {
    return state.user;
  };

  const user = computed(() => state.user);

  return {
    user,
    getUser,
    setUser,
  };
};

export type UserStore = ReturnType<typeof useUser>;
export const UserKey: InjectionKey<UserStore> = Symbol('UserStore');
