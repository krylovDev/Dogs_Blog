import { UserType } from '../types/types';

export const getAuthUser = (): UserType | undefined => {
  if (localStorage.getItem('user') !== null) {
    return JSON.parse(localStorage.getItem('user') as string) as UserType;
  }
  return undefined;
};
