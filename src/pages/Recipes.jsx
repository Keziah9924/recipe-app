import { useEffect, useState } from "react"
import PreviousSearches from "../components/PreviousSearches"
import RecipeCard from "../components/RecipeCard"
import Layout from "./Layout"
import { RECIPE_API } from "../api/config"
import axios from "axios"

export default function Recipes() {
    const recipesList = [
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

    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                axios.all([
                    (await RECIPE_API.get('/search.php?f=a')).data.meals,
                    (await RECIPE_API.get('/search.php?f=b')).data.meals,
                    (await RECIPE_API.get('/search.php?f=c')).data.meals,
                    (await RECIPE_API.get('/search.php?f=d')).data.meals,
                    (await RECIPE_API.get('/search.php?f=e')).data.meals
                ]).then(axios.spread((a, b, c) => {
                    setRecipes([...a, ...b, ...c]);
                }));
            } catch (error) {
                console.log(error.message)
            }
        }

        fetchRecipes()
    },[])
    return (
        <Layout>
            <div>
                <PreviousSearches />
                <div className="recipes-container">
                    {recipes.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} />
                    ))}

                </div>
            </div>
        </Layout>
    )
}
