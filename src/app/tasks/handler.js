const taskDB = require('./taskDB')

function handler() {

    function getSingleTask(req, res) {
        let id = req.params.id;
        if (!id) {
            console.log('Request can\'t process as id parameter is missing');
            res.send({ status: 400 });
            return;
        }
        id = parseInt(id);
        const data = taskDB.getAllTask(id);
        res.status(200).send(data);
        return;
    }

    function getAllTask(req, res) {
        const data = taskDB.getAllTask();
        res.status(200).send(data);
        return;
    }

    function addTask(req, res) {
        const newTask = req.body;
        if (!newTask || !newTask.name || !newTask.description) {
            console.log('Request can\'t process as parameters are missing');
            res.send({ status: 400, message: 'Request can\'t process as parameters are missing' });
            return;
        }

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
        id = parseInt(id);
        const data = taskDB.deleteTask(id);
        if (data === 0) {
            res.send({ status: 404, message: 'Record not found' });
            return;
        }
        res.send({ status: 200 });
        return;
    }

    return {
        getSingleTask,
        getAllTask,
        addTask,
        deleteTask
    }
}

module.exports = handler();