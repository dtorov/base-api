const Router = require('express').Router;
// скелет
const skeletonController = require('../controllers/SkeletonController');
// работа с пользователями
const userController = require('../controllers/UserController');

const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/AuthMiddleware');


// скелет
router.post('/skeleton', skeletonController.postTestData);
router.get('/skeleton', skeletonController.getTestData);
// работа с пользователями
router.post('/registration',
    body('email').isEmail(),
    body('username').isLength({ min: 3 }),
    body('password').isLength({ min: 3 }),
    userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/activate/:link', userController.activate);
router.get('/users', authMiddleware, userController.getUsers);

module.exports = router