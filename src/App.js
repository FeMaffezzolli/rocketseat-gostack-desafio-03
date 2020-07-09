import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    api
      .post("repositories", {
        title: `Novo repositório ${Date.now()}`,
        url: "https://myrepo.com",
        techs: ["ReactJS", "ReactNative", "WebAssembly"],
      })
      .then((response) => setRepositories([...repositories, response.data]))
      .catch((err) => console.log("Erro na adição", err));
  }

  async function handleRemoveRepository(id) {
    api
      .delete(`repositories/${id}`)
      .then(() => {
        const otherRepositories = repositories.filter((repo) => repo.id !== id);
        setRepositories(otherRepositories);
      })
      .catch((err) => console.log("Erro na remoção", err));
  }

  useEffect(() => {
    api
      .get("repositories")
      .then((response) => setRepositories(response.data))
      .catch((err) => console.log("Erro na consulta", err));
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
