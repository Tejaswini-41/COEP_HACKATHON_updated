import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaGithub, FaPlus, FaSearch } from 'react-icons/fa';
import Chatbot from './Chatbot';  // Import the Chatbot component
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

  const handleRepoClick = async (repo) => {
    setSelectedRepo(repo);
    try {
      const response = await axios.post('http://localhost:3000/process', {
        project_name: repo.projectName,
        repo_name: repo.repoName,
        github_url: repo.githubUrl,
      });
      if (response.status === 200) {
        alert('Repository processed successfully!');
      } else {
        alert('Failed to process repository. Please try again.');
      }
    } catch (error) {
      console.error('Error processing repository:', error);
      alert('An error occurred while processing the repository.');
    }
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
        <div className="editor">
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

        <Chatbot /> {/* Use the Chatbot component here */}
      </div>
    </div>
  );
};

export default Dashboard;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaGithub, FaPlus, FaSearch } from 'react-icons/fa';
// import './Dashboard.css';

// const Dashboard = () => {
//   const [repositories, setRepositories] = useState([]);
//   const [selectedRepo, setSelectedRepo] = useState(null);
//   const [newRepoName, setNewRepoName] = useState('');
//   const [newRepoDescription, setNewRepoDescription] = useState('');
//   const [newGithubUrl, setNewGithubUrl] = useState('');

//   const [userQuestion, setUserQuestion] = useState('');
// const [response, setResponse] = useState('');

//   useEffect(() => {
//     // Fetch repositories on component load
//     const fetchRepositories = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/repo/all');
//         setRepositories(response.data);
//       } catch (error) {
//         console.error('Error fetching repositories:', error);
//       }
//     };
//     fetchRepositories();
//   }, []);


//   const handleQuestionSubmit = async () => {
//     if (userQuestion.trim()) {
//       try {
//         const res = await axios.post('http://localhost:8000/ask', { question: userQuestion });
//         setResponse(res.data.response);
//       } catch (error) {
//         console.error('Error asking question:', error);
//         alert('An error occurred while asking the question.');
//       }
//     }
//   };

//   const handleRepoClick = async (repo) => {
//     setSelectedRepo(repo);
  
//     try {
//       const response = await axios.post('http://localhost:3000/process', {
//         project_name: repo.projectName,
//         repo_name: repo.repoName,
//       });
  
//       if (response.status === 200) {
//         alert('Repository processed successfully!');
//       } else {
//         alert('Failed to process repository. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error processing repository:', error);
//       alert('An error occurred while processing the repository.');
//     }
//   };
  

//   const handleAddRepository = async () => {
//     if (newRepoName.trim() && newRepoDescription.trim() && newGithubUrl.trim()) {
//       try {
//         const response = await axios.post('http://localhost:3000/repo/add', {
//           githubUrl: newGithubUrl || '',
//           projectName: newRepoName,
//           repoName: newRepoDescription,
//         });
//         setRepositories([...repositories, response.data.repo]);
//         setNewRepoName('');
//         setNewRepoDescription('');
//         setNewGithubUrl('');
//       } catch (error) {
//         console.error('Error adding repository:', error);
//       }
//     }
//   };

//   return (
//     <div className="dashboard">
//       <div className="sidebar">
//         <div className="sidebar-header">
//           <h2>Your Repositories</h2>
//           <FaGithub className="github-icon" />
//         </div>

//         <div className="search-bar">
//           <FaSearch className="search-icon" />
//           <input type="text" placeholder="Search repositories..." />
//         </div>

//         <div className="repo-list">
//           {repositories.map((repo) => (
//             <div
//               key={repo._id}
//               className={`repo-card ${selectedRepo?.id === repo._id ? 'active' : ''}`}
//               onClick={() => handleRepoClick(repo)}
//             >
//               <h3>{repo.projectName}</h3>
//               <p>{repo.repoName}</p>
//             </div>
//           ))}
//         </div>

//         <div className="add-repo">
//           <input
//             type="text"
//             placeholder="Project Name"
//             value={newRepoName}
//             onChange={(e) => setNewRepoName(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Repository Name"
//             value={newRepoDescription}
//             onChange={(e) => setNewRepoDescription(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="GitHub URL"
//             value={newGithubUrl}
//             onChange={(e) => setNewGithubUrl(e.target.value)}
//           />
//           <button onClick={handleAddRepository}>
//             <FaPlus /> Add Repository
//           </button>
//         </div>
//       </div>
//       <input
//   type="text"
//   placeholder="Ask a question about the repository..."
//   value={userQuestion}
//   onChange={(e) => setUserQuestion(e.target.value)}
// />
// <button onClick={handleQuestionSubmit}>Ask</button>

// // Display the response from the API
// <div>
//   <h4>Response:</h4>
//         <p>{response}</p>
//         </div>

//       <div className="main-content">
//         {selectedRepo ? (
//           <div className="repo-details">
//             <h2>{selectedRepo.projectName}</h2>
//             <p>{selectedRepo.repoName}</p>
//             <p>
//               <a href={selectedRepo.githubUrl} target="_blank" rel="noopener noreferrer">
//                 {selectedRepo.githubUrl}
//               </a>
//             </p>
//           </div>
//         ) : (
//           <div className="placeholder">
//             <h3>Select a repository to view details and interact with the chatbot.</h3>
//           </div>
//         )}
//       </div>w
//     </div>
//   );
// };

// export default Dashboard;
