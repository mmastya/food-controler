import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { recipeStore } from "../../stores/RecipeStore";
import "./RecipePage.css";
import { Navigation } from "../../components/Navigation/Navigation";
import "antd/dist/antd.css";
import { Button, Input, Form, Table, Divider, Modal } from "antd";

export const RecipePage = observer(
  (): JSX.Element => {
    const { recipes, isLoading, init, create, update, remove } = recipeStore;
    const { Column } = Table;

    const [recipe, setRecipe] = useState({
      name: "",
      time: 0,
      description: "",
      ingredients: "",
    });

    const [id, setId] = useState(null);
    const [isCreate, setCreate] = useState(true);
    const [visible, setVisible] = useState(false);

    const handleChange = (event, fieldName): void => {
      const newRecipeState = { ...recipe, ...{ [fieldName]: event.target.value } };
      setRecipe(newRecipeState);
    };

    const handleSubmit = (): void => {
      console.log(recipe);

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

      setVisible(false);
    };

    const handleUpdate = (id): void => {
      setId(id);
      setCreate(false);
      setRecipe(recipe[id]);
    };

    const handleRemove = (id): void => {
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
        {isLoading ? <span>is loading...</span> : null}
        <Navigation title="Recipe Page" />
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
        <Table dataSource={recipes}>
          <Column title="Name:" dataIndex="name" key="name" />
          <Column title="Time:" dataIndex="time" key="time" align="right" />
          <Column title="Description:" dataIndex="description" key="description" align="right" />
          <Column title="Ingredients:" dataIndex="ingredients" key="ingredients" align="right" />
          <Column
            title="Actions:"
            align="right"
            width="250px"
            render={(text, recipe, index): JSX.Element => {
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
          title="Recipe Page"
          visible={visible}
          onOk={handleSubmit}
          onCancel={handleCancel}
          okText="save"
        >
          <Form>
            <label>
              Name:
              <Input
                type="text"
                value={recipe.name}
                onChange={(event): void => handleChange(event, "name")}
              ></Input>
            </label>
            <label>
              Time:
              <Input
                type="number"
                value={recipe.time}
                onChange={(event): void => handleChange(event, "time")}
              ></Input>
            </label>
            <label>
              Description:
              <Input
                type="text"
                value={recipe.description}
                onChange={(event): void => handleChange(event, "description")}
              ></Input>
            </label>
            <label>
              Ingredients:
              <Input
                type="text"
                value={recipe.ingredients}
                onChange={(event): void => handleChange(event, "ingredients")}
              ></Input>
            </label>
          </Form>
        </Modal>
      </div>
    );
  },
);
