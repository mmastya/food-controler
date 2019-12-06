import { observable, runInAction } from "mobx";
import { Recipes } from "../models/Recipes";

export class RecipesStore {
  @observable recipes: Recipes[];
  constructor() {
    runInAction(() => {
      this.recipes = [];
    });
  }
}
