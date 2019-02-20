import Express from 'express';
import parties from '../controllers/parties';
import validate from '../middleware/validatePartiesInput';
import tokenValidator from '../middleware/verifyToken';

const router = Express.Router();

router.post('/', tokenValidator.verifyAdmin, validate.input, parties.create);
router.get('/', tokenValidator.verifyUser, parties.getAll);
router.get('/:id', tokenValidator.verifyUser, validate.id, parties.getOne);
router.patch('/:id', tokenValidator.verifyAdmin, validate.id, parties.update);
router.delete('/:id', tokenValidator.verifyAdmin, validate.id, parties.delete);

export default router;
