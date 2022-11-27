import { Message } from "./Message";

export interface UserLogin{
    contactsUsernames:string[],
    chatsIds:string[],
    username:string,
    email:string,
    password:string,
    profileImg: string,
    postsIds:string[];
    messages: Message[],
    departmentId: string,
    status: string,
    
}