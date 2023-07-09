import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user-model";

const createUser = async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body

    // Finding if the user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return response.status(409).send("User already exists")
    }

    // encrypting the password
    const hashedPassword = await bcrypt.hash(password, 12)
// creating user
    const user = await User.create({
      name,
      email,
      hashedPassword,
    })
    return response.status(201).send({message:"User created succesfully"})
  } catch (error) {
    console.log("error in creating user", error)
    throw error
  }
};
export default createUser
