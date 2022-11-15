import { Department } from "./Department";
import { Message } from "./Message";

export interface User{
    id:string,
    contactsUsernames:string[],
    chatsIds:string[],
    username:string,
    password:string,
    profileImg: string,
    postsIds:string[];
    messages: Message[],
    departmentId: string
    
}