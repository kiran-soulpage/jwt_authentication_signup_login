import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "GET request not allowed" });
    return;
  }

  // check user exists or not in db
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      password: true,
    },
  });

  if (user) {
    const authenticated = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (authenticated) {
      const token = jwt.sign({ id: user.id }, "kiran", { expiresIn: "1h" });
      res.status(200).json({ xtoken: token });
    } else {
      res.status(401).json({ message: "please provide valid details" });
    }
  } else {
    res.status(400).json({ message: "please provide valid details" });
  }
}
