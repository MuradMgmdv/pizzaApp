import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";



function FullPizza() {
  const [pizza, setPizza] = useState()
  const params = useParams();
  const navigate = useNavigate()

  useEffect(() => {
     async function fetchPizza() {
     try {
      const res = await axios.get("https://62f4c3c7535c0c50e761b9aa.mockapi.io/items/" + params.id)
      setPizza(res.data)
     } catch (error) {
       alert('Ошибка при получении пиццы!')
       navigate('/')
     }
     }

     fetchPizza()
  }, []);
  
  if (!pizza) {
   return 'Загрузка...'
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} /> 
       <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
}

export default FullPizza;
