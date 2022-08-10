import React from "react";
import Categories from "./components/Categories";
import Header from "./components/Header";
import PizzaBlock from "./components/PizzaBlock";
import Sort from "./components/Sort";
import "./scss/app.scss";
import pizzas from "./assets/pizza.json";

function App() {
  return (
    <div className="wrapper">
      <Header />

      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />

            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((el, i) => (
              <PizzaBlock
                key={el.id}
                title={el.title}
                price={el.price}
                image={el.imageUrl}
                sizes={el.sizes}
                types={el.types}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
