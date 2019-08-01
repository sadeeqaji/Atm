const inquirer = require("inquirer");

const  customer = require("./lib/customer");
const Admin = require("./lib/Admin");

function test(){
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
}

test()

exports.test = test;