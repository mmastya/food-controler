import { observable, action, runInAction } from "mobx";
import { Product } from "../models/Product";

export class ProductStore {
  @observable products: Product[];
  constructor() {
    runInAction(() => {
      this.products = [];
    });

    this.init = this.init.bind(this);
  }

  @action
  init(): void {
    fetch("https://localhost:5000/api/products")
      .then((response) => response.json())
      .then(
        action((products: Product[]) => {
          this.products = products;
        }),
      )
      .catch((error) => {
        console.error(error);
      });
  }
}

export const productionStore = new ProductStore();
