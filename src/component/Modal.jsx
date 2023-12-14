import { useGlobalContext } from "../context";

const Modal = () => {
    const {selectedMeal, closeModal} = useGlobalContext();

    const {strMeal:title , strMealThumb:image , strInstructions:text, strSource:source} = selectedMeal;
    return (
        <aside className="modal-overlay">
            <div className="modal-container">
            <button onClick={closeModal} className="btn btn-hipster close-btn">x</button>
                <img src={image} alt={title} className="img modal-img" />
                <div className="modal-content">
                    <h4>{title}</h4>
                    <p>Cooking Instructions</p>
                    <p>{text}</p>
                    <a href={source} target="_blank">Source</a>
                </div>
            </div>
        </aside>
    )
}

export default Modal;