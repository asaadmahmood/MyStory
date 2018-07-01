export interface UserMsg {
    msgId: number,
    user: string,
    firstName: string,
    lastName: string,
    public: boolean,
    message: string,
    date: string,
    editing: boolean,
    deleted: boolean
}
