// student update account form PUT ---------------------------------------------------
// be sure to set values in Postman if testing with Postman under the Body tab below the url path bar
var express = require('express')
    , router = express.Router()
require('../server')
var mongoose = require('../dbConnection.js')
const RecruiterSchema = require('../models/Recruiters');
const JobSchema = require('../models/Jobs');
const StudentSchema = require('../models/Students');
const InstructorSchema = require('../models/Instructors');
const ResumeSchema = require('../models/Resumes');
const UserSchema = require('../models/Users') 

const ObjectID = require('mongodb').ObjectID;
const Recruiter = mongoose.model('Recruiter', RecruiterSchema);
const Student = mongoose.model('Student', StudentSchema);
const Job = mongoose.model('Job', JobSchema);
const Instructor = mongoose.model('Instructor', InstructorSchema);
const Resume = mongoose.model('Resume', ResumeSchema);
const User = mongoose.model('User', UserSchema);

router.put('/student/:student_username', (req, res) => {
    //save user username for this session
    //req.session.student_username = req.params.student_username;
    Student.findOne( { "username" : req.params.student_username }, (err, student) => {
  
      // updating student info
      if (req.body.firstName) student.firstName = req.body.firstName;
      if (req.body.lastName) student.lastName = req.body.lastName;
      if (req.body.email) student.email = req.body.email;
      if (req.body.password) student.password = req.body.password;
      if (req.body.savedJobs) student.savedJobs = req.body.savedJobs;
      if (req.body.fieldOfStudy) student.fieldOfStudy = req.body.fieldOfStudy;
      if (req.body.skills) student.skills = req.body.skills;
      if (req.body.phone) student.phone = req.body.phone;
      if (req.body.street) student.address.street = req.body.street;
      if (req.body.zip) student.address.zip = req.body.zip;
      if (req.body.state) student.address.state = req.body.state;
      if (req.body.title) student.title = req.body.title;
  
      // save info
      student.save((err) => {
        if (err)
          res.send(err);
  
        res.json({ message: 'Student account information updated.' });
      });
  
    });
  });
  router.put('/resume/:resume_id', (req, res) => {
    console.log('in /resume/:resume_id, req.body sent is : ', req.body);
    Resume.findByIdAndUpdate(
      req.params.resume_id,
      req.body,
      { new: true },
      (err, resume) => {
        if (err) return res.status(500).send(err);
        return res.send(resume);
      }
    )
  });
  router.put('/job/:job_id', (req, res) => {
    Job.findById(req.params.job_id, (err, job) => {
  
      // updating student info
      job.jobTitle = req.body.jobTitle;
      job.jobDescription = req.body.jobDescription;
      job.skills = req.body.skills;
      job.location = req.body.location;
      job.url = req.body.url;
  
      // save info
      job.save((err) => {
        if (err)
          res.send(err);
  
        res.json({ message: 'Job information updated.' });
      });
  
    });
  });
router.put('/student/login/:id', (req, res) => { });

  router.put('/instructor/:instructor_id', (req, res) => {
    Instructor.findById(req.params.instructor_id, (err, instructor) => {
  
      // updating instructor info
      instructor.institution = req.body.institution;
      instructor.firstName = req.body.firstName;
      instructor.lastName = req.body.lastName;
      instructor.email = req.body.email;
      instructor.password = req.body.password;
      instructor.academicFields = req.body.academicFields;
  
      // save info
      instructor.save((err) => {
        if (err)
          res.send(err);
  
        res.json({ message: 'Instructor account information updated.' });
      });
  
    });
  });
  router.put('/recruiter/:username', (req, res) => {
    User.find({username: req.params.username }, (err, user) => {
  
      user.companyName = req.body.company;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;
      user.password = req.body.password;
      user.url = req.body.url; // updating recruiter info
  
      // save info
      user.save((err) => {
        if (err)
          res.send(err);
  
        res.json({ message: 'Recruiter account information updated.' });
      });
  
    });
  });

  module.exports = router