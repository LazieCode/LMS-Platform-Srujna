var CryptoJS = require("crypto-js");

const { readQuery, readAllQuery } = require('../setups/mongo.setup')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.getCourses = async (req, res) => {
    try {
        const id = Number(req.query.id)
        const course = await readQuery('courses_courses', id);
        if (!course) {
            res.status(401).json({
                status: false,
                err: "Course not fetched try again"
            })
            return
        }

        res.status(200).json({
            status: true,
            courses: course
        })

    } catch (error) {
        res.status(401).json({
            status: false,
            err: "Not fetched"
        })
    }
}

exports.getAllCourses = async (req, res) => {
    try {

        const courses = await readAllQuery('courses_courses');
        if (!courses) {
            res.status(401).json({
                status: false,
                err: "All courses not fetched try again"
            })
            return
        }

        res.status(200).json({
            status: true,
            course: courses
        })

    } catch (error) {
        res.status(401).json({
            status: false,
            err: `${error}`
        })
    }
}



