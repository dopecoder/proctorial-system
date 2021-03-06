# Proctorial System

This project was developed to provide a college proctorial system for ease of student data and other college or university data to come under a single place and perform analytics to find insights from the data to evaluate the students, subjects, teachers and classrooms based on a criteria.

This project is centered for proctoring VTU students.

## There are three components:
 * MongoDB: This is the back-end database used to store the data in documents, there is no much work here other than installing mongoDB.
 * Server : This is the back-end server used by the Angular 2 front-end to perform CRUD operations on the data stored in the mongoDB database.Contains the expressJS REST API for the Angular 2 front-end.
 * Client : This is the Angular 2 application which performs most of the task of web development, such as Getting the data, Displaying it, Recieveing user input and most of other tasks.This is the essence of using a Web application.

## How to run it?
* Step 1 : Go to 'server' folder ```cd server``` from the root folder of the project and run ```npm install``` or ```sudo npm install```, this will install the necessary node_modules for the REST api application, after installation run ```cd ..``` to go back to the root directory.
* Step 2 : Go to 'client' folder ```cd client``` from the root folder of the project and run ```npm install``` or ```sudo npm install``` once again, this will install the necessary node_modules for angular 2 application.
* Step 3 : You need to have mongodb installed, make sure its running at default port 27017, otherwise you will have to change the defualt monogoPort variable in ```root/server/server.js``` as ```  var mongoBaseUrl = 'mongodb://localhost';  
	var mongoPort = ':27017';   
	var mongoPath = '/docs';```
* Step 4 : Go to project root by running ```cd ..``` to go back to the previous folder, execute ```'npm run-script serverinit'```, this initializes the database and start the server at 8080.
* Step 5 : Go to 'client' folder `cd client` from the root folder of the project and run ```npm start```, this starts the angular 2 app, 
* Step 6 : Then go to ```http://localhost:4200``` in your browser to watch it work!

## Screenshot

![Alt text](./screenshot.png?raw=true "Optional Title")
  
## Getting an error
  If you are getting an error related to Ports or already running process, then you should kill the already runnning processes by using ```sudo killall -9 node```. And kill Angular 2 by getting the process ID of it, execute ```ps -all```, look for ```@angular/cli```, get its correspoinding PID, and execute ```sudo kill -9 "PID"```.

## Build

Not required unless there are build errors as `npm start` does the building.
Run `cd client` and `ng build` to build the angular 2 app under the folder /client

## Further help

If you have any queries you can leave a comment under 'Pull requests', I will reply back. 
