export interface Post{
    id: string,
    user: string,
    dogName: string,
    dogBreed: string,
    lostOn: Date;
    photos: string[],
}