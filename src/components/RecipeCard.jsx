// import React from 'react'
import UseImage from "./UseImage"

// const RecipeCard = (props) => {
//   return (
//     <div>RecipeCard</div>
//   )
// }

// export default RecipeCard
// 

export default function RecipeCard({ recipe }) {
    return (
        <div className="recipe-card">
            <UseImage imgSrc={recipe.strMealThumb} pt="65%" />
            <div className="recipe-card-info">
                {/*<img className="auther-img" src={recipe.authoring} alt=""/>*/}
                <p className="recipe-title">{recipe.strMeal}</p>
                {/*<p className="recipe-desc">lorem Ipisum is simply dummy text of the printing and typesetting industry.</p>*/}
                <div>
                    <a className="view-btn" href={`recipe/${recipe.idMeal}`}>View Recipe</a>
                </div>
            </div>
        </div>
    )
}   