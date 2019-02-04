import Express from 'express';
import parties from '../controllers/parties';
import validate from '../middleware/validatePartiesInput';

const router = Express.Router();

router.post('/', validate.input, parties.create);
router.get('/', parties.getAll);
router.get('/:id', validate.id, parties.getOne);
router.put('/:id', validate.id, parties.update);
router.delete('/:id', validate.id, parties.delete);

export default router;
