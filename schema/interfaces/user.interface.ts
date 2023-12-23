export interface User {
  id?: number;
  username: string;
  email?: string;
  password?: string;
  comparePassword?(password: string): Promise<boolean>;
}
