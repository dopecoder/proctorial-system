
const express = require('express');
const router = express.Router();
var Classroom = require('../models/Classroom');
var Student = require('../models/Student');
var User = require('../models/User');
var Instructor = require('../models/Instructor');
var Subject = require('../models/Subject');
var extend = require('extend'); // npm install extend
// declare axios for making http requests
//const axios = require('axios');
const API = 'localhost';

router.route('/Classroom')

.post(function(req, res) {

	if(req.body.name == undefined || req.body.department == undefined || req.body.section == undefined || req.body.semester == undefined || req.body.year_of_passing == undefined){
		console.log("Not enough fields.");
		res.json({"message":"submit all the details."})
	}else{
		//crete classroom object
		console.log("Creating class");
		var classroom = new Classroom({
			name : req.body.name,
			section : req.body.section,
			semester : req.body.semester,
			department : req.body.department,
			year_of_passing : req.body.year_of_passing,
			students : req.body.students || Array(),
			subjects : req.body.subjects || Array()
		});
		console.log(req.body.department);

		//write the document to the database
		classroom.save(function(err, classroom){
			if(err){
				console.log(err);
				res.send(err);
			}
			res.json(classroom);
		});
	}
})

// get all the classrooms (accessed at GET http://localhost:8080/api/Classrooms)
.get(function(req, res) {
	Classroom.find(function(err, classrooms) {
		if (err)
		res.send(err);

		//res.set('Access-Control-Allow-Origin', '*');
		res.json(classrooms);
	});
});


// -------------------------------------------------------------------
router.route('/Classroom/:classroom_id')

// get the bear with that id
.get(function(req, res) {
	Classroom.findById(req.params.classroom_id, function(err, classroom) {
		if (err)
			res.send(err);
		res.json(classroom);
	});
})

// update the bear with this id
.put(function(req, res) {
	Classroom.findById(req.params.classroom_id, function(err, classroom) {

		if (err)
			res.send(err);
		//update the required fields
		//classroom.update_fields(req.body);
		classroom.name = req.body.name || classroom.name;
		classroom.section = req.body.section || classroom.section;
		classroom.semester = req.body.semester || classroom.semester;
		classroom.department = req.body.department || classroom.department;
		classroom.year_of_passing = req.body.year_of_passing || classroom.year_of_passing;
		classroom.students = req.body.students || classroom.students;
		console.log("Updateing classsroom subjects");
		console.log(req.body.subjects);
		classroom.subjects = req.body.subjects || classroom.subjects;

		classroom.save(function(err, classroom) {
			if (err)
				res.send(err);
			res.json(classroom);
		});

	});
})

// delete the bear with this id
.delete(function(req, res) {
	Classroom.remove({
		_id: req.params.classroom_id
	}, function(err, classroom) {
		if (err)
			res.send(err);
		res.json({ message: 'Successfully deleted' });
	});
});




//------------------------------------------------------------------------------------------------------


router.route('/Student')

// create a bear (accessed at POST http://localhost:8080/bears)
.post(function(req, res) {
	console.log(req.body);

	var student = new Student({
		classroom_id : req.body.classroom_id,
		first_name : req.body.first_name,
		last_name : req.body.last_name,
		usn : req.body.usn,
		email : req.body.email,
		department : req.body.department,
		semester : req.body.semester,
		section  : req.body.section,
		year_of_joining  : req.body.year_of_joining,
		backlogs : {
			current : req.body.backlogs.current,
			dead : req.body.backlogs.dead
		},
		marks : {
			elementary : req.body.marks.elementary || 0,
			associate : req.body.marks.associate || 0,
			first : req.body.marks.first || 0,
			second : req.body.marks.second || 0,
			third : req.body.marks.third || 0,
			fourth : req.body.marks.fourth || 0,
			fifth : req.body.marks.fifth || 0,
			sixth : req.body.marks.sixth || 0,
			seventh : req.body.marks.seventh || 0,
			eighth : req.body.marks.eighth || 0
		}

	});

	//update the required fields


	student.save(function(err, student){
		if(err)
			res.send(err);

		Classroom.findById(student.classroom_id, function(err, classroom){
			for(var i=0; i<classroom.subjects.length; i++){
				Subject.findById(classroom.subjects[i].object_id, function(err, subject){
					subject.internal_marks.push({student_id:student._id, internal1:0, internal2:0, internal3:0});
	      	subject.attendance.push({student_id:student._id, quarter1:0, quarter2:0, quarter3:0});
					subject.save();
				});
			}
		});
		res.json(student);
	});
})

// get all the users (accessed at GET http://localhost:8080/api/bears)
.get(function(req, res) {
	Student.find(function(err, students) {
		if (err)
		res.send(err);

		//res.set('Access-Control-Allow-Origin', '*');
		res.json(students);
	});
});


// ----------------------------------------------------
router.route('/Student/:student_id')

// get the bear with that id
.get(function(req, res) {
	Student.findById(req.params.student_id, function(err, student) {
		if (err)
		res.send(err);
		res.json(student);
	});
})

// update the bear with this id
.put(function(req, res) {
	Student.findById(req.params.student_id, function(err, student) {

		if (err)
		res.send(err);

		console.log(student.marks);

		//update the required fields
		student.classroom_id = req.body.classroom_id || student.classroom_id;
		student.first_name = req.body.first_name || student.first_name;
		student.last_name = req.body.last_name || student.last_name;
		student.usn = req.body.usn || student.usn;
		student.email = req.body.email || student.email;
		student.department = req.body.department || student.department;
		student.semester = req.body.semester || student.semester;
		student.section  = req.body.section || student.section;
		student.year_of_joining  = req.body.year_of_joining || student.year_of_joining;
		student.marks.elementary = req.body.marks.elementary || student.marks.elementary;
		student.marks.associate = req.body.marks.associate || student.marks.associate;
		student.marks.first = req.body.marks.first || student.marks.first;
		student.marks.second = req.body.marks.second || student.marks.second;
		student.marks.third = req.body.marks.third || student.marks.third;
		student.marks.fourth = req.body.marks.fourth || student.marks.fourth;
		student.marks.fifth = req.body.marks.fifth || student.marks.fifth;
		student.marks.sixth = req.body.marks.sixth || student.marks.sixth;
		student.marks.seventh = req.body.marks.seventh || student.marks.seventh;
		student.marks.eighth = req.body.marks.eighth || student.marks.eighth;
		student.backlogs = req.body.backlogs || { current:0, dead:0};

		student.save(function(err) {
			if (err)
			res.send(err);

			res.json({ message: 'student updated!' });
		});

	});
})

// delete the bear with this id
.delete(function(req, res) {
	Student.remove({
		_id: req.params.student_id
	}, function(err, student) {
		if (err)
		res.send(err);

		res.json({ message: 'Successfully deleted' });
	});
});



//--------------------------------------------------------------------------------------------------------------

router.route('/User')

// create a bear (accessed at POST http://localhost:8080/bears)
.post(function(req, res) {
	var user = new User();
	//update all the fields
	student.name = req.body.name;
	student.email = req.body.email;
	student.password = req.body.password;
	student.access_level = req.body.access_level;

	User.save(function(err){
		if(err)
		res.send(err);
		res.json("user created!");
	});


})

// get all the users (accessed at GET http://localhost:8080/api/bears)
.get(function(req, res) {
	User.find(function(err, users) {
		if (err)
		res.send(err);

		res.json(users);
	});
});

// /User/:user_id -> GET/PUT /User/6ahfbuewsbf3bhjssjhbufub723bw
// ----------------------------------------------------
router.route('/User/:user_id')

// get the bear with that id
.get(function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
		if (err)
		res.send(err);
		res.json(user);
	});
})

// update the bear with this id
.put(function(req, res) {
	User.findById(req.params.user_id, function(err, user) {

		if (err)
		res.send(err);

		//update the required fields
		user.save(function(err) {
			if (err)
			res.send(err);

			res.json({ message: 'user updated!' });
		});

	});
})

// delete the bear with this id
.delete(function(req, res) {
	User.remove({
		_id: req.params.user_id
	}, function(err, user) {
		if (err)
		res.send(err);

		res.json({ message: 'Successfully deleted' });
	});
});

//--------------------------------------------------------------------------------------------------------------

router.route('/Instructor')

// create a bear (accessed at POST http://localhost:8080/bears)
.post(function(req, res) {

	if(req.body.name == undefined || req.body.id == undefined || req.body.department == undefined || req.body.year_of_joining == undefined){
		res.json({"message":"submit all the details."})
	}else{
		//crete classroom object
		var instructor = new Instructor({
			name : req.body.name,
			id : req.body.id,
			department: req.body.department,
			year_of_joining : req.body.year_of_joining,
			subjects : req.body.subjects || Array(),
			my_classrooms : req.body.classrooms || Array()
						//classrooms : req.body.students || Array()
		});
		console.log(req.body.name);

		//write the document to the database
		instructor.save(function(err, instructor){
			if(err)
			res.send(err);
			console.log("Successfully saved instructor. " + err);
			res.json(instructor);
		});
	}
})

// get all the classrooms (accessed at GET http://localhost:8080/api/Classrooms)
.get(function(req, res) {
	Instructor.find(function(err, instructors) {
		if (err)
		res.send(err);

		//res.set('Access-Control-Allow-Origin', '*');
		res.json(instructors);
	});
});


// -------------------------------------------------------------------
router.route('/Instructor/:instructor_id')

// get the bear with that id
.get(function(req, res) {
	Instructor.find(function(err, instructors) {
		if (err)
		res.send(err);
		for (var i = 0; i < instructors.length; i++) {
			if(instructors[i] == req.params.instructor_id){
				console.log("Returning instructor");
				res.json(instructors[i]);
			}
		}
	});
})

// update the bear with this id
.put(function(req, res) {
	/*Instructor.find(function(err, instructors) {
	if (err)
	res.send(err);
	for (var i = 0; i < instructors.length; i++) {
	if(instructors[i] == req.params.instructor_id){
	res.json(instructors[i]);
}
}
});

Instructor.findByIdAndUpdate(req.params.instructor_id,
    {
        "$set": { "name": req.body.name },
				"$set": { "department": req.body.department },
				"$set": { "year_of_joining": req.body.year_of_joining },
				"$set": { "id": req.body.id },
        "$push": { "subjects": req.body.subjects }
    },
    function (err, managerparent) {
        if (err) throw err;
        console.log(managerparent);
    }
);*/


Instructor.findById(req.params.instructor_id, function(err, instructor) {
	console.log("Updating instructor");
	console.log(req.body.subjects);
	if (err)
	res.send(err);
	//update the required fields
	//classroom.update_fields(req.body);
	instructor.name = req.body.name || instructor.name;
	instructor.id = req.body.id || instructor.id,
	instructor.department = req.body.department || instructor.department;
	instructor.year_of_joining = req.body.year_of_joining || instructor.year_of_joining;
	//if(instructor.subjects == undefined)
	//instructor.subjects = new Array();
	//for(var subject=0; subject < req.body.subjects.length; subject++){
	//instructor.subjects.extend(req.body.subjects);
	//}
	instructor.subjects = req.body.subjects || instructor.subjects;
	instructor.my_classrooms = req.body.my_classrooms || instructor.my_classrooms;
	//instructor.classrooms = req.body.classrooms || instructor.classrooms;

	instructor.save(function(err, instructor) {
		if (err)
			res.send(err);
		console.log(instructor);
		res.json(instructor);
	});

});
})

// delete the bear with this id
.delete(function(req, res) {
	Instructor.remove({
		_id: req.params.instructor_id
	}, function(err, classroom) {
		if (err)
		res.send(err);
		res.json({ message: 'Successfully deleted' });
	});
});




//------------------------------------------------------------------------------------------------------

router.route('/Subject')

// create a bear (accessed at POST http://localhost:8080/api/Subject)
.post(function(req, res) {

	if(req.body.name == undefined || req.body.department == undefined || req.body.semester == undefined || req.body.section == undefined){
		res.json({"message":"submit all the details."})
	}else{
		//crete classroom object
		var subject = new Subject({
			name : req.body.name,
			//id : req.body.id,
			section: req.body.section,
			department: req.body.department,
			semester : req.body.semester,
			subject_code : req.body.subject_code,
			instructors : req.body.instructors || Array(),
			internal_marks : req.body.internal_marks || Array(),
			attendance : req.body.attendance || Array(),
			portionCompletion : req.body.portionCompletion
		});
		console.log(req.body.name);

		//write the document to the database
		subject.save(function(err, subject){
			if(err)
			res.send(err);
			console.log("Saved subject to database." + err);
			res.json(subject);
		});
	}
})

// get all the classrooms (accessed at GET http://localhost:8080/api/Classrooms)
.get(function(req, res) {
	Subject.find(function(err, subjects) {
		if (err)
		res.send(err);

		//res.set('Access-Control-Allow-Origin', '*');
		res.json(subjects);
	});
});


// -------------------------------------------------------------------
router.route('/Subject/:subject_id')

// get the bear with that id
.get(function(req, res) {
	Subject.findById(req.params.subject_id, function(err, subject) {
		if (err)
		res.send(err);
		res.json(subject);
	});
})

// update the bear with this id
.put(function(req, res) {
	Subject.findById(req.params.subject_id, function(err, subject) {

		if (err)
		res.send(err);
		//update the required fields
		//classroom.update_fields(req.body);
		subject.name = req.body.name || subject.name;
		subject.id = req.body.id || subject.id,
		subject.subject_code = req.body.subject_code || subject.subject_code;
		subject.department = req.body.department || subject.department;
		subject.section = req.body.section || subject.section;
		subject.semester = req.body.semester || subject.semester;
		subject.internal_marks = req.body.internal_marks || subject.internal_marks;
		subject.attendance = req.body.attendance || subject.attendance;
		subject.instructors = req.body.instructors || subject.instructors;
		subject.portionCompletion = req.body.portionCompletion || subject.portionCompletion;

		subject.save(function(err, subject) {
			if (err)
			res.send(err);
			res.json(subject);
		});

	});
})

// delete the bear with this id
.delete(function(req, res) {
	Subject.remove({
		_id: req.params.subject_id
	}, function(err, classroom) {
		if (err)
		res.send(err);
		res.json({ message: 'Successfully deleted' });
	});
});




//------------------------------------------------------------------------------------------------------

module.exports = router;
