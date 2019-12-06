import { observable, action, runInAction, toJS } from "mobx";
import { Product } from "../models/Product";

export class ProductStore {
  @observable products: Product[];
  @observable isLoading: boolean;
  constructor() {
    runInAction(() => {
      this.products = [];
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
    fetch("https://localhost:5000/api/products")
      .then((response) => response.json())
      .then(
        action((products: Product[]) => {
          this.products = products;
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
  create(product: Product): void {
    this.isLoading = true;
    fetch("https://localhost:5000/api/product", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(toJS(product)),
    })
      .then((response) => response.json())
      .then(
        action((product: Product) => {
          this.products.push(product);
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
  update(product: Product, id: string): void {
    console.log(product, id);
    this.isLoading = true;
    fetch(`https://localhost:5000/api/product/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(toJS(product)),
    })
      .then((response) => response.json())
      .then(
        action((product: Product) => {
          this.products[id] = product;
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
    fetch(`https://localhost:5000/api/product/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(
        action(() => {
          console.log();
          this.products = this.products.filter((value, index) => index !== id);
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

export const productionStore = new ProductStore();
