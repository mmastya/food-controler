import { observable, action, runInAction, toJS } from "mobx";
import { Recipe } from "../models/Recipe";

export class RecipeStore {
  @observable recipes: Recipe[];
  @observable isLoading: boolean;
  constructor() {
    runInAction(() => {
      this.recipes = [];
      this.isLoading = true;
    });

    this.init = this.init.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  @action
  init(): void {
    this.isLoading = true;
    fetch("https://localhost:5000/api/recipes")
      .then((response) => response.json())
      .then(
        action((recipes: Recipe[]) => {
          this.recipes = recipes;
        }),
      )
      .catch((error) => {
        console.error(error);
      })
      .finally(
        action(() => {
          this.isLoading = false;
        }),
      );
  }

  @action
  create(recipe: Recipe): void {
    this.isLoading = true;
    fetch("https://localhost:5000/api/recipe", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(toJS(recipe)),
    })
      .then((response) => response.json())
      .then(
        action((recipe: Recipe) => {
          this.recipes.push(recipe);
        }),
      )
      .catch((error) => {
        console.error(error);
      })
      .finally(
        action(() => {
          this.isLoading = false;
        }),
      );
  }

  @action
  update(recipe: Recipe, id: string): void {
    this.isLoading = true;
    fetch(`https://localhost:5000/api/recipe/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(toJS(recipe)),
    })
      .then((response) => response.json())
      .then(
        action((recipe: Recipe) => {
          this.recipes[id] = recipe;
        }),
      )
      .catch((error) => {
        console.error(error);
      })
      .finally(
        action(() => {
          this.isLoading = false;
        }),
      );
  }

  @action
  remove(id: number): void {
    this.isLoading = true;
    fetch(`https://localhost:5000/api/recipe/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(
        action(() => {
          this.recipes = this.recipes.filter((value, index) => index !== id);
        }),
      )
      .catch((error) => {
        console.error(error);
      })
      .finally(
        action(() => {
          this.isLoading = false;
        }),
      );
  }
}

export const recipeStore = new RecipeStore();
