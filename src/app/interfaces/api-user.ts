export interface User {
    user: {
        userId: number,
        firstName: string,
        lastName: string,
        username: string,
        email: string,
        password: string,
        status: boolean,
        publicCount: number,
        privateCount: number,
        profilePic: string,
        active: boolean,
        token: string
    };
}
