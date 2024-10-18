import Repo from '../models/Repo.js';

export const addRepo = async (req, res) => {
  try {
    const newRepo = new Repo(req.body);
    const savedRepo = await newRepo.save();
    res.status(201).json(savedRepo);
  } catch (error) {
    res.status(500).json({ message: 'Error adding repository', error });
  }
};

export const getRepos = async (req, res) => {
  try {
    const repos = await Repo.find();
    res.json(repos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching repositories', error });
  }
};
