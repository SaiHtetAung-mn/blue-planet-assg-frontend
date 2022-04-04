import Home from './components/Home';
import {UserContextProvider} from './context/user-context';

function App() {
  return (
    <UserContextProvider>
      <Home/>
    </UserContextProvider>
  );
}

export default App;
