import Express from 'express';
import offices from '../controllers/offices';
import validate from '../middleware/validateOfficesInput';

const router = Express.Router();

router.post('/', validate.input, offices.create);
router.get('/', offices.getAll);
router.get('/:id', validate.id, offices.getOne);

export default router;
