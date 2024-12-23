const express = require('express');
const DashBoardRoute = express();
const DashBoardController = require('../controllers/DashBoardController');

DashBoardRoute.get('/Dashboard-8', DashBoardController.GetDataFor8Dashboard);
DashBoardRoute.get('/Dashboard-10', DashBoardController.GetDataFor10Dashboard);
DashBoardRoute.get('/Students-data/:srn?/:isRegisteredBy?/:isVerified?/:grade?/:district?/:block?/:school?/:L1examinationCenter?/:admitCard1?', DashBoardController.GetAllStudentData);
//DashBoardRoute.get('/Students-data', DashBoardController.GetAllStudentData);
module.exports = DashBoardRoute;


