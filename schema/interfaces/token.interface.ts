import { TokenType } from "../enums/token.enum";

export interface Token {
  id?: number;
  username: string;
  value: string;
  type: TokenType;
}
