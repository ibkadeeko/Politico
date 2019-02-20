import Express from 'express';
import candidates from '../controllers/candidates';
import validate from '../middleware/validateCandidatesInput';
import tokenValidator from '../middleware/verifyToken';

const router = Express.Router();

router.post('/office/register', tokenValidator.verifyUser, validate.id, candidates.register);
router.post('/office/:officeid/result', tokenValidator.verifyUser, validate.result, candidates.result);
router.post('/vote', tokenValidator.verifyUser, validate.vote, candidates.vote);

export default router;
