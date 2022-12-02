import bcrypt from "bcrypt";
// import db from "lib/db.server";
import { Prisma } from "@prisma/client";
import prisma from "lib/prisma";
import { NextApiResponse, NextApiRequest } from "next";
// import { ApiRequest, ApiResponse } from "lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "GET request not allowed" });
    return;
  }

  // check email exists or not in db
  const user: any = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    //create new user
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(req.body.password, salt, async function (err, hash) {
        try {
          // hash the raw password
          const password_hash = hash;
          req.body.password = password_hash;
          // create new user
          const savedUser = await prisma.user.create({
            data: req.body,
          });
          //   res.status(200).json("user");
          res.status(200).json({ message: "signup is successful" });
        } catch (error) {
          if (error instanceof Prisma.PrismaClientValidationError) {
            res.status(400).json({ errors: error.message.split(/\n/) });
          }
        }
      });
    });
  } else {
    res.status(400).json({ message: "email address already taken" });
  }
}
