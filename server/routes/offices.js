import Express from 'express';
import offices from '../controllers/offices';
import validate from '../middleware/validateOfficesInput';
import tokenValidator from '../middleware/verifyToken';

const router = Express.Router();

router.post('/', tokenValidator.verifyAdmin, validate.input, offices.create);
router.get('/', tokenValidator.verifyUser, offices.getAll);
router.get('/:id', tokenValidator.verifyUser, validate.id, offices.getOne);

export default router;
