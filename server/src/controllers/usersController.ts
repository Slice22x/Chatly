import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.user.findMany();
    res.json(allUsers);
  }
  catch (e) {
    console.error(e);
    res.status(500).json({message:"Something went wrong"});
  }
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, bio, username, clerkId } = req.body;
    const user = await prisma.user.create({
      data:{
        clerkId,
        name,
        email,
        bio,
        username
      }
    })
    res.status(201).json(user)
  }
  catch (e) {
    console.log(e);
    res.status(500).json({message:"Something went wrong see error"})
  }

}