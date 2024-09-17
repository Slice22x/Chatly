"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpecificChat = exports.updateChat = exports.getChats = exports.createChat = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const currentUserId = (_a = req.query.currentUser) === null || _a === void 0 ? void 0 : _a.toString();
        const otherUser = (_b = req.query.otherUser) === null || _b === void 0 ? void 0 : _b.toString();
        const otherUserId = yield prisma.user.findUnique({
            where: { username: otherUser },
        });
        const chat = yield prisma.chatLogs.create({
            data: {
                betweenUser1: currentUserId,
                betweenUser2: otherUserId.clerkId,
            },
        });
        res.json(chat);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.createChat = createChat;
const getChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const currentUserId = (_a = req.query.currentUser) === null || _a === void 0 ? void 0 : _a.toString();
        const chat = yield prisma.chatLogs.findMany({
            where: {
                OR: [{ betweenUser1: currentUserId }, { betweenUser2: currentUserId }],
            },
        });
        res.json(chat);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getChats = getChats;
const updateChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        //   CREATE THE MESSAGE
        const { message } = req.body;
        const chatId = (_a = req.query.chatId) === null || _a === void 0 ? void 0 : _a.toString();
        const currentUserId = (_b = req.query.currentUser) === null || _b === void 0 ? void 0 : _b.toString();
        const chat = yield prisma.chatLogs.findUnique({ where: { id: chatId } });
        const newMessage = {
            senderId: currentUserId,
            recipientId: currentUserId === chat.betweenUser1
                ? chat.betweenUser2
                : chat.betweenUser1,
            message: message,
        };
        //   UPDATE THE CHAT
        const updatedChat = yield prisma.chatLogs.update({
            where: { id: chatId },
            data: { messages: [...chat.messages, newMessage] },
        });
        res.json(updatedChat);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.updateChat = updateChat;
const getSpecificChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const currentUserId = (_a = req.query.currentUser) === null || _a === void 0 ? void 0 : _a.toString();
        const otherUser = (_b = req.query.otherUser) === null || _b === void 0 ? void 0 : _b.toString();
        const otherUserId = yield prisma.user.findUnique({
            where: { username: otherUser },
        });
        const chat = yield prisma.chatLogs.findMany({
            where: {
                OR: [
                    {
                        betweenUser1: currentUserId,
                        AND: [{ betweenUser2: otherUserId.clerkId }],
                    },
                    {
                        betweenUser2: currentUserId,
                        AND: [{ betweenUser1: otherUserId.clerkId }],
                    },
                ],
            },
        });
        res.json(chat);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getSpecificChat = getSpecificChat;
