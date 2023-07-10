import { LoginInfo } from "./login";

export interface SignUpUser extends LoginInfo{
    firstName: string;
    lastName: string;
}