
import { useGlobalContext } from '../context';
import { BsHandThumbsUp } from "react-icons/bs";

const Meals= () => {

    const {loading, meals , selectMeal, addToFavorite} = useGlobalContext();

    if(loading){
        return (
            <section className='section'>
                <h1>Loading...</h1>
            </section>
        )
    }

    if(meals.length < 1){
        return (
            <section className='section'>
                <h1>No meals found</h1>
            </section>
        )
    }
    
    return (
        <section className='section-center'> 
           { meals.map((singleMeal) => {
                const {idMeal, strMeal:title , strMealThumb:image} = singleMeal;
            
               return (
                     <article key={idMeal} className='single-meal'>
                          <img src={image}  className="img" onClick={() => selectMeal(idMeal)} />
                          <footer >
                            <h5>{title}</h5>
                            <button className='like-btn' onClick={() => addToFavorite(idMeal)}><BsHandThumbsUp /></button>
                          </footer>
                     </article>
                
               )})
           }

        </section>
    )
}

export default Meals;