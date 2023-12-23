export interface SignUpDTO {
  username: string;
  password: string;
}

export interface SignInDTO {
  username?: string;
  email?: string;
  password: string;
}

export interface UpdateEmailDTO {
  userId: number;
  email: string;
}

export interface UpdateUsernameDTO {
  userId: number;
  username?: string;
}
