import { observable, action, runInAction, toJS } from "mobx";
import { Meal } from "../models/Meal";

export class MealStore {
  @observable meals: Meal[];
  @observable isLoading: boolean;
  constructor() {
    runInAction(() => {
      this.meals = [];
      this.isLoading = true;

      this.init = this.init.bind(this);
      this.create = this.create.bind(this);
      this.update = this.update.bind(this);
      this.remove = this.remove.bind(this);
    });
  }

  @action
  init(): void {
    this.isLoading = true;
    fetch("https://localhost:5000/api/meals")
      .then((response) => response.json())
      .then(
        action((meals: Meal[]) => {
          this.meals = meals;
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
  create(meal: Meal): void {
    this.isLoading = true;
    fetch("https://localhost:5000/api/meal", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(toJS(meal)),
    })
      .then((response) => response.json())
      .then(
        action((meal: Meal) => {
          this.meals.push(meal);
        }),
      );
  }

  @action
  update(meal: Meal, id: string): void {
    this.isLoading = true;
    fetch(`https://localhost:5000/api/meal/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(toJS(meal)),
    })
      .then((response) => response.json())
      .then(
        action((meal: Meal) => {
          this.meals[id] = meal;
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
    fetch(`https://localhost:5000/api/meal/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(
        action(() => {
          this.meals.filter((value, index) => index !== id);
        }),
      );
  }
}

export const mealStore = new MealStore();
