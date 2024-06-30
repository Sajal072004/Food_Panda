import foodModel from "../models/foodModel.js";

import fs from "fs";

const addFood = async (req, res) => {
  console.log(req.body);
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.status(200).json({
      success: true,
      message: "Food added",
      data: food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "not able to add",
    });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.status(201).json({
      message: "Fetched all the food items",
      success: true,
      data: foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.status(201).json({
      message: "Deleted the food item",
      success: true,
      data: food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export { addFood, listFood, removeFood };
