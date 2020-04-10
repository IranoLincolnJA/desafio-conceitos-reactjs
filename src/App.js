import React, { useState, useEffect } from 'react';

import api from './services/api';
import './styles.css';

function App() {
  const [repositories, setRepo] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepo(response.data)
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repositorio do Desafio ${Date.now()}`,
	    url: 'https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-reactjs',
      techs: ['NodeJS', 'ReactJS', 'ReactNative']    
    });
    const repository = response.data;

    setRepo([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepo(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository, i) => 
          <li key={i}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>)}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
