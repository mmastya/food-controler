import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { recipeStore } from "../../stores/RecipeStore";
import { Recipe } from "../../models/Recipe";

export const RecipePage = observer(
  (): JSX.Element => {
    const { recipes, isLoading, init, create, update, remove } = recipeStore;

    const [recipe, setRecipe] = useState({
      name: "",
      time: 0,
      description: "",
      ingredients: "",
    });

    const [id, setId] = useState(null);
    const [isCreate, setCreate] = useState(true);

    const handleChange = (event, fieldName): void => {
      const newRecipeState = { ...recipe, ...{ [fieldName]: event.target.value } };
      setRecipe(newRecipeState);
    };

    const handleSubmit = (event): void => {
      console.log(recipe);
      event.preventDefault();

      if (isCreate) {
        create(recipe);
      } else {
        update(recipe, `${id}`);
      }

      setRecipe({
        name: "",
        time: 0,
        description: "",
        ingredients: "",
      });

      setId(null);
      setCreate(true);
    };

    const handleUpdate = (id): void => {
      setId(id);
      setCreate(false);
      setRecipe(recipe[id]);
    };

    const handleRemove = (id): void => {
      remove(id);
    };

    useEffect(() => {
      init();
    }, []);
    return (
      <div>
        {isLoading ? <span>is loading...</span> : null}
        <ul>
          {recipes.map((recipe: Recipe, index: number) => (
            <li key={index}>
              <div>Name: {recipe.name}</div>
              <div>Time: {recipe.time}</div>
              <div>Description: {recipe.description}</div>
              <div>Ingredients: {recipe.ingredients}</div>
              <button onClick={(): void => handleUpdate(index)}>UPDATE</button>
              <button onClick={(): void => handleRemove(index)}>DELETE</button>
            </li>
          ))}
        </ul>
        {isCreate ? <button>CREATE</button> : <button>UPDATES</button>}
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={recipe.name}
              onChange={(event): void => handleChange(event, "name")}
            ></input>
          </label>
          <label>
            Time:
            <input
              type="number"
              value={recipe.time}
              onChange={(event): void => handleChange(event, "time")}
            ></input>
          </label>
          <label>
            Description:
            <input
              type="text"
              value={recipe.description}
              onChange={(event): void => handleChange(event, "description")}
            ></input>
          </label>
          <label>
            Ingredients:
            <input
              type="text"
              value={recipe.ingredients}
              onChange={(event): void => handleChange(event, "ingredients")}
            ></input>
          </label>
          <button>SAVE</button>
        </form>
      </div>
    );
  },
);
