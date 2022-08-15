import { useEffect, useState, useContext } from "react";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";

function Home() {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const currentPage = useSelector((state) => state.filter.currentPage)

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  useEffect(() => {
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    axios
      .get(
        `https:62f4c3c7535c0c50e761b9aa.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => setItems(res.data));

    window.scrollTo(0, 0); // чтобы страница начиналась сверху, это для верстки
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />

        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {items.map((obj) => (
          <PizzaBlock
            key={obj.id}
            title={obj.title}
            price={obj.price}
            image={obj.imageUrl}
            sizes={obj.sizes}
            types={obj.types}
          />
        ))}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
