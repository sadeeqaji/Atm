const inquirer = require("inquirer");
const Menu = require("./AtmDisplay");
const pin = require("./Pin");
let admin = require("./Admin");
const ora = require('ora');

admin = admin.admin


//admin.withdraw(answ.Amount)

function perfomAnotherTrans(){
    inquirer.prompt({
        type: "list",
        name: "value",
        message: "Do you want to perform another transaction?",
        choices: ["Yes", "No"]
    }).then(val => {
        if(val.value == "Yes"){
            customer()
        }
        return;
    })  
}

function customer (){
    inquirer.prompt({
        type: 'password',
        name: "pin",
        message: "Please enter 4 digit pin",
        type: "password",
        mask : true
    }).then(answ => {
        counter = 0;
        console.log(answ.pin)
        if(answ.pin == pin.pin )
        inquirer.prompt({
            type: 'list',
            name: "transaction",
            message: "What is your name",
            choices: Menu.menu
            
        }).then(answers => {
            if(answers.transaction === "Withdraw"){
                inquirer.prompt({
                    type: 'list',
                    name: "Amount",
                    message: "Choice the amount you want to widthraw",
                    choices: Menu.Withdraw
                }).then(answ => {
                    if(answ.Amount === "Other"){
                        inquirer.prompt({
                            type: 'number',
                            name: 'Amount',
                            message: "Enter the amount in multiple",
                        }).then(answ => {
                            const spinner = ora('Loading unicorns').start("loading");
        
                        setTimeout(() => {
                            spinner.color = 'yellow';
                            spinner.text = 'Please wait for your transaction is processing';
                            }, 3000);
                        setTimeout(function (){
                            
                            console.log("\n=================================")
                            console.log(" \n Thank you for banking with us. Take your cash")
                            console.log("=================================")
                            spinner.stop()
                        },4000)
                        })
                    }else{
                        const spinner = ora('Loading unicorns').start("loading");
        
                        setTimeout(() => {
                            spinner.color = 'red';
                            spinner.text = 'Please wait for your transaction is processing';
                            }, 3000);
                            if(admin.amount < answ.Amount){
                                console.log("\n Temporarily unable to dispense cs")

                                spinner.stop()
                            }
                            else{
                                admin.withdraw(answ.Amount)
                                setTimeout(function (){
                                    console.log("\n=================================")
                                    console.log("Please take your card")
                                    console.log(" \n Thank you for banking with us")
                                    perfomAnotherTrans() 
                                    spinner.stop()
                                },5000)
                                 
                            } 
                                               
                    }                                           
                })
            }
        })
        else{
            console.log("Wrong pin your Atm will be blocked")
        }
    })
    
}

module.exports = {customer}


