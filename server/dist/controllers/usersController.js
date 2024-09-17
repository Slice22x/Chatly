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
exports.createUser = exports.updateUser = exports.getAllUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const search = (_a = req.query.search) === null || _a === void 0 ? void 0 : _a.toString();
        const allUsers = yield prisma.user.findMany({
            where: { username: { contains: search } },
        });
        res.json(allUsers);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getAllUsers = getAllUsers;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const selectedUsername = (_a = req.query.selectedUsername) === null || _a === void 0 ? void 0 : _a.toString();
        const currentUsername = (_b = req.query.currentUsername) === null || _b === void 0 ? void 0 : _b.toString();
        const bio = (_c = req.query.bio) === null || _c === void 0 ? void 0 : _c.toString();
        const action = (_d = req.query.action) === null || _d === void 0 ? void 0 : _d.toString();
        switch (action) {
            case "request":
                const upd = yield prisma.user.update({
                    where: { username: selectedUsername },
                    data: { friendRequests: [currentUsername] },
                });
                res.json(upd);
                break;
            case "accept": {
                let allUsers = yield prisma.user.findMany({
                    where: { username: { contains: currentUsername } },
                });
                let thisUser = allUsers[0];
                allUsers = yield prisma.user.findMany({
                    where: { username: { contains: selectedUsername } },
                });
                let otherUser = allUsers[0];
                const newRequestsList = thisUser.friendRequests.filter((user) => user === currentUsername);
                const newFriendsList = [
                    ...thisUser.friends,
                    {
                        username: selectedUsername,
                        name: otherUser.name,
                        clerkId: otherUser.clerkId,
                    },
                ];
                thisUser = yield prisma.user.update({
                    where: { username: currentUsername },
                    data: { friendRequests: newRequestsList, friends: newFriendsList },
                });
                otherUser = yield prisma.user.update({
                    where: { username: selectedUsername },
                    data: {
                        friendRequests: [
                            ...otherUser.friendRequests.filter((user) => user === selectedUsername),
                        ],
                        friends: [
                            ...otherUser.friends,
                            {
                                username: currentUsername,
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
                let allUsers = yield prisma.user.findMany({
                    where: { username: { contains: currentUsername } },
                });
                let thisUser = allUsers[0];
                allUsers = yield prisma.user.findMany({
                    where: { username: { contains: selectedUsername } },
                });
                let otherUser = allUsers[0];
                const newRequestsList = thisUser.friendRequests.filter((user) => user === currentUsername);
                thisUser = yield prisma.user.update({
                    where: { username: currentUsername },
                    data: { friendRequests: newRequestsList },
                });
                otherUser = yield prisma.user.update({
                    where: { username: selectedUsername },
                    data: {
                        friendRequests: [
                            ...otherUser.friendRequests.filter((user) => user === selectedUsername),
                        ],
                    },
                });
                res.json({ thisUser, otherUser });
                break;
            case "bio":
                {
                    let allUsers = yield prisma.user.findMany({
                        where: { username: { contains: currentUsername } },
                    });
                    let thisUser = allUsers[0];
                    thisUser = yield prisma.user.update({
                        where: { username: currentUsername },
                        data: { bio: bio },
                    });
                    res.json(thisUser);
                }
                break;
        }
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.updateUser = updateUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, bio, username, clerkId } = req.body;
        const user = yield prisma.user.create({
            data: {
                clerkId,
                name,
                email,
                bio,
                username,
            },
        });
        res.status(201).json(user);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong see error" });
    }
});
exports.createUser = createUser;
