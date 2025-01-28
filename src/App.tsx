import { useReducer, useState } from 'react';
import Header from './components/Header';
import Greeting from './components/Greeting';
import SnackForm from './components/SnackForm';
import SnackList from './components/SnackList';
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
        {user.isLoggedIn ? (
          <div className="app__content">
            <SnackForm dispatch={dispatch} />
            <div className="app__lists">
              <SnackList
                title="Snacks I Like 👍"
                snacks={snacks.likes}
                dispatch={dispatch}
              />
              <SnackList
                title="Snacks I Don't Like 👎"
                snacks={snacks.dislikes}
                dispatch={dispatch}
              />
            </div>
          </div>
        ) : (
          <p className="app__message">
            Login to start adding your favorite snacks!
          </p>
        )}
      </div>
    </>
  );
}

export default App;
