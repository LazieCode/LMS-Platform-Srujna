const route = require('express').Router()
const services = require('./user.controller')



route.get('/getCourses', services.getCourses)
route.get('/getAllCourses', services.getAllCourses)

module.exports = route


