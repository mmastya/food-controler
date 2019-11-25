import { Product } from "./models/Product";
import { Meal } from "./models/ Meal";

export const products: Product[] = [
  {
    name: "bread",
    calories: 100,
    fat: 100,
    protein: 100,
    carb: 100,
  },
  {
    name: "apple",
    calories: 100,
    fat: 100,
    protein: 100,
    carb: 100,
  },
  {
    name: "milk",
    calories: 100,
    fat: 100,
    protein: 100,
    carb: 100,
  },
  {
    name: "banana",
    calories: 100,
    fat: 100,
    protein: 100,
    carb: 100,
  },
  {
    name: "pepsi",
    calories: 100,
    fat: 100,
    protein: 100,
    carb: 100,
  },
];

export const meal: Meal[] = [
  {
    name: "Pilaf",
    calories: 350,
    grams: 150,
    vegetarian: false,
  },
  {
    name: "Chicken breast with vegetables",
    calories: 200,
    grams: 250,
    vegetarian: false,
  },
  {
    name: "Toast with avocado",
    calories: 350,
    grams: 200,
    vegetarian: true,
  },
  {
    name: "Buckwheat porridge with broccoli",
    calories: 350,
    grams: 250,
    vegetarian: true,
  },
  {
    name: "Ham and Cheese Omelet",
    calories: 350,
    grams: 250,
    vegetarian: false,
  },
];
