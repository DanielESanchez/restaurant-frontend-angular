import { Role } from "./role";

export interface ResponseToken {
    token: string,
    expiration: string,
    roles: Role[]
}