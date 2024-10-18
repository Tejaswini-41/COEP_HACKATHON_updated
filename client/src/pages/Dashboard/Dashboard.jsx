// client/src/pages/Dashboard/Dashboard.jsx
import React, { useState } from 'react';
import { FaGithub, FaPlus, FaSearch } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const [repositories, setRepositories] = useState([
    { id: 1, name: 'Repo 1', description: 'Codebase for frontend' },
    { id: 2, name: 'Repo 2', description: 'Backend API repository' },
    { id: 3, name: 'Repo 3', description: 'ML models and scripts' },
  ]);


  const [selectedRepo, setSelectedRepo] = useState(null);
  const [newRepoName, setNewRepoName] = useState('');
  const [newRepoDescription, setNewRepoDescription] = useState('');

  const handleRepoClick = (repo) => {
    setSelectedRepo(repo);
  };

  const handleAddRepository = () => {
    if (newRepoName.trim() && newRepoDescription.trim()) {
      const newRepo = {
        id: repositories.length + 1,
        name: newRepoName,
        description: newRepoDescription,
      };
      setRepositories([...repositories, newRepo]);
      setNewRepoName('');
      setNewRepoDescription('');
    }
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Your Repositories</h2>
          <FaGithub className="github-icon" />
        </div>
        
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search repositories..." />
        </div>

        <div className="repo-list">
          {repositories.map((repo) => (
            <div
              key={repo.id}
              className={`repo-card ${selectedRepo?.id === repo.id ? 'active' : ''}`}
              onClick={() => handleRepoClick(repo)}
            >
              <h3>{repo.name}</h3>
              <p>{repo.description}</p>
            </div>
          ))}
        </div>

        <div className="add-repo">
          <input
            type="text"
            placeholder="Repository Name"
            value={newRepoName}
            onChange={(e) => setNewRepoName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Repository Description"
            value={newRepoDescription}
            onChange={(e) => setNewRepoDescription(e.target.value)}
          />
          <button onClick={handleAddRepository}>
            <FaPlus /> Add Repository
          </button>
        </div>
      </div>

      <div className="main-content">
        {selectedRepo ? (
          <div className="repo-details">
            <div className="repo-header">
              <h2>{selectedRepo.name}</h2>
              <p>{selectedRepo.description}</p>
            </div>
            <div className="chatbot-container">
              <h3>Chatbot Assistant</h3>
              <div className="chat-window">
                <p>Ask a question about {selectedRepo.name}...</p>
                {/* Placeholder for chatbot responses */}
              </div>
              <input className="chat-input" placeholder="Type your query here..." />
            </div>
          </div>
        ) : (
          <div className="placeholder">
            <h3>Select a repository to view details and interact with the chatbot.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
