export interface User {
  username: string;
  email?: string;
  password: string;
  comparePassword?(password: string): boolean;
}
