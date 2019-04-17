var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CourseSchema = new Schema(
  {
    course: {
      type: String,
      ref: 'Courses'
    }
  }
)

var EducationSchema = new Schema(
  {
    school: {
      type: String,
      // required: true,
      trim: true
    },
    major: {
      type: String,
      // required: true,
      trim: false
    },
    courses: [CourseSchema],
    dateFrom: {
      type: Date,
      required: false
    },
    dateTo: {
      type: Date
    },
    location: {
      city: {
        type: String,
        // required: true,
        required: false,
        trim: true
      },
      state: {
        type: String,
        // required: true,
        required: false,
        trim: true
      }
    }
  }
)

var VideosSchema = new Schema(
  {
    url: {
      type: String,
      trim: true,
      required: false
    }
  }
)

var ExperienceSchema = new Schema(
  {
    company: {
      type: String,
      // required: true,
      trim: true
    },
    startDate: {
      type: Date,
      required: false
    },
    endDate: {
      type: Date
    },
    responsibilities: {
      type: String,
      // required: true,
      trim: true
    }
  }
)

var SkillsSchema = new Schema(
  {
    skill: {
      type: String,
      ref: 'Skill',
      trim: true
    }
  }
)

var ResumeSchema = new Schema(
  {
    title: {
      // Resume title * every collection will have an according title entry for versatile listing functionality
      type: String,
      required: true,
      trim: true
    },
    // studentId will be modified to be based off of authentication eventually
    studentId: {
      type: String
      //ref: 'Student'
    },
    defaultFlag: {
      type: Boolean,
      // required: true
      required: false
    },
    videos: [VideosSchema],
    summary: {
      type: String,
      required: false,
      trim: true
    },
    education: [EducationSchema],
    workExperience: [ExperienceSchema],
    skills: [SkillsSchema],
    pdfFileUrl: {
      type: String,
      trim: true
    },
    isPrivate: {
      type: Boolean,
      required: false
    }
  });

module.exports = ResumeSchema;