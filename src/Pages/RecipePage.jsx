// import React from 'react'

// import {useState, useEffect } from "react";


// const apiUrl = "www.themealdb.com/api/json/v1/1/search.php?s=";

// const [isLoading, setIsLoading] = useState(false);
//   const [query,setQuery] = useState("");
//   const [recipes, setRecipes] = useState([]);

//   // function to search for the recipes

//   const searchRecipes = async () => {
//     setIsLoading(true);
//     const url = apiUrl + query;
//     const res = await fetch(url);
//     const data = await res.json();
//     // console.log(data);
//     setRecipes(data.meals);
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     searchRecipes();

//   }, [])

// const RecipePage = () => {
//   return (
//     <div>RecipePage</div>
//   )
// }

// export default RecipePage