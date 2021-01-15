const Employee = require("./Employee");

// Constructor
class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }

    // Getter for school
    getSchool() {
        return this.school;
    }

    // Getter for role
    getRole() {
        return "Intern";
    }
}

// EXPORT
module.exports = Intern;
