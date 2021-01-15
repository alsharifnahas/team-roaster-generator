const Employee = require("./Employee");

// CONSTRUCTOR
class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }

    // getting for GitHub ID
    getGithub() {
        return this.github;
    }

    // Getter for role
    getRole() {
        return "Engineer";
    }

}

// EXPORTS
module.exports = Engineer;