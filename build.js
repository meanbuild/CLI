'use strict';
var inquirer = require('inquirer');
var fs = require("fs");
var mongoose = require('mongoose');
var reply = {};
var project;
var upper;
var lower;
var capone;
var controller_name;
var moreToDo = true;
var nameLevel = true;
var typeLevel = false;
var connected = false;
var schemaTop = [];
var schemaBottom = [];
var schema2 = [];
var moreEntity = [];
var one2many = false;
var mainModel = true;
var controller = false;
var type;
var entity;
var modelName;
var model2Name = ' ';
var property;
var required;
var notFirstType = false;

var wstream = fs.createWriteStream('temp');

var Schema = mongoose.Schema;
mongoose.connect('mongodb://drew:saturday@ds161109.mlab.com:61109/databasedw');
var fileSchema = new Schema({
	name: {
	type: String,	
	required: true
	},
	text: {
	type: String,
	required: true
	}
});

var File = mongoose.model('File', fileSchema);
module.exports = File;

var questions = [
  {
    type: 'input',
    name: 'project_name',
    message: 'Enter project name:'
  },
  {
    type: 'input',
    name: 'entity_name',
    message: 'Enter entity name:'
  }
];

var filelist = [
{name: 'service',
 location: './app/frontend/js/services/service.ts'},
{name: 'userService',
 location: './app/frontend/js/services/userService.ts'},
{name: 'aboutController',
 location: './app/frontend/js/controllers/aboutController.ts'},
{name: 'dashboardController',
 location: './app/frontend/js/controllers/dashboardController.ts'},
{name: 'homeController',
 location: './app/frontend/js/controllers/homeController.ts'},
{name: 'loginController',
 location: './app/frontend/js/controllers/loginController.ts'},
{name: 'registerController',
 location: './app/frontend/js/controllers/registerController.ts'},
{name: 'states',
 location: './app/frontend/js/states.ts'},
{name: '_box',
 location: './app/frontend/sass/modules/components/_box.scss'},
{name: '_button',
 location: './app/frontend/sass/modules/components/_button.scss'},
{name: '_dashboard',
 location: './app/frontend/sass/modules/dashboard/_dashboard.scss'},
{name: '_footer',
 location: './app/frontend/sass/modules/footer/_footer.scss'},
{name: '_header',
 location: './app/frontend/sass/modules/header/_header.scss'},
{name: '_homepage',
 location: './app/frontend/sass/modules/homepage/_homepage.scss'},
{name: '_features',
 location: './app/frontend/sass/modules/homepage/_features.scss'},
{name: '_carousel',
 location: './app/frontend/sass/modules/homepage/_carousel.scss'},
{name: '_intro',
 location: './app/frontend/sass/modules/homepage/_carousel.scss'},
{name: '_login',
 location: './app/frontend/sass/modules/login/_login.scss'},
{name: '_register',
 location: './app/frontend/sass/modules/register/_register.scss'},
{name: '_modules',
 location: './app/frontend/sass/modules/_modules.scss'},
{name: 'maincss',
 location: './app/frontend/dist/css/main.css'},
{name: 'main',
 location: './app/frontend/sass/main.scss'},
{name: '404',
 location: './app/frontend/views/404.html'},
{name: 'about',
 location: './app/frontend/views/about.html'},
{name: 'dashboard',
 location: './app/frontend/views/dashboard.html'},
{name: 'home',
 location: './app/frontend/views/home.html'},
{name: 'login',
 location: './app/frontend/views/login.html'},
{name: 'register',
 location: './app/frontend/views/register.html'},
{name: 'demo',
 location: './app/frontend/views/demo.html'},
{name: 'index',
 location: './app/frontend/index.html'},
{name: 'entity',
 location: './app/backend/api/entity.ts'},
{name: 'users',
 location: './app/backend/api/users.ts'},
{name: 'userx',
 location: './app/backend/models/user.ts'},
{name: '.bowerrc',
 location: './.bowerrc'},
{name: '.gitignore',
 location: './.gitignore'},
{name: 'bower',
 location: './bower.json'},
{name: 'gulpfile',
 location: './gulpfile.js'},
{name: 'package',
 location: './package.json'},
{name: 'server',
 location: './server.ts'},
{name: 'tsconfig',
 location: './tsconfig.json'}
];

var controllerList = [
{name: 'getAllsController',
 location: './app/frontend/js/controllers/getAllController.ts'},
{name: 'deleteController',
 location: './app/frontend/js/controllers/deleteController.ts'},
{name: 'addController',
 location: './app/frontend/js/controllers/addController.ts'},
{name: 'getOneController',
 location: './app/frontend/js/controllers/getOneController.ts'},
{name: 'updateController',
 location: './app/frontend/js/controllers/updateController.ts'}
];

var checkCleanArea = function() {
	var promise = new Promise(function(resolve, reject){
	fs.stat('app', function(err, stats) {
	if (err) {
		makeAppDir()
		.then(makeFrontendDir)
		.then(makeDistDir)
		.then(makeCssDir)
		.then(makeBackendDir)
		.then(makeModelsDir)
		.then(makeApiDir)
		.then(makeViewsDir)
		.then(makeSassDir)
		.then(makeModulesDir)
		.then(makeRegisterDir)
		.then(makeLoginDir)
		.then(makeHomepageDir)
		.then(makeHeaderDir)
		.then(makeFooterDir)
		.then(makeDashboardDir)
		.then(makeComponentsDir)
		.then(makeJsDir)
		.then(makeJqueryDir)
		.then(makeControllersDir)
		.then(makeServicesDir)
		.then(inquire)
		.then(setVariables)
		.then(makeFiles)
		.then(modelQuestion)
		return};
	if (stats.isDirectory) {
		console.log('Project sub-directory already exists.');
		disconnect();
		return;
	}
	resolve({data: 'created app'});
	});
})
	return promise;
};

var makeAppDir = function() {
	var promise = new Promise(function(resolve, reject){
	fs.mkdir('./app',function(err){
		if (err) {
     		return console.error(err)}});
	console.log('Creating directory structure');
	resolve({data: 'created app'});
	});
	return promise;
};

var makeBackendDir = function() {
	var promise = new Promise(function(resolve, reject){
	fs.mkdir('./app/backend',function(err){
		if (err) {
     		return console.error(err)}});
	resolve({data: 'created backend'});
	});
	return promise;
};

var makeModelsDir = function() {
	var promise = new Promise(function(resolve, reject){
	fs.mkdir('./app/backend/models',function(err){
		if (err) {
     		return console.error(err)}});
	resolve({data: 'created models'});
	});
	return promise;
};
var makeApiDir = function() {
	var promise = new Promise(function(resolve, reject){
	fs.mkdir('./app/backend/api',function(err){
		if (err) {
     		return console.error(err)}});
	resolve({data: 'created api'});
	});
	return promise;
};
var makeFrontendDir = function() {
	var promise = new Promise(function(resolve, reject){
	fs.mkdir('./app/frontend',function(err){
		if (err) {
     		return console.error(err)}});
	resolve({data: 'created frontend'});
	});
	return promise;
};
var makeDistDir = function() {
	var promise = new Promise(function(resolve, reject){
	fs.mkdir('./app/frontend/dist',function(err){
		if (err) {
     		return console.error(err)}});
	resolve({data: 'created dist'});
	});
	return promise;
};
var makeCssDir = function() {
	var promise = new Promise(function(resolve, reject){
	fs.mkdir('./app/frontend/dist/css',function(err){
		if (err) {
     		return console.error(err)}});
	resolve({data: 'created css'});
	});
	return promise;
};
var makeViewsDir = function() {
	var promise = new Promise(function(resolve, reject){
	fs.mkdir('./app/frontend/views',function(err){
		if (err) {
     		return console.error(err)}});
	resolve({data: 'created views'});
	});
	return promise;
};
var makeSassDir = function() {
	var promise = new Promise(function(resolve, reject){
	fs.mkdir('./app/frontend/sass',function(err){
		if (err) {
     		return console.error(err)}});
	resolve({data: 'created sass'});
	});
	return promise;
};

var makeModulesDir = function() {
	var promise = new Promise(function(resolve, reject){
	fs.mkdir('./app/frontend/sass/modules',function(err){
		if (err) {
     		return console.error(err)}});
	resolve({data: 'created modules'});
	});
	return promise;
};

var makeRegisterDir = function() {
	var promise = new Promise(function(resolve, reject){
	fs.mkdir('./app/frontend/sass/modules/register',function(err){
		if (err) {
     		return console.error(err)}});
	resolve({data: 'created register'});
	});
	return promise;
};
var makeLoginDir = function() {
	var promise = new Promise(function(resolve, reject){
	fs.mkdir('./app/frontend/sass/modules/login',function(err){
		if (err) {
     		return console.error(err)}});
	resolve({data: 'created login'});
	});
	return promise;
};
var makeHomepageDir = function() {
	var promise = new Promise(function(resolve, reject){
	fs.mkdir('./app/frontend/sass/modules/homepage',function(err){
		if (err) {
     		return console.error(err)}});
	resolve({data: 'created homepage'});
	});
	return promise;
};
var makeHeaderDir = function() {
	var promise = new Promise(function(resolve, reject){
	fs.mkdir('./app/frontend/sass/modules/header',function(err){
		if (err) {
     		return console.error(err)}});
	resolve({data: 'created header'});
	});
	return promise;
};
var makeFooterDir = function() {
	var promise = new Promise(function(resolve, reject){
	fs.mkdir('./app/frontend/sass/modules/footer',function(err){
		if (err) {
     		return console.error(err)}});
	resolve({data: 'created footer'});
	});
	return promise;
};
var makeDashboardDir = function() {
	var promise = new Promise(function(resolve, reject){
	fs.mkdir('./app/frontend/sass/modules/dashboard',function(err){
		if (err) {
     		return console.error(err)}});
	resolve({data: 'created dashboard'});
	});
	return promise;
};
var makeComponentsDir = function() {
	var promise = new Promise(function(resolve, reject){
	fs.mkdir('./app/frontend/sass/modules/components',function(err){
		if (err) {
     		return console.error(err)}});
	resolve({data: 'created components'});
	});
	return promise;
};

var makeJsDir = function() {
	var promise = new Promise(function(resolve, reject){
	fs.mkdir('./app/frontend/js',function(err){
		if (err) {
     		return console.error(err)}});
	resolve({data: 'created js'});
	});
	return promise;
};
var makeJqueryDir = function() {
	var promise = new Promise(function(resolve, reject){
	fs.mkdir('./app/frontend/jquery',function(err){
		if (err) {
     		return console.error(err)}});
	resolve({data: 'created jquery'});
	});
	return promise;
};

var makeServicesDir = function() {
	var promise = new Promise(function(resolve, reject){
	fs.mkdir('./app/frontend/js/services',function(err){
		if (err) {
     		return console.error(err)}});
	resolve({data: 'created services'});
	});
	return promise;
};

var makeControllersDir = function() {
	var promise = new Promise(function(resolve, reject){
	fs.mkdir('./app/frontend/js/controllers',function(err){
		if (err) {
     		return console.error(err)}});
	resolve({data: 'created controllers'});
	});
	return promise;
};

var inquire = function() {
	var promise = new Promise(function(resolve, reject){
	inquirer.prompt(questions).then(function (answers) {
	reply = answers;
	resolve({data: 'ask'});
	});
	});
	return promise;
};

var setVariables = function() {
	var promise = new Promise(function(resolve, reject){
	project = reply.project_name.toLowerCase();
	upper = reply.entity_name.toUpperCase();
	lower = reply.entity_name.toLowerCase();
	capone = lower.substring(0, 1).toUpperCase() + lower.substring(1);
	resolve({data: 'set variables'});
	});
	return promise;
};

var makeFiles = function() {
	var promise = new Promise(function(resolve, reject){
	for (var element of filelist) {
    		findIt(element.name, element.location, controller);
  	}
	for (var element of controllerList) {
		controller = true;
    		findIt(element.name, element.location, controller);
  	}
    	resolve({data: 'make files'});
  	});
	return promise;
};


var findIt = function(name, location, controller) {
	var promise = new Promise(function(resolve, reject){
        File.findOne({name: name}, function(err, file) {
		if (err) throw err;
      	replaceAndWrite(file.text, location, name, controller);
	resolve({data: 'make files'});
	 })
  	});
	return promise;
};

var replaceAndWrite = function(text, location, name, controller) {
	var promise = new Promise(function(resolve, reject){
	if (controller) {
	if (name.substr(6, 1) === 's') {
	controller_name = capone + 'sController';
	} else {
	controller_name = capone + 'Controller';
	};
    	location = location.replace('Controller', controller_name);
	};
    	text = text.replace(/project/g, project);
	text = text.replace(/upper/g, upper);
    	text = text.replace(/lower/g, lower);
    	text = text.replace(/capone/g, capone);
	entity = lower + 's';
    	location = location.replace('entity', entity);
    	fs.writeFile(location, text,  function(err) {
      		if (err) {
                return console.error(err);
        	}
    	});
	if (controllerList[controllerList.length - 1].name === name) {
		disconnect() };
	resolve({data: 'replace and write'});
	});
	return promise;
};

var disconnect = function() {
	mongoose.disconnect();
};

var modelQuestion = function() {
	var promise = new Promise(function(resolve, reject){
	inquirer.prompt({type: 'confirm', name: 'word', message: 'Create Mongoose model (y/N): ', default: ['Y']}).then(function (answers) {
	reply = answers;
	resolve(notFirstType = false);
	if (reply.word === true) {
	connectionString()}
	});
	});
	return promise;
};

var connectionString = function() {
	console.log(' ');
	var promise = new Promise(function(resolve, reject){
	inquirer.prompt({type: 'input', name: 'word', message: 'Enter Connection string: '}).then(function (answers) {
	reply = answers;
	var modelString = reply.word;
	var modelFile = './app/backend/models/' + lower + '.ts';
	var wstreamTemp = fs.createWriteStream(modelFile);
	wstream = wstreamTemp;
	wstream.write("import * as mongoose from 'mongoose';" + '\r\n\r\n');
	//resolve({data: 'Collection String'})
	resolve(mainModel = true)
	schemaTop.push("\r\nconst CONNECTION_STRING = '" + modelString + "'; \r\n\r\n");
	schemaTop.push("mongoose.connect(CONNECTION_STRING).then(() => {\r\n");
	schemaTop.push("  console.log('Connection established');\r\n");
	schemaTop.push("}).catch((err) => {\r\n");
	schemaTop.push("  console.error(err);\r\n");
	schemaTop.push("});\r\n\r\n");
	collectionName()
	});
	});
	return promise;
};

var collectionName = function() {
	console.log(' ');
	var promise = new Promise(function(resolve, reject){
	inquirer.prompt({type: 'input', name: 'word', message: 'Enter Collection name: '}).then(function (answers) {
	reply = answers;
	modelName = reply.word;
	if (modelName.substr(modelName.length - 1, 1) === 's') {
	modelName = modelName.substr(0, modelName.length - 1);
	}
	modelName = modelName.substring(0, 1).toUpperCase() + modelName.substring(1);
	schemaTop.push('export interface ' + modelName + ' extends mongoose.Document {' + '\r\n');
	resolve(schemaBottom.push('let ' + modelName.toLowerCase() + 'Schema = new mongoose.Schema({\r\n'));
	console.log(' ');
	console.log('Press - (dash) when finished entering Property names')
	console.log('Arrow keys and enter select Property types');
	moreToDo = true
	propertyName()
	});
	});
	return promise;
};

var propertyName = function() {
if (moreToDo) {
	console.log(' ');
	var promise = new Promise(function(resolve, reject){
	inquirer.prompt({type: 'input', name: 'word', message: 'Enter Property name: '}).then(function (answers) {
	reply = answers;
	resolve(checkIfDone())
	if (moreToDo) {
	property = reply.word;
	if (notFirstType) {
	schemaBottom.push('  },\r\n');
	}
	schemaBottom.push('  ' + property + ': {\r\n')
	typeLevel = true;
	propertyType()
	}
	if (one2many && !moreToDo) {
		filesLoop()
	} 
	if (!one2many && !moreToDo) {
	prepEntitys();
	}
	});
	});
	return promise;
} else {
nameLevel = false;
}
};

var propertyType = function() {
if (moreToDo && typeLevel) {
	nameLevel = false;
	var promise = new Promise(function(resolve, reject){
	inquirer.prompt({type: 'list', name: 'word', message: 'Enter Property type: ', default: ['String'], choices: ['String', 'Number', 'Date', 'Buffer', 'Boolean', 'Mixed', 'Objectid', 'Array', 'Enum string']}).then(function (answers) {
	reply = answers;
	type = reply.word;
	switch(reply.word) {
	case 'Enum string':
	schemaTop.push('  ' + property + ': ' + type.substring(5) + ';\r\n');
	enumString();
	break;
	case 'Array':
	model2Name = property.substring(0, 1).toUpperCase() + property.substring(1);
	wstream.write("import {" + model2Name + "} from './" + model2Name.toLowerCase() + "';\r\n");
	wstream.write("import "+ model2Name.toLowerCase() + "Schema from './" + model2Name.toLowerCase() + "';\r\n");
	schemaTop.push('  ' + property + ': ' + property.substring(0, 1).toUpperCase() + property.substring(1) + '[];\r\n');
	schemaBottom.push('    type: [' + property.toLowerCase() + 'Schema],\r\n');
	schema2.push(property);
	one2many = true;
	typeRequired();
	break;
	default:
	schemaTop.push('  ' + property + ': ' + type.toLowerCase() + ';\r\n');
	schemaBottom.push('    type: ' + type + ',\r\n');
	typeRequired();
	}
	notFirstType = true;
	resolve({data: 'propertyType'})
	});
	});
	return promise;
	} else {
	console.log(' ');
	nameLevel = true;
	moreToDo = true;
	typeLevel = false;
	propertyName();
}
};

var enumString = function() {
	var promise = new Promise(function(resolve, reject){
	console.log('Enter options enclosed in single quotes and separated by commas');
	inquirer.prompt({type: 'input', name: 'word', message: 'Enter Enums: '}).then(function (answers) {
	reply = answers;
	schemaBottom.push('    type: String' + ',\r\n');
	schemaBottom.push('    enum: [' + reply.word + '],\r\n');
	resolve(typeRequired());
	//typeRequired();
	});
	return promise;
})};

var typeRequired = function() {
	nameLevel = false;
	var promise = new Promise(function(resolve, reject){
	inquirer.prompt({type: 'confirm', name: 'word', message: 'Required (y/N): ', default: ['Y']}).then(function (answers) {
	reply = answers;
	required = reply.word;
	resolve(schemaBottom.push('    required: ' + required + '\r\n'))
	propertyName();
	});
	});
	return promise;
	};

var checkIfDone = function() {
	if (reply.word === '-') {
		moreToDo = false
	schemaBottom.push('  }\r\n')
	schemaTop.push('}\r\n\r\n');
	for (var element of schemaTop) {
	wstream.write(element);
	}
	for (var element of schemaBottom) {
	wstream.write(element);
	}
	schemaTop = [];
	schemaBottom = [];
	wstream.write('});\r\n\r\n');
	if (mainModel) {
	mainModel = false;
	wstream.write("export default mongoose.model<" + modelName + ">('" + modelName + "', " + modelName.toLowerCase() + "Schema);\r\n");
	} else {
	wstream.write('export default ' + model2Name.toLowerCase() + 'Schema;');
	}
	} 
}

var filesLoop = function() {
	var promise = new Promise(function(resolve, reject){
	if (schema2.length > 0) {
	notFirstType = false;
    		model2Name = schema2.shift();
		moreToDo = true;
	var modelFile = './app/backend/models/' + model2Name + '.ts';
	var wstreamTemp = fs.createWriteStream(modelFile);
	wstream = wstreamTemp;
	wstream.write("import * as mongoose from 'mongoose';" + '\r\n\r\n');
	model2Name = model2Name.substring(0, 1).toUpperCase() + model2Name.substring(1);
	wstream.write('export interface ' + model2Name + ' extends mongoose.Document {' + '\r\n');
	resolve(schemaBottom.push('let ' + model2Name.toLowerCase() + 'Schema = new mongoose.Schema({\r\n'));
	console.log(' ');
	console.log(model2Name + ' model');

		propertyName();
	};
    	resolve({data: 'files loop'});
	if (!moreToDo) {
		prepEntitys();
	}

  	});
	return promise;
	};

var prepEntitys = function() {
	var promise = new Promise(function(resolve, reject){
	extraEntitys();
	resolve({data: 'entity_name'})
	});
	return promise;
};

var extraEntitys = function() {
	var promise = new Promise(function(resolve, reject){
	inquirer.prompt({type: 'input', name: 'entity', message: 'Enter additional entity name or press dash (-):'}).then(function (answers) {
	entity = answers.entity;
	if (entity != '-' && entity != moreEntity.slice(-1)[0]) {
	mongoose.connect('mongodb://drew:saturday@ds161109.mlab.com:61109/databasedw');
	upper = entity.toUpperCase();
	lower = entity.toLowerCase();
	capone = lower.substring(0, 1).toUpperCase() +  lower.substring(1);
	for (var element of controllerList) {
		controller = true;
    		findIt(element.name, element.location, controller);
  	}

	moreEntity.push(moreEntity.slice(-1)[0]);
	prepEntitys();
	} else {
	if (entity = '-') {

	modelQuestion ();
	}}


	resolve({data: 'entity_name'})
	});
});
	return promise;
};

checkCleanArea();

