import React from "react";
import { useEffect, useState } from "react";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";

function Home() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("https:62f4c3c7535c0c50e761b9aa.mockapi.io/items")
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
      });
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />

        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {items.map((el, i) => (
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
    </>
  );
}

export default Home;
