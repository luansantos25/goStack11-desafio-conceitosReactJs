import React, { useEffect, useState } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])


  async function handleAddRepository() {
    const repository = await api.post('/repositories', {
      title: `New Repo ${Date.now()}`,
      url: 'www.github.com',
      techs: ['NodeJS', 'React Native']
    })

    setRepositories([...repositories, repository.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)

    const refreshData = repositories.filter(repository => repository.id !== id)

    setRepositories(refreshData)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (<li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
