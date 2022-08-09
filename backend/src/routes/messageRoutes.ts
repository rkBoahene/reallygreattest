import { Router } from "express";
import { addMessage, getAllMessage } from "../controllers/messagesController";

const router = Router()

router.post("/sendmessage/",addMessage)

router.get("/getmessags/",getAllMessage)

export { router }