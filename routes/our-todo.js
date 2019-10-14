const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({cookie: true});
const OurTodoAppController = require('../controller/our-todo');

router.get('/', csrfProtection, (req, res, next) => {
	OurTodoAppController.renderOurTodoView(req, res, next);
});

router.post('/', csrfProtection, (req, res, next) => {
	OurTodoAppController.postNewOurTodo(req, res, next);
});

module.exports = router;