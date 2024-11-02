const express = require('express');
const DashBoardRoute = express();
const DashBoardController = require('../controllers/DashBoardController');

DashBoardRoute.get('/Dashboard-8', DashBoardController.GetDataFor8Dashboard);
DashBoardRoute.get('/Dashboard-10', DashBoardController.GetDataFor10Dashboard);
DashBoardRoute.get('/Students-data/:srn?/:isRegisteredBy?/:grade?/:district?/:block?/:school?/:name?/:father?', DashBoardController.GetAllStudentData);
module.exports = DashBoardRoute;