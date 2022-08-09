import { Schema, model, connect, Types } from 'mongoose';

interface Messages {
    message: string;
    users: string[];
    sender?: string;
}

const messageSchema = new Schema<Messages>(
    {
        message: {
            type: String,
            required: true
        },
        users: Array,
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
);

const messageModel = model<Messages>('Messages', messageSchema);
export {messageModel}