import Router from 'express';
import {
    adminController,
    blogController,
    categoriesController,
    commentsController,
    contactController,
    groupController,
    tagController,
    userController
} from '../controllers/index.js'

const router = Router();

router.use('/users', userController);
router.use('/group', groupController);
router.use('/admin', adminController);
router.use('/blogs', blogController);
router.use('/categories', categoriesController);
router.use('/comments', commentsController);
router.use('/contact', contactController);
router.use('/tag', tagController);

export { router };
