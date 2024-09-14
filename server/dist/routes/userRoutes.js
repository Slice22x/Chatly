"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const router = (0, express_1.Router)();
router.get("/", usersController_1.getAllUsers);
router.post("/", usersController_1.createUser);
exports.default = router;
