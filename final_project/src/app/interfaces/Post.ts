export interface Post{
    id: string,
    user: string,
    dogName: string,
    dogNickNames: string[],
    dogGender: string,
    dogBreed: string,
    lostOn: Date;
    lostZone: string,
    lostDescription: string,
    dogDescription: string,
    photos: string[]
}
