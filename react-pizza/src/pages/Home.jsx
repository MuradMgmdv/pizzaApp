import React from "react";
import { useEffect, useState } from "react";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";

function Home() {
  const [items, setItems] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  useEffect(() => {
    
    const sortBy = sortType.sortProperty.replace('-', '')
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
    const category = categoryId > 0 ? `category=${categoryId}` : ''

    fetch(
      `https:62f4c3c7535c0c50e761b9aa.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`,
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
      });
    window.scrollTo(0, 0); // чтобы страница начиналась сверху, это для верстки
  }, [categoryId, sortType]);


  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(i) => setCategoryId(i)}
        />

        <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
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
    </div>
  );
}

export default Home;
