const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");

// Variable to store employee information
const employees = [];

// Function to ask if the user wants to add a new member
const addMember = () => {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to add a new member to your team?",
                name: "addNewMember",
                choices: ["Engineer", "Intern", "No new members"],
            },
        ])
        .then((response) => {
            // Conditional to check which team member the user chose, if any
            if (response.addNewMember === "Engineer") {
                getEngineerInfo();
            } else if (response.addNewMember === "Intern") {
                getInternInfo();
            } else {
                console.log("Your team members have been added!");
                // If an output directory exists, render employees
                if (fs.existsSync("./output")) {
                    const renderEmployees = render(employees);
                    fs.writeFileSync(outputPath, renderEmployees, "utf-8");
                } else {
                    // If an output directory does not exist, create one and render employees
                    fs.mkdir("./output", function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("New directory successfully created.");
                            const renderEmployees = render(employees);
                            fs.writeFileSync(outputPath, renderEmployees, "utf-8");
                        }
                    });
                }
            }
        });
};

// Function to get manager information (name, ID, email, and office number)
const getManagerInfo = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your manager's name?",
                name: "managerName",
            },
            {
                type: "input",
                message: "What is your manager's ID?",
                name: "managerID",
            },
            {
                type: "input",
                message: "What is your manager's email?",
                name: "managerEmail",
            },
            {
                type: "input",
                message: "What is your manager's office number?",
                name: "managerOfficeNumber",
            },
        ])
        .then((response) => {
            // Ask if the user wants to add a member, then render employees
            addMember();
            // Create a new manager with the user's responses
            const manager = new Manager(
                response.managerName,
                response.managerID,
                response.managerEmail,
                response.managerOfficeNumber
            );
            // Put the new manager into the employees array
            employees.push(manager);
        });
};

// Function to get engineer information (name, ID, and GitHub username)
const getEngineerInfo = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your engineer's name?",
                name: "engineerName",
            },
            {
                type: "input",
                message: "What is your engineer's ID?",
                name: "engineerID",
            },
            {
                type: "input",
                message: "What is your engineer's email?",
                name: "engineerEmail",
            },
            {
                type: "input",
                message: "What is your engineer's GitHub username?",
                name: "engineerGitHub",
            },
        ])
        .then((response) => {
            // Ask if the user wants to add a member, then render employees
            addMember();
            // Create a new engineer with the user's responses
            const engineer = new Engineer(
                response.engineerName,
                response.engineerID,
                response.engineerEmail,
                response.engineerGitHub
            );
            // Put the new engineer into the employees array
            employees.push(engineer);
        });
};

// Function to get intern information (name, ID, email, and school)
const getInternInfo = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your intern's name?",
                name: "internName",
            },
            {
                type: "input",
                message: "What is your intern's ID?",
                name: "internID",
            },
            {
                type: "input",
                message: "What is your intern's email?",
                name: "internEmail",
            },
            {
                type: "input",
                message: "Where does your intern go to school?",
                name: "internSchool",
            },
        ])
        .then((response) => {
            // Ask if the user wants to add a member, then render employees
            addMember();
            // Create a new intern with the user's responses
            const intern = new Intern(
                response.internName,
                response.internID,
                response.internEmail,
                response.internSchool
            );
            // Put the new intern into the employees array
            employees.push(intern);
        });
};

// Function to initialize app
const init = () => {
    console.log("Please build your team");
    getManagerInfo();
};

// Initialize app
init();