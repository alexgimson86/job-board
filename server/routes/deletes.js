// recruiter DELETE account form DELETE / ----------------------------------------------
var express = require('express')
    , router = express.Router()
    var mongoose = require('../dbConnection.js')
    const RecruiterSchema = require('../models/Recruiters');
    const JobSchema = require('../models/Jobs');
    
    const Recruiter = mongoose.model('Recruiter', RecruiterSchema);
    const Job = mongoose.model('Job', JobSchema);

router.delete('/recruiter/:recruiter_id', (req, res) => {
    Recruiter.remove({
      _id: req.params.recruiter_id
    }, (err, recruiter) => {
      if (err)
        res.send(err);
  
      res.json({ message: 'Recruiter successfully deleted.' });
    });
  });

  router.delete('/student/login/:id', (req, res) => { });

  router.delete('/job/:job_id', (req, res) => {
    Job.findByIdAndRemove(req.params.job_id, (err, job) => {
      if (err) return res.status(400).send(err);
      const response = {
        message: "Job successfully deleted",
        id: job._id
      };
      return res.status(200).send(response);
    })
  });
    
  module.exports = router