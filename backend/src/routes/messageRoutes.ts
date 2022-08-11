import { Router } from "express";
import { addMessage, getAllMessage,getAllUsers } from "../controllers/messagesController";

const router = Router()

router.post("/sendmessage/",addMessage)

router.get("/getmessages/",getAllMessage)

router.get("/allusers/",getAllUsers)

export { router }