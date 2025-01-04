export interface User {
  id?: string;
  email: string;
}

export interface UserState {
  user: User | null;
  loading: boolean;
  error: { status: number; message: string } | null;
}

export const initialUsertate: UserState = {
  user: null,
  loading: false,
  error: null,
};
