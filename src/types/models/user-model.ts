export interface IGetAllUsers {
    users: UserModel[]
}

export interface UserModel {
    firstName: string,
    lastName: string,
    age: number,
}