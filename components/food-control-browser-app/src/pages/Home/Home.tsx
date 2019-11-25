import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { productionStore } from "../../stores/ProductStore";
import { Product } from "../../models/Product";
import { mealStore } from "../../stores/MealStore";
import { Meal } from "../../models/ Meal";
import "./Home.css";

export const Home = observer(
  (): JSX.Element => {
    const { init, products } = productionStore;
    const { initialization, meal } = mealStore;

    useEffect(() => {
      init();
    }, []);

    useEffect(() => {
      initialization();
    }, []);

    return (
      <div className={"home"}>
        <h1 className={"title"}>home</h1>
        <h2 className={"product-title"}>Products</h2>
        <ul>
          {products.map((product: Product, index: number) => (
            <li key={index}>
              <span>Name: {product.name}</span>
              <br />
              <span>Calories: {product.calories}</span>
              <br />
              <span>Fat: {product.fat}</span>
              <br />
              <span>Protein: {product.protein}</span>
              <br />
              <span>Carb: {product.carb}</span>
              <br />
            </li>
          ))}
        </ul>
        <h2 className={"meal-title"}>Meal</h2>
        <ul>
          {meal.map((meal: Meal, index: number) => (
            <li key={index}>
              <p>Name: {meal.name}</p>
              <p>Calories: {meal.calories}</p>
              <p>Grams: {meal.grams}</p>
              <p>Vegetarian: {meal.vegetarian}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
