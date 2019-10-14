const mongoose = require('mongoose');
const OurTodo = require('../models/Todoes');
const moment = require('moment');

const getAllOurTodo = () => (new Promise((resolve, reject) => {
	OurTodo.find((err, todoes) => {
		if(err) reject(err);
		else resolve(todoes);
	}).sort({_id: -1});
}));

const saveNewTodo = (todo) => (new Promise((resolve, reject) => {
	todo.save((err, result) => {
		if(err) reject(err);
		else resolve(result);
	});
}));

async function renderOurTodoView(req, res, next) {
	try {
		const todoes = await getAllOurTodo();
		const csrfToken = req.csrfToken();
		console.log(todoes);

		res.render('our-todo', { todoes, csrfToken, msg:{} });
	} catch(err) {
		console.log(err);
		next(err);
	}
 } 

async function postNewOurTodo(req, res, next) {
	try {
		const { name, todo } = req.body;
 		const csrfToken = req.csrfToken();

		if(!name || !todo ) {
			const todoes = await getAllOurTodo();
			const msg = { status: false, body: 'Tolong isi formulir dengan lengkap!' }
			res.status(422).render('our-todo', { todoes, csrfToken, msg });
		}
		const newTodo = new OurTodo({
			_id: new mongoose.Types.ObjectId,
			createdBy: String(name),
			todo: String(todo),
			created: moment().format('h:mm:ss: a')
		});

		const resultSaveNewTodo = await saveNewTodo(newTodo);
		const msg = { status: true, body: 'Rencana Anda Berhasil Ditambahkan' };
		const todoes = await getAllOurTodo();
		res.render('our-todo', {msg, csrfToken, todoes });
	} catch(err) {
		console.log(err); 
		next(err);
	}
}

module.exports = {
	renderOurTodoView,
	postNewOurTodo
}