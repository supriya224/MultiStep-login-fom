import Header from './components/shared/Header';
import HomePage from './pages/Home.page';
import CONSTANT from './utils/constants/index';

function App() {
  console.log('[Env]', CONSTANT.API_URL);

  return (
    <div className="">
      <div>
        <Header />
        <HomePage />
      </div>
    </div>
  );
}

export default App;
