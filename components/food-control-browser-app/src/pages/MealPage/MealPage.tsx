import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { mealStore } from "../../stores/MealStore";
import "./MealPage.css";
import { Navigation } from "../../components/Navigation/Navigation";
import "antd/dist/antd.css";
import { Button, Input, Form, Table, Divider, Modal } from "antd";

export const MealPage = observer(
  (): JSX.Element => {
    const { init, meals, isLoading, create, update, remove } = mealStore;
    const { Column } = Table;

    const [meal, setMeal] = useState({
      name: "",
      calories: 0,
      grams: 0,
      vegetarian: "",
    });

    const [id, setId] = useState(null);
    const [isCreate, setCreate] = useState(true);
    const [visible, setVisible] = useState(false);

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
      setVisible(false);
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
        {isLoading ? <span>...is loading</span> : null}
        <Navigation title="Meal Page" />
        <div className={"button-wrapper"}>
          {isCreate ? (
            <Button type="primary" onClick={handleModal}>
              create
            </Button>
          ) : (
            <Button type="primary">update</Button>
          )}
        </div>
        <Table dataSource={meals}>
          <Column title="Name:" dataIndex="name" key="name" />
          <Column title="Calories:" dataIndex="calories" key="calories" align="right" />
          <Column title="Grams:" dataIndex="grams" key="grams" align="right" />
          <Column title="Vegetarian:" dataIndex="vegetarian" key="vegetarian" align="right" />
          <Column
            title="Actions:"
            align="right"
            width="250px"
            render={(text, Meal, index): JSX.Element => {
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
          title="Meal Page"
          visible={visible}
          onOk={handleSubmit}
          onCancel={handleCancel}
          okText="save"
        >
          <Form>
            <label>
              Name
              <Input
                type="text"
                value={meal.name}
                onChange={(event): void => {
                  handleChange(event, "name");
                }}
              ></Input>
            </label>
            <label>
              Calories
              <Input
                type="number"
                value={meal.calories}
                onChange={(event): void => {
                  handleChange(event, "calories");
                }}
              ></Input>
            </label>
            <label>
              Grams
              <Input
                type="number"
                value={meal.grams}
                onChange={(event): void => {
                  handleChange(event, "grams");
                }}
              ></Input>
            </label>
            <label>
              Vegetarian
              <Input
                type="text"
                value={meal.vegetarian}
                onChange={(event): void => {
                  handleChange(event, "vegetarian");
                }}
              ></Input>
            </label>
          </Form>
        </Modal>
      </div>
    );
  },
);
