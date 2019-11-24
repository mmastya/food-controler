import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { productionStore } from "../../stores/ProductStore";
import { Product } from "../../models/Product";

export const Home = observer(
  (): JSX.Element => {
    const { init, products } = productionStore;

    useEffect(() => {
      init();
    }, []);

    return (
      <div>
        <h1>home</h1>
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
      </div>
    );
  },
);
