import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { productionStore } from "../../stores/ProductStore";
import { Product } from "../../models/Product";

export const ProductPage = observer(
  (): JSX.Element => {
    const { init, products, isLoading, create, update, remove } = productionStore;

    const [product, setProduct] = useState({
      name: "",
      calories: 0,
      fat: 0,
      protein: 0,
      carb: 0,
    });

    const [isCreate, setCreate] = useState(true);
    const [id, setId] = useState(0);

    const handleChange = (event, fieldName): void => {
      const newState = { ...product, ...{ [fieldName]: event.target.value } };
      setProduct(newState);
    };

    const handleSubmit = (event): void => {
      console.log(product);
      event.preventDefault();

      if (isCreate) {
        create(product);
      } else {
        update(product, `${id}`);
      }

      setProduct({ name: "", calories: 0, fat: 0, protein: 0, carb: 0 });
      setCreate(true);
      setId(0);
    };

    const handleUpdate = (id): void => {
      setId(id);
      setCreate(false);
      setProduct(products[id]);
    };

    const handleRemove = (id: number): void => {
      remove(id);
    };

    useEffect(() => {
      init();
    }, []);

    return (
      <div>
        {isLoading ? <span>is loading...</span> : null}
        <ul>
          {products.map((product: Product, index: number) => (
            <li key={index}>
              <span>Name: {product.name} </span>
              <br />
              <span>Calories: {product.calories}</span>
              <br />
              <span>Fat: {product.fat}</span>
              <br />
              <span>Protein: {product.protein}</span>
              <br />
              <span>Carb: {product.carb}</span>
              <br />
              <button onClick={(): void => handleUpdate(index)}>update</button>
              <button onClick={(): void => handleRemove(index)}>delete</button>
            </li>
          ))}
        </ul>
        {isCreate ? <button>create</button> : <button>update</button>}
        <form onSubmit={handleSubmit}>
          <label>
            name
            <input
              type="text"
              value={product.name}
              onChange={(event): void => handleChange(event, "name")}
            />
          </label>
          <label>
            calories
            <input
              type="number"
              value={product.calories}
              onChange={(event): void => handleChange(event, "calories")}
            />
          </label>
          <label>
            fat
            <input
              type="number"
              value={product.fat}
              onChange={(event): void => handleChange(event, "fat")}
            />
          </label>
          <label>
            protein
            <input
              type="number"
              value={product.protein}
              onChange={(event): void => handleChange(event, "protein")}
            />
          </label>
          <label>
            carb
            <input
              type="number"
              value={product.carb}
              onChange={(event): void => handleChange(event, "carb")}
            />
          </label>
          <button>save </button>
        </form>
      </div>
    );
  },
);
