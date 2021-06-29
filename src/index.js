const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Registering the routes
const taskRouter = require('./app/tasks/router');
app.use(taskRouter);


app.listen(port, () => {
    console.log(`Listening to server on port ${port}`);
})

process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
    console.error(err.stack)
});


//temporary storing all the task in global.tasks
global.tasks = [
    {
        id: 1,
        taskTitle: 'First task1',
        description: 'This is my first task',
        completed: false, //incomplete ,
        dueDate: '06/20/2020'
    },
    {
        id: 2,
        taskTitle: 'Second task',
        description: 'This is my second task',
        completed: false,
        dueDate: '08/20/2021'
    }
];