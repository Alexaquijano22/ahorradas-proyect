var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var operationType = document.getElementById("operationType");
var operationCategory = document.getElementById("operationCategory");
var operationDate = document.getElementById("operationDate");
var operationOrder = document.getElementById("operationOrder");
var newCategory = document.getElementById("newCategory");
var bringCategories = function () {
    var data = getStorage();
    var categories = data.categories;
    for (var _i = 0, categories_1 = categories; _i < categories_1.length; _i++) {
        var category = categories_1[_i];
        var option = document.createElement('option');
        var optionTxt = document.createTextNode("" + category.name);
        option.appendChild(optionTxt);
        operationCategory.appendChild(option);
    }
};
operationType.addEventListener("change", function (e) {
    var data = getStorage();
    var operations = data.operations;
    var operationsUpdate = operations.filter(function (operation) {
        if (e.target.value !== "Todos") {
            return operation.type === e.target.value;
        }
        else {
            return operation;
        }
    });
    getListOperations(__assign(__assign({}, data), { operations: operationsUpdate }));
});
operationCategory.addEventListener("change", function (e) {
    var data = getStorage();
    var operations = data.operations;
    var operationsUpdate = operations.filter(function (operation) {
        if (e.target.value !== "Todas") {
            return operation.category === e.target.value;
        }
        else {
            return operation;
        }
    });
    getListOperations(__assign(__assign({}, data), { operations: operationsUpdate }));
});
operationDate.addEventListener("change", function (e) {
    var data = getStorage();
    var operations = data.operations;
    var today = '';
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) {
        today = year + "-0" + month + "-" + day;
    }
    else {
        today = year + "-" + month + "-" + day;
    }
    var operationsUpdate = operations.filter(function (operation) {
        if (operation.date >= e.target.value && operation.date <= today) {
            return operation.date >= e.target.value && operation.date <= today;
        }
    });
    getListOperations(__assign(__assign({}, data), { operations: operationsUpdate }));
});
operationOrder.addEventListener("change", function (e) {
    var data = getStorage();
    var operations = data.operations;
    var operationsUpdate;
    if (e.target.value == "Menos reciente") {
        operationsUpdate = operations.sort(function (a, b) { return new Date(a.date).getTime() - new Date(b.date).getTime(); });
    }
    else if (e.target.value == "Mayor monto") {
        operationsUpdate = operations.sort(function (a, b) { return b.amount - a.amount; });
    }
    else if (e.target.value == "Menor monto") {
        operationsUpdate = operations.sort(function (a, b) { return a.amount - b.amount; });
    }
    else if (e.target.value == "A/Z") {
        operationsUpdate = operations.sort(function (a, b) {
            if (a.description < b.description)
                return -1;
            if (a.description > b.description)
                return 1;
            return 0;
        });
    }
    else if (e.target.value == "Z/A") {
        operationsUpdate = operations.sort(function (a, b) {
            if (a.description < b.description)
                return 1;
            if (a.description > b.description)
                return -1;
            return 0;
        });
    }
    else {
        operationsUpdate = operations.sort(function (a, b) { return new Date(b.date).getTime() - new Date(a.date).getTime(); });
    }
    getListOperations(__assign(__assign({}, data), { operations: operationsUpdate }));
});
bringCategories();
