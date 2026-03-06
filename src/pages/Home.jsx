import React, { useState } from 'react';

const Home = ({ onStart }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleStart = () => {
    if (name.trim().length === 0) {
      setError('Veuillez entrer un nom pour commencer !');
    } else {
      setError('');
      onStart(name);
    }
  };

  return (
    <div className="home-container">
      <h1>React UNO</h1>
      
      <div className="input-group">
        <input 
          type="text" 
          placeholder="Votre nom..." 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="button-group">
        <button onClick={handleStart}>Commencer la partie</button>
        <button onClick={() => alert("Règles : Posez une carte de même couleur ou chiffre !")}>
          Règles
        </button>
      </div>
    </div>
  );
};

export default Home;