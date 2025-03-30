import express from 'express';
import { register ,login } from '../controllers/user-controller';

const router = express.Router();

router.post('/', register);
router.get('/', login);


export default router;