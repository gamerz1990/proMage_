import express, { Router } from 'express';
import { body, param } from 'express-validator';
import { listTasks, createTask, editTask } from '../controllers/task';

const router: Router = express.Router();

router.get('/', listTasks);

router.post('/',
  [
    body('projectId').isMongoId().withMessage('Valid project ID is required'),
    body('title').not().isEmpty().withMessage('Title cannot be empty'),
    body('description').optional(),
    body('status').isIn(['pending', 'in progress', 'completed']).withMessage('Invalid status')
  ],
  createTask
);

router.put('/:id',
  [
    param('id').isMongoId().withMessage('Invalid task ID format'),
    body('title').optional().not().isEmpty().withMessage('Title cannot be empty'),
    body('description').optional(),
    body('status').optional().isIn(['pending', 'in progress', 'completed']).withMessage('Invalid status')
  ],
  editTask
);

export default router;
