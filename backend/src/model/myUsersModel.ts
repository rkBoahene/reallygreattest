import { Schema, model, connect, Types } from 'mongoose';

interface MyUsers {
    userId: string,
    user: object;
    blocked: boolean;
}

const myUsersSchema = new Schema<MyUsers>(
    {
        userId: {
            type: String,
            required: true
        },
        user: {
            type: Object,
            required: true
        },
        blocked: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
);



const myUsersModel = model<MyUsers>('MyUsers', myUsersSchema);
export {myUsersModel}