import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { productionStore } from "../../stores/ProductStore";
import { Navigation } from "../../components/Navigation/Navigation";
import "antd/dist/antd.css";
import { Button, Input, Form, Table, Divider, Modal } from "antd";
import "./ProductPage.css";

export const ProductPage = observer(
  (): JSX.Element => {
    const { init, products, isLoading, create, update, remove } = productionStore;
    const { Column } = Table;

    const [product, setProduct] = useState({
      name: "",
      calories: 0,
      fat: 0,
      protein: 0,
      carb: 0,
    });

    const [isCreate, setCreate] = useState(true);
    const [id, setId] = useState(0);
    const [visible, setVisible] = useState(false);

    const handleChange = (event, fieldName): void => {
      const newState = { ...product, ...{ [fieldName]: event.target.value } };
      setProduct(newState);
    };

    const handleSubmit = (): void => {
      console.log(product);

      if (isCreate) {
        create(product);
      } else {
        update(product, `${id}`);
      }

      setProduct({ name: "", calories: 0, fat: 0, protein: 0, carb: 0 });
      setCreate(true);
      setId(0);
      setVisible(false);
    };

    const handleUpdate = (id): void => {
      setId(id);
      setCreate(false);
      setProduct(products[id]);
    };

    const handleRemove = (id: number): void => {
      remove(id);
    };

    const handleModal = (): void => {
      setVisible(true);
    };

    const handleCancel = (): void => {
      setVisible(false);
    };

    useEffect(() => {
      init();
    }, []);

    return (
      <div>
        <Navigation title="Product Page" />
        {isLoading ? <span>is loading...</span> : null}
        <div className={"button-wrapper"}>
          {isCreate ? (
            <Button type="primary" onClick={handleModal}>
              create
            </Button>
          ) : (
            <Button type="primary" onClick={handleModal}>
              update
            </Button>
          )}
        </div>

        <Table dataSource={products} rowKey={(products, index) => `${index}`}>
          <Column title="Name:" dataIndex="name" />
          <Column title="Calories:" dataIndex="calories" align="right" />
          <Column title="Fat:" dataIndex="fat" align="right" />
          <Column title="Protein:" dataIndex="protein" align="right" />
          <Column title="Carb:" dataIndex="carb" align="right" />
          <Column
            title="Actions"
            align="right"
            width="250px"
            render={(text, product, index): JSX.Element => {
              return (
                <span>
                  <Button onClick={(): void => handleUpdate(index)}>update</Button>
                  <Divider type="vertical" />
                  <Button onClick={(): void => handleRemove(index)}>delete</Button>
                </span>
              );
            }}
          />
        </Table>
        <Modal
          title="Product Page"
          visible={visible}
          onOk={handleSubmit}
          onCancel={handleCancel}
          okText="save"
        >
          <Form layout="inline">
            <label>
              name
              <Input
                type="text"
                value={product.name}
                onChange={(event): void => handleChange(event, "name")}
              />
            </label>
            <label>
              calories
              <Input
                type="number"
                value={product.calories}
                onChange={(event): void => handleChange(event, "calories")}
              />
            </label>
            <label>
              fat
              <Input
                type="number"
                value={product.fat}
                onChange={(event): void => handleChange(event, "fat")}
              />
            </label>
            <label>
              protein
              <Input
                type="number"
                value={product.protein}
                onChange={(event): void => handleChange(event, "protein")}
              />
            </label>
            <label>
              carb
              <Input
                type="number"
                value={product.carb}
                onChange={(event): void => handleChange(event, "carb")}
              />
            </label>
          </Form>
        </Modal>
      </div>
    );
  },
);
