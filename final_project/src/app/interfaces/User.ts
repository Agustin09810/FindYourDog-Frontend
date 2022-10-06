import { Message } from "./Message";
export interface User{
    username:string,
    password:string,
    profileImg: string,
    messages: Message[]
    
}