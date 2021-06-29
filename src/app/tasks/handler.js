const taskDB = require('./taskDB')

function handler() {

    function getSingleTask(req, res) {
        let id = req.params.id;
        if (!id) {
            console.log('Request can\'t process as id parameter is missing');
            res.send({ status: 400 });
            return;
        }
        if(isNaN(id)) {
            res.send({ status: 400, message: 'Id is not valid' });
            return;
        }
        id = parseInt(id);
        const result = taskDB.getAllTask(id);
        if(result.length) {
            res.status(200).send(result);
        } else {
            res.send({status: 404, message: 'No record found'});
        }
        return;
    }

    function getAllTask(req, res) {
        const data = taskDB.getAllTask();
        res.status(200).send(data);
        return;
    }

    function addTask(req, res) {
        const newTask = req.body;
        if (!newTask || !newTask.name || !newTask.description || !newTask.dueDate) {
            console.log('Request can\'t process as parameters are missing');
            res.send({ status: 400, message: 'Request can\'t process as parameters are missing' });
            return;
        }
        const dueDate = new Date(newTask.dueDate);
        if (isNaN(dueDate)) {
            res.send({ status: 400, message: 'dueDate parameter is invalid' });
            return;
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        // check if due date is of future or not
        if (today - dueDate >= 0) {
            console.log(today, dueDate);
            res.send({ status: 400, message: 'Due date should be greater than today' });
            return;
        }

        newTask.completed = false;
        const data = taskDB.createTask(newTask);
        res.status(200).send(data);
        return;
    }

    function deleteTask(req, res) {
        let id = req.body.id;
        if (!id) {
            res.send({ status: 400, message: 'Request can\'t process as parameters are missing' });
            return;
        }
        if(isNaN(id)) {
            res.send({ status: 400, message: 'id is not valid' });
            return;
        }
        id = parseInt(id);
        const taskToBeDeleted = taskDB.getAllTask(id);
        if (taskToBeDeleted.length) {
            const data = taskDB.deleteTask(id);
            send({ status: 200, message:  'Task deleted successfully'});
            return;
        } else {
            res.send({ status: 404, message: 'Record not found' });
            return;
        }
    }

    function completeTask(req, res) {
        let id = req.body.id;
        if (!id) {
            res.send({ status: 400, message: 'Request can\'t process as parameters are missing' });
            return;
        }
        if(isNaN(id)) {
            res.send({ status: 400, message: 'id is not valid' });
            return;
        }

        id = parseInt(id);
        // check task exist in the database
        const taskToBeUpdated = taskDB.getAllTask(id);

        if (taskToBeUpdated.length > 0) {
            // check if due date is not crossed.
            const dueDate = new Date(taskToBeUpdated[0].dueDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (today - dueDate > 0) {
                res.send({ status: 400, message: 'Can\'t update task after the due date' });
                return;
            }

            if (taskToBeUpdated[0].completed) {
                res.send({ status: 400, message: 'Task already completed' });
                return;
            }

            const result = taskDB.completeTask(id);
            if(result === 1) {
                res.send({ status: 200, message: 'Task Completed' });
            } else {
                res.send({ status: 500, message: 'Couldn\'t complete task' });
            }
            return;
        } else {
            res.send({ status: 404, message: 'Record not found' });
            return;
        }
    }

    return {
        getSingleTask,
        getAllTask,
        addTask,
        deleteTask,
        completeTask
    }
}

module.exports = handler();