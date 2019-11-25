import { observable, action, runInAction } from "mobx";
import { Meal } from "../models/ Meal";

export class MealStore {
  @observable meal: Meal[];
  constructor() {
    runInAction(() => {
      this.meal = [];
    });

    this.initialization = this.initialization.bind(this);
  }

  @action
  initialization(): void {
    fetch("https://localhost:5000/api/meal")
      .then((response) => response.json())
      .then(
        action((meal: Meal[]) => {
          this.meal = meal;
        }),
      );
  }
}

export const mealStore = new MealStore();
