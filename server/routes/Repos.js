import express from 'express';
import { addRepo, getRepos } from '../controllers/reposController.js';

const router = express.Router();

router.post('/', addRepo);
router.get('/', getRepos);

export default router;
