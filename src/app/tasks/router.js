const router = require('express').Router();
const handler = require('./handler');


router.get('/tasks/', handler.getAllTask);
router.get('/tasks/:id', handler.getSingleTask);
router.post('/tasks/', handler.addTask);
router.delete('/tasks/', handler.deleteTask);
router.put('/completeTask', handler.completeTask);

module.exports = router;