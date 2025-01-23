import PreviousSearches from "../components/PreviousSearches"
import RecipeCard from "../components/RecipeCard"

export default function Recipes(){
    const recipes = [
        {
            title: "Fruit Salad",
            image: "/images/food/114.jpg",
            authoring: "/images/top chef/14.jpg",
        },
        {
            title: "Fruit Salad",
            image: "/images/food/115.jpg",
            authoring: "/images/top chef/15.jpg",
            
        },
        {
            title: "Fruit Salad",
            image: "/images/food/116.jpg",
            authoring: "/images/top chef/16.jpg",
        },
        {
            title: "Fruit Salad",
            image: "/images/food/117.jpg",
            authoring: "/images/top chef/17.jpg",
        },
        {
            title: "Fruit Salad",
            image: "/images/food/118.jfif",
            authoring: "/images/top chef/18.jpg",
        },
        {
            title: "Fruit Salad",
            image: "/images/food/119.jfif",
            authoring: "/images/top chef/19.jpg",
        }
        ].sort(() => Math.random() - 0.5)
   
    return(
        <div>
       <PreviousSearches />
       <div className="recipes-container">
        {/* <RecipeCard /> */}
        {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
    
    ) )}
        
       </div>
       </div>
    )
}
 