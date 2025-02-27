import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RECIPE_API } from '../api/config';
import Layout from './Layout';
import UseImage from '../components/UseImage';
import { ImYoutube2 } from "react-icons/im";
import axios from 'axios';
import { useAtomValue } from 'jotai';
import { AuthToken } from '../store';
import { jwtDecode } from 'jwt-decode';
import { FaCediSign } from "react-icons/fa6";

const extractGrams = (measure) => {
    const match = measure.match(/(\d+g)/); // Match the part ending in 'g'
    return match ? match[1] : measure; // Return the 'g' part, or original measure if no match
};

const RecipePage = () => {
    const params = useParams();
    const [single, setSingle] = useState({});
    const [paymentAmount, setPaymentAmount] = useState('')

    useEffect(() => {
        const fetchSingle = async () => {
            try {
                const response = await RECIPE_API.get(`/lookup.php?i=${params.id}`);
                if (response.status === 200) {
                    setSingle(response.data.meals[0]);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchSingle();
    }, [params.id]);

    useEffect(() => {
        setPaymentAmount(getRandomPrice())
    }, [paymentAmount])

    const ingredients = Object.keys(single)
        .filter((key) => key.startsWith("strIngredient") && single[key]) // Filter for non-empty ingredients
        .map((key) => {
            const ingredientNumber = key.replace("strIngredient", ""); // Extract number
            const measure = extractGrams(single[`strMeasure${ingredientNumber}`] || ""); // Extract 'g' part
            return {
                ingredient: single[key],
                measure: measure,
            };
        });

    const formatInstructions = (instructions) => {
        if (!instructions) return [];
        return instructions
            .split(". ")
            .filter((step) => step.trim()) // Remove any empty steps
            .map((step, index) => `${step.trim()}`);
    };

    const instructions = formatInstructions(single.strInstructions);

    function getRandomPrice() {
        return Math.floor(Math.random() * 20) + 1;
    }


    const token = useAtomValue(AuthToken)
    const handlePayment = async () => {
        const userData = jwtDecode(token)
        const { email: userEmail } = userData

        const paymentResponse = await axios.post(
            `${process.env.REACT_APP_PAYSTACK_API}/transaction/initialize`,
            { email: userEmail, amount: (paymentAmount * 100), currency: 'GHS', callback_url: process.env.REACT_APP_CALLBACK_URL },
            {
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_PAYSTACK_API_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            }
        )

        if (paymentResponse.status === 200) {
            window.open(paymentResponse.data.data.authorization_url, "_blank")
        }
    }

    return (
        <Layout>
            <div className="recipe-card" style={{ flexDirection: 'column', marginBottom: 30 }}>
                <UseImage imgSrc={single.strMealThumb} pt="65%" />
                <div className="recipe-card-info" >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p className="recipe-title" style={{ fontSize: 30 }}>{single.strMeal}</p>
                        <p style={{display: 'flex', alignItems: 'center', fontSize: 23}}><FaCediSign/><strong>{paymentAmount}.00</strong></p>
                    </div>
                    <p>Meal Category: {single.strCategory}</p>
                    <div>
                        <table className='ingredients-table'>
                            <thead>
                                <tr>
                                    <th>Ingredients</th>
                                    <th>Measurement</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ingredients.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.ingredient}</td>
                                        <td>{item.measure}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h4>Instructions</h4>
                        <ol>
                            {instructions.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ol>
                    </div>
                    <a href={single.strYoutube} target='_blank' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5, width: 'fit-content', justifySelf: 'center' }}>
                        <span>Watch tutorials on</span><ImYoutube2 size={60} />
                    </a>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button onClick={handlePayment} style={{ padding: '7px 9px', backgroundColor: '#ff0056', color: '#fff', border: '1px solid #ff0056', outline: 'none', borderRadius: 4 }}>Make payment</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default RecipePage;
