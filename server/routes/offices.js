import Express from 'express';
import offices from '../controllers/offices';
import validate from '../middleware/validateOfficesInput';

const router = Express.Router();

router.post('/', validate.input, offices.create);
router.get('/', offices.findAll);
router.get('/:id', validate.id, offices.findById);

export default router;
