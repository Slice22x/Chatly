import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createChat = async (req: Request, res: Response) => {
  try {
    const currentUserId = req.query.currentUserId?.toString();
    const otherUser = req.query.otherUser?.toString();
    const otherUserId = await prisma.user.findUnique({
      where: { username: otherUser },
    });
    const chat = await prisma.chatLogs.create({
      data: {
        betweenUser1: currentUserId!,
        betweenUser2: otherUserId!.clerkId,
      },
    });
    res.json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getChats = async (req: Request, res: Response) => {
  try {
    const currentUserId = req.query.currentUser?.toString();
    const chat = await prisma.chatLogs.findMany({
      where: {
        OR: [{ betweenUser1: currentUserId }, { betweenUser2: currentUserId }],
      },
    });
    res.json(chat);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateChat = async (req: Request, res: Response) => {
  try {
    //   CREATE THE MESSAGE
    const { message } = req.body;
    const chatId = req.query.chatId?.toString();
    const currentUserId = req.query.currentUser?.toString();
    const chat = await prisma.chatLogs.findUnique({ where: { id: chatId } });
    const newMessage = {
      senderId: currentUserId!,
      recipientId:
        currentUserId === chat!.betweenUser1
          ? chat!.betweenUser2
          : chat!.betweenUser1,
      message: message,
    };
    //   UPDATE THE CHAT
    const updatedChat = await prisma.chatLogs.update({
      where: { id: chatId },
      data: { messages: [...chat!.messages, newMessage] },
    });
    res.json(updatedChat);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getSpecificChat = async (req: Request, res: Response) => {
  try {
    const currentUserId = req.query.currentUser?.toString();
    const otherUser = req.query.otherUser?.toString();
    const otherUserId = await prisma.user.findUnique({
      where: { username: otherUser },
    });
    const chat = await prisma.chatLogs.findMany({
      where: {
        OR: [
          {
            betweenUser1: currentUserId,
            AND: [{ betweenUser2: otherUserId!.clerkId }],
          },
          {
            betweenUser2: currentUserId,
            AND: [{ betweenUser1: otherUserId!.clerkId }],
          },
        ],
      },
    });
    res.json(chat);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
  }
};
