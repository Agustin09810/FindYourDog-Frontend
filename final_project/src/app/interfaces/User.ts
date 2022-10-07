import { Message } from "./Message";
export interface User{
    id:string,
    username:string,
    password:string,
    profileImg: string,
    messages: Message[]
    
}