"use strict"; //  undeclared variables prohibited.

//no form input fields reffered here to make it look like a library.

var transList = []; // array to store transactions

// short form of months to be displayed. This is needed because old browsers don't support toLocaleDateString
//can't use substring on date string, because it contains "," which is not presented in date in screenshot
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//transaction is the class will be used to insert objects in transList
function transaction(type, amount, date) {
    this.type = type; // deposit or withdrawal  - string
    this.amount = amount; //string
    this.amountDisplay = (type === "deposit") ? amount : "(" + amount + ")"; // display (amount) for withdrawal
    this.dateDisplay = date;//date is already validated and converted to format to be displayed

};


//if input is undefined, it will consider current date as input
//input is string/nothing
//outout is  01/01/2001 >  [ 1, 1, 2001] ie. [ month, day, year]
var getDateParts = function (dateValue) {

    if (typeof dateValue === "undefined") {
        var currentdate = new Date();
        //month is done + 1 because it returns one less number than actual month e.g. 2 for march
        return [currentdate.getMonth() + 1, currentdate.getDate(), currentdate.getFullYear()];
    }
    var datereg = /^\d{1,2}\/\d{1,2}\/\d{4}$/; //e.g.  99/99/1111
    if (dateValue.match(datereg)) {
        var splitDateInput = dateValue.split("/");
        var monthPart = parseInt(splitDateInput[0], 10);// e.g. 99
        var dayPart = parseInt(splitDateInput[1], 10);// e.g. 99
        var yrPart = parseInt(splitDateInput[2], 10);// e.g. 1111
        var date = new Date();// gives current date
        date.setYear(yrPart);
        date.setMonth(monthPart - 1);
        date.setDate(dayPart);
        // now test data ( 99/99/1111) gives date as Sat Jun 07 1119 00:00:00 GMT-0400 (Eastern Daylight Time)
        //so now compare with inputs again.
        //good thing is leap check is also done in below if condition, like 02/29/2015 will fail here.
        if (date.getFullYear() === yrPart && date.getMonth() + 1 === monthPart && date.getDate() === dayPart) {
            return [monthPart, dayPart, yrPart];
        }
        //if input was valid ,an array containing month, day , year numbers is returned
        //or else nothing - undefined

    }

}

//input integer/nothing
//output is a transaction object
var getTransaction = function (index) {
    if (typeof index === "undefined") {
        return transList.length;
    }
    else if (index < transList.length) {
        return transList[index];
    }



};

//now add transaction is simple, inputs must be valid, simply add an object of type transaction to transList
//input string, string , string
var addTransaction = function (type, amount, date) {

    transList.push(new transaction(type, amount, date));
};

//this adds amount to total for deposit
// and subtract amount from deposit for withdrawal
//input string, string, string
//output string
var calculateBalance = function (type, amount, total) {
    //amount = parseFloat(parseFloat(amount, 10).toFixed(2), 10);
    // total = parseFloat(parseFloat(total, 10).toFixed(2), 10);
    amount = parseFloat(amount, 10);
    total = parseFloat(total, 10);
    if (type === "deposit")
        return (total + amount).toFixed(2);
    else
        return (total - amount).toFixed(2);
};

//used to format any string like  -23.2222 to (23.22) 
//or 23.2222 to 23.22
var formatTotal = function (am) {

    am = parseFloat(am, 10);

    return (am < 0) ? "(" + Math.abs(am).toFixed(2) + ")" : am.toFixed(2);


};

