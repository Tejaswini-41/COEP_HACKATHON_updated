import mongoose from 'mongoose';

const repoSchema = new mongoose.Schema({
  githubUrl: String,
  projectName: String,
  repoName: String,
});

export default mongoose.model('Repo', repoSchema);
