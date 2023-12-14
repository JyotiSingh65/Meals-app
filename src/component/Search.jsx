import {useState} from 'react'; 
import {useGlobalContext} from '../context';

const Search = () => {

    const [text, setText] = useState('');
    const {setSearchTerm , fetchRandomMeal} = useGlobalContext();

    const  handleChange = (e) => {
        setText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(text){
            setSearchTerm(text);
           
        }
    }

    const handleRandom = () => {
        setSearchTerm('');
        setText('');
        fetchRandomMeal();
    }

    return (
        <header className="search-container">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search for meals" className="form-input" value={text} onChange={handleChange}/>
                <button type="submit" className="btn">
                  Search 
                </button>
                <button type='button' className="btn btn-hipster" onClick={handleRandom}>Suprise Me!</button>
            </form>
        </header>
    )
}

export default Search;