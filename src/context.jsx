import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
const AppContext = React.createContext();

const allMealsURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php';

const getFavoritesFromLocalStorage = () => {
    let favorites = localStorage.getItem('favorites');
    if(favorites){
        return JSON.parse(localStorage.getItem('favorites'));
    }
    else{
        favorites = [];
    }

    return favorites;
}


const  AppProvider = ({children}) => {

    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());

    const fetchMeals = async (url) => {
        setLoading(true);
        try {
            const {data} = await axios(url);
            if(data.meals){
                setMeals(data.meals);
            }
            else{
                setMeals([]);
            }
           
            
        } catch (error) {
            console.log(error.response);
        }

        setLoading(false);
    }

    const fetchRandomMeal = () => {
        fetchMeals(randomMealURL);
    }

    const selectMeal = (idMeal , favoriteMeal) => {
        let meal;

        if(favoriteMeal){
            meal = favorites.find((meal) => meal.idMeal === idMeal);
        }
        else{
            meal = meals.find((meal) => meal.idMeal === idMeal);
        }
        
        setSelectedMeal(meal);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const addToFavorite = (idMeal) => {
        const meal  = meals.find((meal) => meal.idMeal === idMeal);
        
        const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal);

        if(alreadyFavorite){
            return;
        }

        const updatedFavorites = [...favorites, meal];
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }

    const removeFromFavorite = (idMeal) => {
        const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }


    useEffect(() => {
        fetchMeals(allMealsURL);
    },[]);

    useEffect(() => {
        if(!searchTerm) return;
        fetchMeals(`${allMealsURL}${searchTerm}`);
    },[searchTerm]);

    return (
        <AppContext.Provider value={{loading,meals,setSearchTerm, fetchRandomMeal,showModal, selectedMeal,selectMeal, closeModal, addToFavorite,removeFromFavorite, favorites}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider}