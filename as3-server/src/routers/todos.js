const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');
const todoModel = require('../model/todos.js');

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController);
// List
router.get('/todos', function(req, res, next) {
    const {unaccomplishedOnly,searchText,start} = req.query;
    console.log(unaccomplishedOnly);
    todoModel.listTodos(req.query.unaccomplishedOnly, req.query.searchText,req.query.start).then(todos => {
        console.log('enter todoModel');
        res.json(todos);
    }).catch(next);
});

// Create
router.post('/todos', function(req, res, next) {
    const {mood, text} = req.body;
    if (!mood || !text) {
        const err = new Error('Mood and text are required');
        err.status = 400;
        throw err;
    }
    todoModel.createTodo(mood, text).then(todo => {
        res.json(todo);
    }).catch(next);
});

// accomplishTodo
router.post('/todos/:id', function(req, res, next) {
    const {id} = req.params;

    if (!id) {
        const err = new Error('Post ID and mood are required');
        err.status = 400;
        throw err;
    }
    todoModel.accomplishTodo(id).then(post => {
		console.log('enter todoModel');
        res.json(post);
    }).catch(next);
});

module.exports = router;
