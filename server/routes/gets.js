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
const MessageSchema = require('../models/Message') 

const ObjectID = require('mongodb').ObjectID;
const Recruiter = mongoose.model('Recruiter', RecruiterSchema);
const Student = mongoose.model('Student', StudentSchema);
const Job = mongoose.model('Job', JobSchema);
const Instructor = mongoose.model('Instructor', InstructorSchema);
const Resume = mongoose.model('Resume', ResumeSchema);
const User = mongoose.model('User', UserSchema);
const Message = mongoose.model('Message', MessageSchema);

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
}
router.get('/student/login/:id', (req, res) => { });
router.get('/loginFailed', (req, res) => {
    res.status(404).send()
})
router.get('/student/:student_id', (req, res) => {
    Student.findById(req.params.student_id, (err, student) => {
        if (err)
            res.send(err);
        res.json(student);
    });
});
router.get('/resume', (req, res) => {
    Resume.find((err, resumes) => {
        if (err)
            res.send(err);
        console.log('resumes are ', resumes)
        res.json(resumes);
    })
});

// get individual resume
router.get('/resume/:student_id', (req, res) => {
    Student.findById(req.params.student_id, (error, student) => {
        Resume.findById(student.resumes[0], (err, resume) => {
            if (err)
                res.send(err);
            res.send(resume.pdfFileUrl);

        });
    })
});
router.get('/recruiter', (req, res) => {
    var myStudentInfo = []
    Student.find({username: req.user.username }, (err, student)=>{
        myStudentInfo.push(student)
        Recruiter.find((err, recruiters) => {
            if (err){
                res.send(err);
            }
            var userAndRecruiters = myStudentInfo.concat(recruiters)
            res.json(userAndRecruiters);
        });
    })
});

// /////////////////
router.get('/job/:username', (req, res) => {
    Job.find({recruiterUsername: req.params.username },(err, jobs) => {
        if (err)
            res.send(err);
        res.json(jobs);
    })
});

// get the recruiter with that id (accessed at GET http://localhost:3001/recruiter/:recruiter_id)
router.get('/recruiter/:username', (req, res) => {

    Recruiter.find({ username:req.params.username } , (err, recruiter) => {
        if (err)
            res.send(err);
        res.json(recruiter);
    });
});
router.get('/getMessages/:username', (req,res)=>{
    Message.find({"to": req.params.username}, (err, msg) =>{
        if(err) res.send(err)
        else res.json(msg)
    })
});
router.get('/job/:job_id', (req, res) => {
    Job.findById(req.params.job_id, (err, job) => {
        if (err)
            res.send(err);
        res.json(job);
    });
});

// get the instructor with that id (accessed at GET http://localhost:3001/instructor/:instructor_id)
router.get('/instructor/:instructor_id', (req, res) => {
    Instructor.findById(req.params.instructor_id, (err, instructor) => {
        if (err)
            res.send(err);
        res.json(instructor);
    });
});

// Below is Instructor Code -----------------------------------------------------------

// router.get to get and see ALL instructors in postman

router.get('/instructor', (req, res) => {
    Instructor.find((err, instructors) => {
        if (err)
            res.send(err);
        res.json(instructors);
    });
});
router.get('/instructor/:instructor_id', (req, res) => {
    Instructor.findById(req.params.instructor_id, (err, instructor) => {
        if (err)
            res.send(err);
        res.json(instructor);
    });
});
router.get('/checkForLogin', (req, res) => {
    if(req.user){
        res.send(true)
    }
    else{
        res.send(false)
    }
})
router.get('/student', isAuthenticated,
    (req, res) => {
        if(req.user.recruiter){
        console.log(req.user);
        Student.find((err, students) => {
            if (err)
                res.send(err);

            res.json(students);
        })
    }
    else{
        res.redirect('/recruiter')
    }
    });
router.get('/logout', (req, res) => {
    req.logout();
    res.status(200).send();

})
module.exports = router;