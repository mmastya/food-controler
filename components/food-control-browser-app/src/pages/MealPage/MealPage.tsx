import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { mealStore } from "../../stores/MealStore";
import { Meal } from "../../models/Meal";

export const MealPage = observer(
  (): JSX.Element => {
    const { init, meals, isLoading, create, update, remove } = mealStore;

    const [meal, setMeal] = useState({
      name: "",
      calories: 0,
      grams: 0,
      vegetarian: "",
    });

    const [id, setId] = useState(null);
    const [isCreate, setCreate] = useState(true);

    const handleChange = (event, fieldName): void => {
      const newMealState = { ...meal, ...{ [fieldName]: event.target.value } };
      setMeal(newMealState);
    };

    const handleSubmit = (event): void => {
      console.log(meal);
      event.preventDefault();

      if (isCreate) {
        create(meal);
      } else {
        update(meal, `${id}`);
      }

      setMeal({
        name: "",
        calories: 0,
        grams: 0,
        vegetarian: "",
      });
      setCreate(true);
      setId(null);
    };

    const handleUpdate = (id): void => {
      setCreate(false);
      setId(id);
      setMeal(meals[id]);
      console.log(id);
    };

    const handleRemove = (id: number): void => {
      remove(id);
    };

    useEffect(() => {
      init();
    }, []);

    return (
      <div>
        {isLoading ? <span>...is loading</span> : null}
        <h1>MealPage</h1>
        <ul>
          {meals.map((meal: Meal, index: number) => (
            <li key={index}>
              <div>Name: {meal.name}</div>
              <div>Calories: {meal.calories}</div>
              <div>Grams: {meal.grams}</div>
              <div>Vegetarian: {meal.vegetarian}</div>
              <button onClick={(): void => handleUpdate(index)}>UPDATE</button>
              <button onClick={(): void => handleRemove(index)}>DELETE</button>
            </li>
          ))}
        </ul>
        {isCreate ? <button>CREATE</button> : <button>UPDATE</button>}
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              value={meal.name}
              onChange={(event): void => {
                handleChange(event, "name");
              }}
            ></input>
          </label>
          <label>
            Calories
            <input
              type="number"
              value={meal.calories}
              onChange={(event): void => {
                handleChange(event, "calories");
              }}
            ></input>
          </label>
          <label>
            Grams
            <input
              type="number"
              value={meal.grams}
              onChange={(event): void => {
                handleChange(event, "grams");
              }}
            ></input>
          </label>
          <label>
            Vegetarian
            <input
              type="text"
              value={meal.vegetarian}
              onChange={(event): void => {
                handleChange(event, "vegetarian");
              }}
            ></input>
          </label>
          <button>SAVE</button>
        </form>
      </div>
    );
  },
);
