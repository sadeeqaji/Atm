const inquirer = require("inquirer");

const  customer = require("./customer.js");
const Admin = require("./Admin");

inquirer.prompt({
    type: "list",
    name: "val",
    message: "Welcome!",
    choices: ["User", "Admin"]
}).then(res => {
    if(res.val === "User"){
        customer.customer()
    }
    else{
        Admin.adminConfig()
    }
})

