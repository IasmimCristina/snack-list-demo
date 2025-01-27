import { useState } from 'react'
import Header from './components/Header';
import './App.css'
import { User } from './types/User';

function App() {
  const [user, setUser] = useState<User>({ name: "", isLoggedIn: false });

  return (
    <div className="App">
      <Header user={user} setUser={setUser} />
      {/* O conteúdo do App será exibido aqui, dependendo do estado do login */}
    </div>
  );
}

export default App;
