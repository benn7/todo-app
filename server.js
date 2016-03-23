'use strict';

var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , logger = require('morgan');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(logger('dev'));


app.listen(3000);
console.log('listening on port 3000');

var users = {
    allyson: {
        id: 0,
        password: 'password',
        tdList: ['Study', 'Clean room', 'Attend birthday party', 'Have lunch with friends'],
        completed: []
    },
    ben: {
        id: 1,
        password: 'password',
        tdList: ['Create a Todo List', 'Have dinner with friends', 'brew beer', 'go to Costco'],
        completed: []
    },
    jeff: {
        id: 2,
        password: 'password',
        tdList: ['Review Code', 'Pick up daughter from school', 'Interview potential employees'],
        completed: []
    }
};

var curUser = null;

/* API Endpoints*/
app.post('/authenticate', authenticate);
app.delete('/remove/:id',remove);
app.post('/add',add);
app.get('/completed',completed);


/** Function definitions**/

function completed(request, response) {
    response.json({completedList: users[curUser].completed});
}

function add(request,response) {
    var text = request.body.todoTxt;
    users[curUser].tdList.push(text);
    response.json({added: true, tdList: users[curUser].tdList});
}


function remove(request,response) {
    var id = request.params.id;
    users[curUser].completed.push(users[curUser].tdList[id]);
    users[curUser].tdList.splice(id,1);
    response.json({deleted: true, tdList: users[curUser].tdList});
}

function authenticate(request,response) {
    var name = request.body.name;
    var pass = request.body.password;

    if(typeof(users[name]) == 'undefined') {
        response.json({success: false, message: 'User not found'});
    }

    else if(users[name] !== null && users[name].password == pass) {
        curUser = name;
        response.json({success: true, message: 'User authenticated', tdList: users[name].tdList});
    }
    else {
        response.json({success: false, message: 'Incorrect Password'});
    }


}
