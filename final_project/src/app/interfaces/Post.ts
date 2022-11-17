export interface Post{
    id: string,
    user: string,
    dogName: string,
    dogNicknames: string[],
    dogGender: string,
    dogBreed: string,
    lostOn: Date;
    lostZone: string,
    lostDescription: string,
    dogDescription: string,
    photos: string[]
}
