'use strict';

var express = require('express')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , logger = require('morgan');


var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(logger('dev'));

app.get('/',initApp);
app.listen(3000);
console.log('listening on port 3000');

var users = {
    allyson: {
        id: 0,
        password: 'password',
        tdList: ['Study', 'Clean room', 'birthday party']
    },
    ben: {
        id: 1,
        password: 'password',
        tdList: ['Create a Todo List', 'Have dinner with friends']
    }
};


/* dev tools*/
// var server = http.createServer(app);
// reload(server, app, [reloadDelay], [wait]);
//
// server.listen(app.get('port'), function(){
//     console.log("Web server listening on port " + app.get('port'));
// });
//***************

/* API Endpoints*/
app.post('/authenticate', authenticate);



/** Function definitions**/

function authenticate(request,response) {
    var name = request.body.name;
    var pass = request.body.password;

    if(typeof(users[name]) == 'undefined') {
        response.json({success: false, message: 'User not found'});
    }

    else if(users[name] !== null && users[name].password == pass) {
        response.json({success: true, message: 'User authenticated', tdList: users[name].tdList});
    }
    else {
        response.json({success: false, message: 'Incorrect Password'});
    }


}

function initApp(request, response) {
        response.sendfile('./public/index.html');
}
