import { Response } from "express"
import Category from "../models/category-model"
import { ICategory } from "../types"
import { AuthRequest } from "../middleware"

// get all categories
export const getAllCategories = async (
    request: AuthRequest,
    response: Response
  ) => {
    try {
      const { user } = request
      const categories = await Category.find({
        user: user,
      })
      return response.send(categories)
    } catch (error) {
      response.send({ error: "Something went wrong" })
      console.log("error in getAllCategories", error)
      throw error
    }
  }
// creating category
export const createCategory = async (
    request: AuthRequest,
    response: Response
  ) => {
    try {
      const { color, icon, name }: ICategory = request.body
      const { user } = request
  
      const category = await Category.create({
        color,
        icon,
        name,
        user,
      })
      response.send(category)
    } catch (error) {
      console.log("error in createCategory", error)
      response.send({ error: "Something went wrong" })
      throw error
    }
  }

  //delete category

  export const deleteCategory = async (
    request: AuthRequest,
    response: Response
  ) => {
    try {
      const { id } = request.params
      const category = await Category.deleteOne({
        _id: id,
      })
      response.send({ message: "Category deleted successfully" })
    } catch (error) {
      response.send({ error: "Error in deleting the category", details: error.message })
      throw error
    }
  }


  // update ctagory
  export const updateCategory = async (
    request: AuthRequest,
    response: Response
  ) => {
    try {
      const { _id, color, icon, isEditable, name }: ICategory = request.body
      await Category.updateOne(
        {
          _id,
        },
        {
          $set: {
            name,
            color,
            icon,
            isEditable,
          },
        }
      )
      response.send({ message: "Category updated successfully" })
    } catch (error) {
      console.log("error in updateCategory", error)
      response.send({ error: "Error in updating the category" })
      throw error
    }
  }

  