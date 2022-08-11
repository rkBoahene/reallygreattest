import { messageModel } from '../model/messageModel';
import { myUsersModel } from '../model/myUsersModel';
const axios = require('axios');

async function addMessage(req: any, res: any, next: any) {
    try {
        const { from, to, message } = req.body;
        // console.log(from, to, message)
        const data = await messageModel.create({
            message,
            users: [from, to],
            sender: from
        });
        if (data) return res.json({ msg: 'Message added successfully' });
        return res.json({ msg: 'Failed to add message to database' });
    } catch (error) {
        next(error);
    }
}

async function getAllMessage(req: any, res: any, next: any) {
    try {
        const { from, to } = req.body;
        const messages = await messageModel
            .find({
                users: {
                    $all: [from, to]
                }
            })
            .sort({ updatedAt: 1 });
            console.log(messages)
        const projectMessage = messages.map((msg: any) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message
            };
        });
        res.json(projectMessage);
    } catch (error) {
        next(error);
    }
}

async function getAllUsers(req: any, res: any, next: any) {
    try {
        
        const users = await myUsersModel.find();
        return res.json({status: true, data: users});
    } catch (error) {
        next(error);
    }
}

export { addMessage, getAllMessage, getAllUsers };
