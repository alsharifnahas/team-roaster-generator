// importing modules
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs");
const render = require("./lib/htmlRenderer");
const path = require("path");


const OUTPUT_DIR = path.resolve(__dirname, "./output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
// variable to store employee information
const employees = [];


// function to ask if the user wants to add a new member
const addEmployee = () => {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to add a new member to your team?",
                name: "newMember",
                choices: ["Engineer", "Intern", "I don't want to add"],
            },
        ])
        .then((response) => {
            // Conditional to check which team member the user chose, if any

            switch (response.newMember) {
                case "Engineer":
                    getEngineerInfo();
                    break;
                case "Intern":
                    getInternInfo();
                    break;
                case "I don't want to add":
                    renderHTML();
            }
        });
};

// function to get manager's information
const getManagerInfo = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your manager's name?",
                name: "name",
            },
            {
                type: "input",
                message: "What is your manager's ID?",
                name: "id",
            },
            {
                type: "input",
                message: "What is your manager's email?",
                name: "email",
            },
            {
                type: "input",
                message: "What is your manager's office number?",
                name: "officeNumber",
            },
        ])
        .then((response) => {


            const manager = new Manager(
                response.name,
                response.id,
                response.email,
                response.officeNumber
            );
            addEmployee();

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
                name: "name",
            },
            {
                type: "input",
                message: "What is your engineer's ID?",
                name: "id",
            },
            {
                type: "input",
                message: "What is your engineer's email?",
                name: "email",
            },
            {
                type: "input",
                message: "What is your engineer's GitHub username?",
                name: "gitHub",
            },
        ])
        .then((response) => {
            // Ask if the user wants to add a member, then render employees

            // Create a new engineer with the user's responses
            const engineer = new Engineer(
                response.name,
                response.id,
                response.email,
                response.gitHub
            );
            addEmployee();
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
                name: "name",
            },
            {
                type: "input",
                message: "What is your intern's ID?",
                name: "id",
            },
            {
                type: "input",
                message: "What is your intern's email?",
                name: "email",
            },
            {
                type: "input",
                message: "Where does your intern go to school?",
                name: "school",
            },
        ])
        .then((response) => {

            // Create a new intern with the user's responses
            const intern = new Intern(
                response.name,
                response.id,
                response.email,
                response.school
            );
            addEmployee();
            // Put the new intern into the employees array
            employees.push(intern);
        });
};

const renderHTML = () => {
    console.log("The HTML team page has been generated");
    const htmlPage = render(employees);
    fs.writeFile(outputPath, htmlPage, (err) =>
        err
            ? console.error(err)
            : console.log("file created successfully")
    );

}

// Function to initialize app
const init = () => {
    console.log("Please build your team");
    getManagerInfo();
};

// Initialize app
init();