import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const search = req.query.search?.toString();
    const allUsers = await prisma.user.findMany({
      where: { username: { contains: search } },
    });
    res.json(allUsers);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const selectedUsername = req.query.selectedUsername?.toString();
    const currentUsername = req.query.currentUsername?.toString();
    const bio = req.query.bio?.toString();
    const action = req.query.action?.toString();

    switch (action) {
      case "request":
        const upd = await prisma.user.update({
          where: { username: selectedUsername },
          data: { friendRequests: [currentUsername!] },
        });
        res.json(upd);
        break;
      case "accept": {
        let allUsers = await prisma.user.findMany({
          where: { username: { contains: currentUsername } },
        });
        let thisUser = allUsers[0];
        allUsers = await prisma.user.findMany({
          where: { username: { contains: selectedUsername } },
        });
        let otherUser = allUsers[0];
        const newRequestsList = thisUser.friendRequests.filter(
          (user) => user === currentUsername,
        );
        const newFriendsList = [
          ...thisUser.friends,
          {
            username: selectedUsername!,
            name: otherUser.name,
            clerkId: otherUser.clerkId,
          },
        ];
        thisUser = await prisma.user.update({
          where: { username: currentUsername },
          data: { friendRequests: newRequestsList, friends: newFriendsList },
        });
        otherUser = await prisma.user.update({
          where: { username: selectedUsername },
          data: {
            friendRequests: [
              ...otherUser.friendRequests.filter(
                (user) => user === selectedUsername,
              ),
            ],
            friends: [
              ...otherUser.friends,
              {
                username: currentUsername!,
                name: thisUser.name,
                clerkId: thisUser.clerkId,
              },
            ],
          },
        });
        res.json({ thisUser, otherUser });
        break;
      }
      case "reject":
        let allUsers = await prisma.user.findMany({
          where: { username: { contains: currentUsername } },
        });
        let thisUser = allUsers[0];
        allUsers = await prisma.user.findMany({
          where: { username: { contains: selectedUsername } },
        });
        let otherUser = allUsers[0];
        const newRequestsList = thisUser.friendRequests.filter(
          (user) => user === currentUsername,
        );
        thisUser = await prisma.user.update({
          where: { username: currentUsername },
          data: { friendRequests: newRequestsList },
        });
        otherUser = await prisma.user.update({
          where: { username: selectedUsername },
          data: {
            friendRequests: [
              ...otherUser.friendRequests.filter(
                (user) => user === selectedUsername,
              ),
            ],
          },
        });
        res.json({ thisUser, otherUser });
        break;
      case "bio":
        {
          let allUsers = await prisma.user.findMany({
            where: { username: { contains: currentUsername } },
          });
          let thisUser = allUsers[0];

          thisUser = await prisma.user.update({
            where: { username: currentUsername },
            data: { bio: bio },
          });
          res.json(thisUser);
        }
        break;
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, bio, username, clerkId } = req.body;
    const user = await prisma.user.create({
      data: {
        clerkId,
        name,
        email,
        bio,
        username,
      },
    });
    res.status(201).json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong see error" });
  }
};
