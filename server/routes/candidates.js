import Express from 'express';
import candidates from '../controllers/candidates';
import validate from '../middleware/validateCandidatesInput';

const router = Express.Router();

router.post('/office/:userid/register', validate.id, candidates.register);
router.post('/office/:officeid/result', validate.result, candidates.result);
router.post('/vote', validate.vote, candidates.vote);

export default router;
