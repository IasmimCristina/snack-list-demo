import { useState } from 'react'
import Header from './components/Header';
import './App.css'
import { User } from './types/User';
import Greeting from './components/Greeting';

function App() {
  const [user, setUser] = useState<User>({ name: "", isLoggedIn: false });

  return (

    <>
      <Header user={user} setUser={setUser} />
      <div className="app">
        <Greeting user={user} />
        {/* etc */}
      </div>
    </>
  );
}

export default App;
