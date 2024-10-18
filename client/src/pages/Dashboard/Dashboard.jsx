// client/src/pages/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaGithub, FaPlus, FaSearch } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [newRepoName, setNewRepoName] = useState('');
  const [newRepoDescription, setNewRepoDescription] = useState('');
  const [newGithubUrl, setNewGithubUrl] = useState('');

  useEffect(() => {
    // Fetch repositories on component load
    const fetchRepositories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/repo/all');
        setRepositories(response.data);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };
    fetchRepositories();
  }, []);

  const handleRepoClick = (repo) => {
    setSelectedRepo(repo);
  };

  const handleAddRepository = async () => {
    if (newRepoName.trim() && newRepoDescription.trim() && newGithubUrl.trim()) {
      try {
        const response = await axios.post('http://localhost:3000/repo/add', {
          githubUrl: newGithubUrl || '',
          projectName: newRepoName,
          repoName: newRepoDescription,
        });
        setRepositories([...repositories, response.data.repo]);
        setNewRepoName('');
        setNewRepoDescription('');
        setNewGithubUrl('');
      } catch (error) {
        console.error('Error adding repository:', error);
      }
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
              key={repo._id}
              className={`repo-card ${selectedRepo?.id === repo._id ? 'active' : ''}`}
              onClick={() => handleRepoClick(repo)}
            >
              <h3>{repo.projectName}</h3>
              <p>{repo.repoName}</p>
            </div>
          ))}
        </div>

        <div className="add-repo">
          <input
            type="text"
            placeholder="Project Name"
            value={newRepoName}
            onChange={(e) => setNewRepoName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Repository Name"
            value={newRepoDescription}
            onChange={(e) => setNewRepoDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="GitHub URL"
            value={newGithubUrl}
            onChange={(e) => setNewGithubUrl(e.target.value)}
          />
          <button onClick={handleAddRepository}>
            <FaPlus /> Add Repository
          </button>
        </div>
      </div>

      <div className="main-content">
        {selectedRepo ? (
          <div className="repo-details">
            <h2>{selectedRepo.projectName}</h2>
            <p>{selectedRepo.repoName}</p>
            <p>
              <a href={selectedRepo.githubUrl} target="_blank" rel="noopener noreferrer">
                {selectedRepo.githubUrl}
              </a>
            </p>
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
