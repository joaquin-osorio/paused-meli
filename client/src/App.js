import { useEffect } from 'react';
import './App.css';

function App() {

  const trackedSellers = ['PCMIDICENTER', 'ARTURIA OFICIAL']

  const baseUrl = 'http://localhost:3001';

  useEffect(() => {
    fetch(`${baseUrl}/getPublications?nickname=PCMIDICENTER`)
      .then((res) => res.json())
      .then((data) => console.log(data))
  }, []);

  return (
    <div className="App">

    </div>
  );
}

export default App;
