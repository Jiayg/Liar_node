export interface IJwtPayload {
    readonly id: number;
    readonly groups: { name: string }[];
    readonly iat: number;
    readonly exp: number;
    readonly token: string;
  }
