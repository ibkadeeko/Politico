import Express from 'express';
import parties from '../controllers/parties';

const router = Express.Router();

router.post('/', parties.create);
router.get('/', parties.getAll);
router.get('/:id', parties.getOne);
router.put('/:id', parties.update);
router.delete('/:id', parties.delete);

export default router;
