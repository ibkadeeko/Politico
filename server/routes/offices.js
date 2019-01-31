import Express from 'express';
import offices from '../controllers/offices';

const router = Express.Router();

router.post('/', offices.create);


export default router;
