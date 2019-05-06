var express = require('express')
    , router = express.Router()
    // student sign up page --------------------------------------------------------
    var multer = require('multer');
    const uuidv4 = require('uuid/v4'); 
var passport = require('passport')
router.use(passport.initialize());
router.use(passport.session());
var local = require('../passport/login.js')
var initPassport = require('../passport/init.js');
initPassport(passport);
var path = require('path')

var mongoose = require('../dbConnection.js')
const RecruiterSchema = require('../models/Recruiters');
const JobSchema = require('../models/Jobs');
const StudentSchema = require('../models/Students');
const InstructorSchema = require('../models/Instructors');
const ResumeSchema = require('../models/Resumes');
const UserSchema = require('../models/Users') 
const MessageSchema = require('../models/Messages')

const ObjectID = require('mongodb').ObjectID;
const Recruiter = mongoose.model('Recruiter', RecruiterSchema);
const Student = mongoose.model('Student', StudentSchema);
const Job = mongoose.model('Job', JobSchema);
const Instructor = mongoose.model('Instructor', InstructorSchema);
const Resume = mongoose.model('Resume', ResumeSchema);
const User = mongoose.model('User', UserSchema);
const Messages = mongoose.model('Messages', MessageSchema);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      /*
        Files will be saved in the 'uploads' directory. Make
        sure this directory already exists!
      */
     var fullpath = __dirname.split('/');
     fullpath.pop();
     var st = '';
     fullpath.forEach(function(item, i){
       if(i < fullpath.length-1 && i !== 0){
            
        st += `/${item}`
       }
     })
     st += '/server/public/uploads'
      cb(null, st);
    },
    filename: (req, file, cb) => {
      /*
        uuidv4() will generate a random ID that we'll use for the
        new filename. We use path.extname() to get
        the extension from the original file name and add that to the new
        generated ID. These combined will create the file name used
        to save the file on the server and will be available as
        req.file.pathname in the router handler.
      */
      const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, newFilename);
    },
  });
  const upload = multer({ storage: storage })
router.post('/student/signup', (req, res) => {
    var user = new User(req.body)
    console.log('user created is \n', user);
    var student;
    var recruiter;

    if(req.body.student){
      student = new Student({ username:req.body.username }) 
      user.save(function (err, r) {
        if (err) {
          res.send(err)
        }
        else{
          student.save(function(err,r){
            if(err){
              res.send(err)
            }
            res.json(student)
          })
        }
      })
    }
    else{
      recruiter = new Recruiter({username: req.body.username})
      user.save(function (err, r) {
        if (err) {
          res.send(err)
        }
        else{
          recruiter.save(function(err,r){
            if(err){
              res.send(err)
            }
            res.json(recruiter)
          })
        }
      })
    }
  });
  //login with local strategy
  router.post('/student/login', 
    passport.authenticate('local', { failureRedirect: '/loginFailed' }),
    function(req, res) {
      req.session.user = req.user
      req.session.sessionID = req.sessionID;
      res.send(req.user);
    });
  // ****** Get all students from Postman *******
  router.post('/job', (req, res) => {
    Job.create(
      {
        jobTitle: req.body.jobTitle,
        // companyId: ObjectID(req.body.companyId),    will use later
        jobDescription: req.body.jobDescription,
        skills: req.body.skills,
        url: req.body.url,
        location: req.body.location
      }
    )
      .then(data => {
        console.log('Data returned from Recruiter Create Job ', data);
        res.json(data);
      })
      .catch(err => {
        res.json({ code: 400, message: "Recruiter job post failed", error: err });
      });
  });
  router.post('/resume/post/:username', upload.any(), (req, res) => {
    var resumeId = null;
    console.log(req.files)
    var resume = new Resume({ title: req.files[0].filename, studentId: req.params.username, pdfFileUrl: req.files[0].filename, })
    resume.save((err) => {
      if (err) 
        return handleError(err);
      Resume.findOne({ pdfFileUrl: { $eq: req.files[0].filename } }, (err, resume) => {
        if (!err) {
          resumeId = resume.id;
          Student.findOne( {"username" : req.params.username } , (err, student) => {
            student.resumes = ObjectID(resumeId)
            student.save((err) => {
              console.log(err)
              Student.findOne( {"username" : req.params.username } , (err, student) => {
                student.imageUrl = req.files[1].filename
                student.save((err) => {
                  if (err)
                  res.send(err);
                  res.send();
                });
              })
            })
          })
        //save image url to student db
      }
    });
  })})
  router.post('/recruiter/signup', (req, res) => {
    console.log('in /recruiter/signup, req.body sent is :\n', req.body)
    var recruiter = new Recruiter(req.body);
    console.log('recruiter created is \n', recruiter);
  
    recruiter.save(function (err, r) {
      if (err) {
        res.send(err)
      }
      res.json(recruiter)
    })
  });
  router.post('/instructor/signup', (req, res) => {
    console.log('in /instructor/signup, req.body sent is :\n', req.body)
    var instructor = new Instructor(req.body);
    console.log('student created is \n', instructor);
  
    instructor.save(function (err, r) {
      if (err) {
        res.send(err)
      }
      res.json(instructor)
    })
  
  });
  
  router.post('/post_message', (req, res) =>{
    var messages = new Messages(req.body);
    messages.save( err =>{
      if (err){
        console.log(err)
      }
      else{
        res.status(200).send();
      }
    })
  })
  module.exports = router