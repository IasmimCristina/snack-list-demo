import { useReducer, useState } from 'react';
import Header from './components/Header';
import Greeting from './components/Greeting';
import SnackManager from './components/SnackManager';
import { User } from './types/User';
import { snackReducer, initialSnackState } from './reducers/snackReducer';
import './App.css';

function App() {
  const [user, setUser] = useState<User>({ name: '', isLoggedIn: false });
  const [snacks, dispatch] = useReducer(snackReducer, initialSnackState);

  return (
    <>
      <Header user={user} setUser={setUser} />
      <div className="app">
        <Greeting user={user} />
        <SnackManager snacks={snacks} dispatch={dispatch} user={user} />
      </div>
    </>
  );
}

export default App;
