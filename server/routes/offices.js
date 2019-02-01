import Express from 'express';
import offices from '../controllers/offices';

const router = Express.Router();

router.post('/', offices.create);
router.get('/', offices.getAll);


export default router;
