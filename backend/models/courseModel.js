const courseSchema = require ('../schema')
const mongoose = require ('mongoose')

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema.courseSchema);


module.exports = Course;