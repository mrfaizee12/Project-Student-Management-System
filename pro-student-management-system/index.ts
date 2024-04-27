#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk"
console.log(chalk.bgBlueBright.bold("\n \t Welcome to Faizee: Student Management System\n"));

class Student {
    static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];   // Initialize an empty array
        this.balance = 2000;
    }
    
    // Method to enroll a student in a course
    enroll_course(course: string) {
        this.courses.push(course);
    }

    // Method to view a student's balance
    view_balance() {
        console.log(chalk.yellow(`Balance for ${this.name}: $${this.balance}`));
    }

    // Method to pay student fees
    pay_fees(amount: number) {
        this.balance -= amount;
        console.log(chalk.green(`$${amount} fees paid successfully for ${this.name}`));
    }

    // Method to display student status
    show_status() {
        console.log(chalk.cyan(`ID: ${this.id}`));
        console.log(chalk.cyan(`Name: ${this.name}`));
        console.log(chalk.cyan(`Courses: ${this.courses}`));
        console.log(chalk.cyan(`Balance: ${this.balance}`));
    }
}

const students: Student[] = []; // Array to store students

// Function to add a new student
function addStudent() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter student's name:"
        }
    ]).then(answers => {
        const newStudent = new Student(answers.name);
    
        students.push(newStudent); // Add new student to the array
        console.log(chalk.bgGreenBright(`Student added successfully! ID: ${newStudent.id}`));
        menu();
    });
}

// Function to enroll a student in a course
function enrollStudent() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter student's name:"
        }
    ]).then(answers => {
        const student = findStudentByName(answers.name);
        if (student) {
            inquirer.prompt([
                {
                    type: "input",
                    name: "course",
                    message: "Enter course name:"
                }
            ]).then(courseAnswer => {
                student.enroll_course(courseAnswer.course);
                console.log(chalk.bgGreenBright(`${student.name} enrolled in ${courseAnswer.course} successfully!`));
                menu();
            });
        } else {
            console.log(chalk.bgRedBright("Student not found!"));
            menu();
        }
    });
}

// Function to find a student by name
function findStudentByName(name: string): Student | undefined {
    return students.find(student => student.name === name);
}

// Function to view a student's balance
function viewBalance() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter student's name:"
        }
    ]).then(answers => {
        const student = findStudentByName(answers.name);
        if (student) {
            student.view_balance();
        } else {
            console.log(chalk.bgRedBright("Student not found!"));
        }
        menu();
    });
}

// Function to pay student fees
function payFees() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter student's name:"
        },
        {
            type: "number",
            name: "amount",
            message: "Enter amount to pay:"
        }
    ]).then(answers => {
        const student = findStudentByName(answers.name);
        if (student) {
            student.pay_fees(answers.amount);
        } else {
            console.log(chalk.bgRedBright("Student not found!"));
        }
        menu();
    });
}

// Function to display student status
function showStatus() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter student's name:"
        }
    ]).then(answers => {
        const student = findStudentByName(answers.name);
        if (student) {
            student.show_status();
        } else {
            console.log(chalk.bgRedBright("Student not found!"));
        }
        menu();
    });
}

// Main menu function
function menu() {
    inquirer.prompt([
        {
            type: "list",
            name: "option",
            message: "Select an option:",
            choices: ["Add Student", "Enroll Student", "View Student Balance", "Pay Student Fees", "Show Student Status", "Exit"]
        }
    ]).then(answers => {
        switch (answers.option) {
            case "Add Student":
                addStudent();
                break;
            case "Enroll Student":
                enrollStudent();
                break;
            case "View Student Balance":
                viewBalance();
                break;
            case "Pay Student Fees":
                payFees();
                break;
            case "Show Student Status":
                showStatus();
                break;
            case "Exit":
                console.log(chalk.bgBlueBright("Exiting..."));
                break;
        }
    });
}

// Start the program
menu();

