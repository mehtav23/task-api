
function taskDB() {
    function getAllTask(id) {
        if (id) {
            const result = tasks.filter(item => item.id === id);
            return result;
        }
        return tasks;
    }

    function createTask(task) {
        const id = tasks.length + 1;
        task.id = id;
        tasks.push(task);
        console.log(`Created task successfully`);
        return task;
    }

    function deleteTask(id) {
        tasks = tasks.filter((item) => {
            return item.id !== id;
        });
        console.log(`Deleted task successfully`);
        return;
    }

    function completeTask(id) {
        const taskToBeCompleted = tasks.filter(item => item.id === id);
        taskToBeCompleted[0].completed = true;
        console.log('Successfully updated the task');
        return 1;
    }

    return {
        getAllTask,
        createTask,
        deleteTask,
        completeTask
    }
}

module.exports = taskDB();