import React, { useCallback, useEffect,  useRef } from "react";
import qs from "qs";
import { useSelector } from "react-redux";

import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import Sort, { list } from "../components/Sort";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { useNavigate } from "react-router-dom";
import { fetchPizzas, SearchPizzaParams } from "../redux/slices/pizzaSlice";
import { RootState, useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const items = useSelector((state: RootState) => state.pizza.items);
  const categoryId = useSelector((state: RootState) => state.filter.categoryId);
  const sortType = useSelector((state: RootState) => state.filter.sort.sortProperty);
  const currentPage = useSelector((state: RootState) => state.filter.currentPage);
  const searchValue = useSelector((state: RootState) => state.filter.searchValue);



  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      })
    );
  };

  useEffect(() => {
    if (window.location.search) {
     
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams
      const sort = list.find((obj) => obj.sortProperty === params.sortBy);
     
      dispatch(setFilters({ 
        searchValue: params.search,
        categoryId: Number(params.category),
        currentPage: Number(params.currentPage),
        sort: sort || list[0],
       }));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);
   
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />

        <Sort />
      </div>
      <h2 className="content__title">?????? ??????????</h2>
      <div className="content__items">
        {items.map((obj: any) => (
       <PizzaBlock key={obj.id}
         id={obj.id}
         title={obj.title}
         price={obj.price}
         image={obj.imageUrl}
         sizes={obj.sizes}
         types={obj.types}
         rating={obj.rating}
       />
     
        ))}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
