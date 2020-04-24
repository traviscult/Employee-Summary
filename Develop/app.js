const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const teamMembers = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const createManager = () => {
    return inquirer.prompt([{
            type: "input",
            name: "name",
            message: "What is your name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is your employee id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your email?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is your direct office number?"
        },
    ]).then((userInput) => {
        const manager = new Manager(userInput.name, userInput.id, userInput.email, userInput.officeNumber)
        teamMembers.push(manager)
        createTeam();
        // console.log(teamMembers)
    })

};


const createTeam = () => {
    return inquirer.prompt([{
        type: "list",
        name: "teamMember",
        message: "What type of team member would you like to add?",
        choices: ["Engineer", "Intern", "I do not want to add anymore members"]
    }]).then((userInput) => {
        switch (userInput.teamMember) {
            case "Engineer":
                createEngineer()
                break;
            case "Intern":
                createIntern()
                break;
                default:       
                writeFile()
        }
    })
}

const createEngineer = () => {
    return inquirer.prompt([{
        type: "input",
        name: "name",
        message: "What is your name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is your employee id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?"
    },
    {
        type: "input",
        name: "gitHub",
        message: "What is your GitHub UserName?"
    }]).then((userInput) => {
        const engineer = new Engineer(userInput.name, userInput.id, userInput.email, userInput.gitHub)
        teamMembers.push(engineer)
        createTeam();
        console.log(teamMembers)
    })

    createTeam()
}

const createIntern = () => {
    return inquirer.prompt([{
        type: "input",
        name: "name",
        message: "What is your name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is your employee id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?"
    },
    {
        type: "input",
        name: "school",
        message: "What school are you attending?"
    }]).then((userInput) => {
        const intern = new Intern(userInput.name, userInput.id, userInput.email, userInput.school)
        teamMembers.push(intern)
        createTeam();
        console.log(teamMembers)
    });
};


const writeFile = () =>{
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
      }
      fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
}

createManager();


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!



// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```