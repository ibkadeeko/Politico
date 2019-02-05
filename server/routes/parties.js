import Express from 'express';
import parties from '../controllers/parties';
import validate from '../middleware/validatePartiesInput';
// import dbcheck from '../middleware/databaseValidator';

const router = Express.Router();

router.post('/', validate.input, parties.create);
router.get('/', parties.findAll);
router.get('/:id', validate.id, parties.findById);
router.patch('/:id', validate.id, parties.findByIdAndUpdate);
router.delete('/:id', validate.id, parties.findByIdAndDelete);

export default router;
