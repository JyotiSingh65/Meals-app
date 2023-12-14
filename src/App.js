
import './App.css';
import Search from './component/Search';
import Favorites from './component/Favorites';
import Meals from './component/Meals';
import { useGlobalContext } from './context';
import Modal from './component/Modal';

function App() {

  const { showModal , favorites} = useGlobalContext();
  return (
    <main >
      <Search />
      {favorites.length > 0 && <Favorites /> }
      <Meals />
      {showModal && < Modal />}
    </main>
  );
}

export default App;
