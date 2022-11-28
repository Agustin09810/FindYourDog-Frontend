import { Department } from "./Department";
import { Message } from "./Message";

export interface User{
    contactsUsernames:string[],
    chatsIds:string[],
    username:string,
    email:string,
    profileImg: string,
    postsIds:string[];
    messages: Message[],
    departmentId: string,
    status: string,
    
}