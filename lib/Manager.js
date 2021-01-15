const Employee = require("./Employee");

// CONSTRUCTOR
class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    // Getter for role
    getRole() {
        return "Manager";
    }

    // Getter for Office number
    getOfficeNumber() {
        return this.officeNumber;
    }
}

// EXPORT
module.exports = Manager
