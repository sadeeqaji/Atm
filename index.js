const inquirer = require("inquirer");

const  customer = require("./lib/customer");
const Admin = require("./lib/Admin");

function start(){
    inquirer.prompt({
        type: "list",
        name: "val",
        message: "Welcome!",
        choices: ["User", "Admin"]
})
.then(res => {
    if(res.val === "User"){
        customer.customer()
    }
    else{
        Admin.adminConfig()
    }
})
}

start()

exports.start = start;