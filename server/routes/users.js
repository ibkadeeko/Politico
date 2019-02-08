import Express from 'express';
import users from '../controllers/userAuth';
import validate from '../middleware/ValidateUsersInput';

const router = Express.Router();


router.post('/signup', validate.input, users.register);
router.post('/login', validate.email, users.login);
export default router;
