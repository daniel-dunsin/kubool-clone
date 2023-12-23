import secrets from "../constants/secrets.const";
import { User } from "../schema/interfaces/user.interface";
import { sign, verify } from "jsonwebtoken";

interface JWTPayload {
  username: string;
  id: number;
}

class JWT {
  private readonly decode = async function (): Promise<string> {
    return await Buffer.from(secrets.jwtSecret).toString("ascii");
  };

  public sign = async (user: User): Promise<string> => {
    return await sign({ username: user.username, id: user.id }, await this.decode(), { expiresIn: "1d" });
  };

  public verify = async (token: string): Promise<JWTPayload> => {
    return (await verify(token, await this.decode())) as JWTPayload;
  };
}

const JWTHelper = new JWT();
export default JWTHelper;
