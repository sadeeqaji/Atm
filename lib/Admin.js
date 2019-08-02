const inquirer = require("inquirer");
const App = require("../index.js")


class Admin {
    constructor(amount, isActive){
        this.username = "username";
        this.pin = 6900;
        this.amount = amount || 0
        this.isActive = isActive || true;
    }
    checkBalance(){
        return `Your balance is ${this.amount}`
    }
    withdraw(amount){
        this.amount = this.amount - amount
    }
    addAmount(amount){
        this.amount = this.amount + amount
    }
    activate(value){
        this.isActive = value
    }


}



function perfomAnotherTrans(){
    inquirer.prompt({
        type: "list",
        name: "value",
        message: "Do you want to perform another transaction?",
        choices: ["Yes", "No"]
    }).then(val => {
        if(val.value == "Yes"){
            App.start()
        }
        return;
    })  
}

const question = [{
    type: "list",
    name: "val",
    message: "Choice the operation your want to perform",
    choices: ["Deposit", "Block Atm"]
}, {
    type: "list",
    name: "val",
    message: "Choice the operation your want to perform",
    choices: [1000, 2000, 5000, 10000, "Other"],
}]
function adminConfig(){
    inquirer.prompt(question).then(result => {
        if(typeof(result.val) === "number"){
            console.log("loading")
            setTimeout(function(){
               console.log("done")
               admin.addAmount(result.val)
               console.log("Your balance is now ", admin.checkBalance())
               perfomAnotherTrans()
            },2000)
            
        }
        else{
         inquirer.prompt({
             type: 'number',
             name: 'Amount',
             message: "Enter the amount in multiple",
         }).then(result => {
             console.log("loading")
             setTimeout(function(){
                console.log("done")
                admin.addAmount(result.Amount)
                console.log("Your balance is now ", admin.checkBalance())

             },2000)
             
            })
        }
 })
}


const admin =  new Admin(1000)

module.exports = {
    admin,
    adminConfig
}