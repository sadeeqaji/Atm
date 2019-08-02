const inquirer = require("inquirer");
const Menu = require("./AtmDisplay");
const pin = require("./Pin");
let admin = require("./Admin");
const ora = require('ora');

admin = admin.admin


function Transfer(){
    const transfer = [
        { 
        type: "list",
        name: "BankType",
        message: "Choice the bank you want receiver's bank",
        choices: ["FIRSTBANK", "GT BANK", "ACCESS BANK", "WEMA BANK"]
    },
        {
        type: "number",
        name: "AccNum",
        message: "enter the account number",
    },
    {
        type: "number",
        name: "amount",
        message: "enter the amount you want to withdraw",
    },

    {
        type: "password",
        name: "value4",
        mask: true,
        message: "enter the your 4 digit pin",
        validate: function(value){
            if(Number(value) === admin.pin ){
                return true;
            }
            return "Incorrect pin, your atm will be blocked on 3 attempts"
        }
    }
]



    inquirer.prompt(transfer).then(summary => {
        console.log("\n " + " ", summary.BankType, "\n " + " ", summary.AccNum, "\n " + " ",summary.amount)
        inquirer.prompt({
            type: "confirm",
            name: "confirm",
            message: "Do you want to continue with transaction"
        }).then(confirm => {
            setTimeout(function(){
                console.log("Please wait for your transaction is processing")
            }, 2000)
            console.log(confirm)
        })
    })
}


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
    }).then(res => {
        counter = 0;
        console.log(res.pin)
        if(res.pin == pin.pin )
        inquirer.prompt({
            type: 'list',
            name: "transaction",
            message: "What is your name",
            choices: Menu.menu
            
        }).then(result => {
            let check = result.transaction
            console.log(check)
            switch(check){
                case "Withdraw":
                        inquirer.prompt({
                            type: 'list',
                            name: "Amount",
                            message: "Choice the amount you want to widthraw",
                            choices: Menu.Withdraw
                        }).then(res => {
                            if(res.Amount === "Other"){
                                inquirer.prompt({
                                    type: 'number',
                                    name: 'Amount',
                                    message: "Enter the amount in multiple",
                                }).then(res => {
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
                                    if(admin.amount < res.Amount){
                                        console.log("\n Temporarily unable to dispense cs")
        
                                        spinner.stop()
                                    }
                                    else{
                                        admin.withdraw(res.Amount)
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
                    break;
                case "Balance and Inquiry":
                    console.log("Your balance is", admin.amount)
                    perfomAnotherTrans()
                    break;
                case "Transfer":
                    console.log(result.transaction)
                    Transfer()
                    break;
                case "Quickteller":
                    console.log(result.transaction)
                    break;
            }
            if(result.transaction === "Withdraw"){
                
            }
        })
        else{
            console.log("Wrong pin your Atm will be blocked")
        }
    })
    
}

module.exports = {customer}


