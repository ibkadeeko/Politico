import Express from 'express';
import users from '../controllers/userAuth';

const router = Express.Router();


router.post('/signup', users.register);
// router.post('/login', users.login);

export default router;
