
const studentSchema = require ('../schema')
const mongoose = require ('mongoose')

const Student = mongoose.model('Student', studentSchema.studentSchema)


module.exports = Student;
