const courseSchema = require ('../schema')
const mongoose = require ('mongoose')

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);


module.exports = Course;