var highEarning = document.getElementById("highEarning");
var highEarningValue = document.getElementById("highEarningValue");
var highExpense = document.getElementById("highExpense");
var highExpenseValue = document.getElementById("highExpenseValue");
var highBalance = document.getElementById("highBalance");
var highBalanceValue = document.getElementById("highBalanceValue");
var highEarningMonth = document.getElementById("highEarningMonth");
var highEarningMonthValue = document.getElementById("highEarningMonthValue");
var highExpenseMonth = document.getElementById("highExpenseMonth");
var highExpenseMonthValue = document.getElementById("highExpenseMonthValue");
var listCategories = document.getElementById("list-categories");
var monthsTotal = document.getElementById("months-total");
var infoReportes = document.getElementById("info-reports");
var reportesEmpty = document.getElementById("emptyReports");
var data = getStorage();
//Variables
var operations = data.operations;
var categories = data.categories;
var objectCategories = {};
var objectYear = {};
var operationsEaring = operations.filter(function (category) { return category.type === "Ganancias"; });
var operationsExpense = operations.filter(function (category) { return category.type === "Gastos"; });
var createObjectCategories = function () {
    operations.map(function (operacion) {
        if (!objectCategories[operacion.category]) {
            objectCategories[operacion.category] = {};
        }
        if (!objectCategories[operacion.category][operacion.type]) {
            objectCategories[operacion.category][operacion.type] = 0;
        }
        objectCategories[operacion.category][operacion.type] += Number(operacion.amount);
    });
    return objectCategories;
};
var createObjectDates = function () {
    operations.map(function (operacion) {
        var date = new Date(operacion.date);
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (!objectYear[year]) {
            objectYear[year] = {};
        }
        if (!objectYear[year][month]) {
            objectYear[year][month] = {};
        }
        if (!objectYear[year][month][operacion.type]) {
            objectYear[year][month][operacion.type] = 0;
        }
        objectYear[year][month][operacion.type] += Number(operacion.amount);
        return objectYear;
    });
};
var calcHighEarning = function (operations) {
    if (operations.length > 0) {
        var operationsOrder = operations.sort(function (a, b) { return b.amount - a.amount; });
        var highEarningLabel = document.createElement("label");
        var highEarningTxt = document.createTextNode(operationsOrder[0].category);
        var highEarningTxtValue = document.createTextNode("$ " + operationsOrder[0].amount);
        highEarningLabel.appendChild(highEarningTxt);
        highEarning.appendChild(highEarningLabel);
        highEarningValue.appendChild(highEarningTxtValue);
        highEarningValue.classList.add("text-success");
    }
};
var calcHighExpense = function (operations) {
    if (operations.length > 0) {
        var operationsOrder = operations.sort(function (a, b) { return b.amount - a.amount; });
        console.log(operationsOrder[0]);
        var highExpenseLabel = document.createElement("label");
        var highExpenseTxt = document.createTextNode(operationsOrder[0].category);
        var highExpenseTxtValue = document.createTextNode("$ " + operationsOrder[0].amount);
        highExpenseLabel.appendChild(highExpenseTxt);
        highExpense.appendChild(highExpenseLabel);
        highExpenseValue.appendChild(highExpenseTxtValue);
        highExpenseValue.classList.add("text-danger");
    }
};
var calcHighBalance = function () {
    var maxBalance = 0;
    var categoryName = "";
    for (var prop in objectCategories) {
        var balance = objectCategories[prop].Ganancias - objectCategories[prop].Gastos;
        if (balance > maxBalance) {
            maxBalance = balance;
            categoryName = prop;
        }
    }
    var highBalanceLabel = document.createElement("label");
    var highBalanceTxt = document.createTextNode("" + categoryName);
    var highBalanceTxtValue = document.createTextNode("$ " + maxBalance);
    highBalanceLabel.appendChild(highBalanceTxt);
    highBalance.appendChild(highBalanceLabel);
    highBalanceValue.appendChild(highBalanceTxtValue);
    highBalanceValue.classList.add("text-dark");
};
var calcHighEarningMonth = function () {
    var maxVal = 0;
    var highMonth = "";
    for (var prop in objectYear) {
        for (var i in objectYear[prop]) {
            if (objectYear[prop][i].Ganancias > maxVal) {
                maxVal = objectYear[prop][i].Ganancias;
                highMonth = (i === "1" ?
                    "Enero" : i === "2" ?
                    "Febrero" : i === "3" ?
                    "Marzo" : i === "4" ?
                    "Abril" : i === "5" ?
                    "Mayo" : i === "6" ?
                    "Junio" : i === "7" ?
                    "Julio" : i === "8" ?
                    "Agosto" : i === "9" ?
                    "Septiembre" : i === "10" ?
                    "Octubre" : i === "11" ?
                    "Noviembre" : "Diciembre") + " de " + prop;
            }
        }
    }
    var highEarningMonthLabel = document.createElement("label");
    var highEarningMonthTxt = document.createTextNode(highMonth);
    var highEarningMonthTxtValue = document.createTextNode("$ " + maxVal);
    highEarningMonthLabel.appendChild(highEarningMonthTxt);
    highEarningMonth.appendChild(highEarningMonthLabel);
    highEarningMonthValue.appendChild(highEarningMonthTxtValue);
    highEarningMonthValue.classList.add("text-success");
};
var calcHighExpenseMonth = function () {
    var maxVal = 0;
    var highMonth = "";
    for (var prop in objectYear) {
        for (var i in objectYear[prop]) {
            if (objectYear[prop][i].Gastos > maxVal) {
                maxVal = objectYear[prop][i].Gastos;
                highMonth = (i === "1" ?
                    "Enero" : i === "2" ?
                    "Febrero" : i === "3" ?
                    "Marzo" : i === "4" ?
                    "Abril" : i === "5" ?
                    "Mayo" : i === "6" ?
                    "Junio" : i === "7" ?
                    "Julio" : i === "8" ?
                    "Agosto" : i === "9" ?
                    "Septiembre" : i === "10" ?
                    "Octubre" : i === "11" ?
                    "Noviembre" : "Diciembre") + " de " + prop;
            }
        }
    }
    var highExpenseMonthLabel = document.createElement("label");
    var highExpenseMonthTxt = document.createTextNode(highMonth);
    var highExpenseMonthTxtValue = document.createTextNode("$ " + maxVal);
    highExpenseMonthLabel.appendChild(highExpenseMonthTxt);
    highExpenseMonth.appendChild(highExpenseMonthLabel);
    highExpenseMonthValue.appendChild(highExpenseMonthTxtValue);
    highExpenseMonthValue.classList.add("text-danger");
};
var calculateBalance = function (ganancia, gasto) {
    var gananciaValue = ganancia === undefined ? 0 : ganancia;
    var gastoValue = gasto === undefined ? 0 : gasto;
    var balance = gananciaValue - gastoValue;
    return balance;
};
var getTotalCategories = function () {
    for (var prop in objectCategories) {
        var div = document.createElement("div");
        var divCategory = document.createElement("div");
        var divEarning = document.createElement("div");
        var divExpense = document.createElement("div");
        var divBalance = document.createElement("div");
        var categoryTxt = document.createTextNode(prop);
        var earningTxt = document.createTextNode("$ " + (objectCategories[prop].Ganancias === undefined ? 0 : objectCategories[prop].Ganancias));
        var expenseTxt = document.createTextNode("$ " + (objectCategories[prop].Gastos === undefined ? 0 : objectCategories[prop].Gastos));
        var valueBalance = calculateBalance(objectCategories[prop].Ganancias, objectCategories[prop].Gastos);
        var balanceTxt = document.createTextNode("$ " + (valueBalance < 0 ? Math.abs(valueBalance) : valueBalance));
        //Styles
        div.setAttribute("class", "row mt-3");
        divCategory.setAttribute("class", "col-6");
        divEarning.setAttribute("class", "col-2 col d-flex justify-content-center text-success");
        divExpense.setAttribute("class", "col-2 col d-flex justify-content-center text-danger");
        divBalance.setAttribute("class", "" + (valueBalance < 0 ? "col-2 col d-flex justify-content-center text-danger" : "col-2 col d-flex justify-content-center text-success"));
        divCategory.appendChild(categoryTxt);
        divEarning.appendChild(earningTxt);
        divExpense.appendChild(expenseTxt);
        divBalance.appendChild(balanceTxt);
        div.appendChild(divCategory);
        div.appendChild(divEarning);
        div.appendChild(divExpense);
        div.appendChild(divBalance);
        listCategories.appendChild(div);
    }
};
var getTotalMonths = function () {
    for (var prop in objectYear) {
        for (var i in objectYear[prop]) {
            var div = document.createElement("div");
            var divMonth = document.createElement("div");
            var divEarning = document.createElement("div");
            var divExpense = document.createElement("div");
            var divBalance = document.createElement("div");
            var monthTxt = document.createTextNode((i === "1" ?
                "Enero" : i === "2" ?
                "Febrero" : i === "3" ?
                "Marzo" : i === "4" ?
                "Abril" : i === "5" ?
                "Mayo" : i === "6" ?
                "Junio" : i === "7" ?
                "Julio" : i === "8" ?
                "Agosto" : i === "9" ?
                "Septiembre" : i === "10" ?
                "Octubre" : i === "11" ?
                "Noviembre" : "Diciembre") + " de " + prop);
            var earningTxt = document.createTextNode("$ " + (objectYear[prop][i].Ganancias === undefined ? 0 : objectYear[prop][i].Ganancias));
            var expenseTxt = document.createTextNode("$ " + (objectYear[prop][i].Gastos === undefined ? 0 : objectYear[prop][i].Gastos));
            var valueBalance = calculateBalance(objectYear[prop][i].Ganancias, objectYear[prop][i].Gastos);
            var balanceTxt = document.createTextNode("$ " + (valueBalance < 0 ? Math.abs(valueBalance) : valueBalance));
            //Styles
            div.setAttribute("class", "row mt-3");
            divMonth.setAttribute("class", "col-6");
            divEarning.setAttribute("class", "col-2 col d-flex justify-content-center text-success");
            divExpense.setAttribute("class", "col-2 col d-flex justify-content-center text-danger");
            divBalance.setAttribute("class", "" + (valueBalance < 0 ? "col-2 col d-flex justify-content-center text-danger" : "col-2 col d-flex justify-content-center text-success"));
            divMonth.appendChild(monthTxt);
            divEarning.appendChild(earningTxt);
            divExpense.appendChild(expenseTxt);
            divBalance.appendChild(balanceTxt);
            div.appendChild(divMonth);
            div.appendChild(divEarning);
            div.appendChild(divExpense);
            div.appendChild(divBalance);
            monthsTotal.appendChild(div);
        }
    }
};
var resumeGeneral = function () {
    if (operations.length > 1) {
        reportesEmpty.style.display = "none";
        infoReportes.style.display = "block";
        createObjectCategories();
        createObjectDates();
        calcHighEarning(operationsEaring);
        calcHighExpense(operationsExpense);
        calcHighBalance();
        calcHighEarningMonth();
        calcHighExpenseMonth();
        getTotalCategories();
        getTotalMonths();
    }
    else {
        reportesEmpty.style.display = "flex";
        infoReportes.style.display = "none";
    }
};
resumeGeneral();
