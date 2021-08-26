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
var listFiltered = [];
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
var updateOperations = function () {
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
    if (operationType.value !== "" ||
        operationCategory.value !== "" ||
        operationDate.value !== "" ||
        operationOrder.value !== "") {
        if (operationType.value !== "Todos") {
            console.log("Entro a buscar por tipo");
            operations = operations.filter(function (operation) {
                if (operationType.value !== "Todos") {
                    return operation.type === operationType.value;
                }
                else {
                    return operation;
                }
            });
        }
        if (operationCategory.value !== "Todas") {
            console.log("Entro a buscar por categoria");
            operations = operations.filter(function (operation) {
                if (operationCategory.value !== "Todos") {
                    return operation.category === operationCategory.value;
                }
                else {
                    return operation;
                }
            });
            console.log(operations);
        }
        if (operationDate.value !== "") {
            console.log("Entro a buscar por DIA");
            console.log("Hola, soy fecha");
            operations = operations.filter(function (operation) {
                if (operation.date >= operationDate.value && operation.date <= today) {
                    return operation.date >= operationDate.value && operation.date <= today;
                }
            });
        }
        if (operationOrder.value !== "") {
            console.log("Entro a buscar por ORDEN");
            if (operationOrder.value == "Menos reciente") {
                operations.sort(function (a, b) { return new Date(a.date).getTime() - new Date(b.date).getTime(); });
            }
            else if (operationOrder.value == "Mayor monto") {
                operations.sort(function (a, b) { return b.amount - a.amount; });
            }
            else if (operationOrder.value == "Menor monto") {
                operations.sort(function (a, b) { return a.amount - b.amount; });
            }
            else if (operationOrder.value == "A/Z") {
                operations.sort(function (a, b) {
                    if (a.description < b.description)
                        return -1;
                    if (a.description > b.description)
                        return 1;
                    return 0;
                });
            }
            else if (operationOrder.value == "Z/A") {
                operations.sort(function (a, b) {
                    if (a.description < b.description)
                        return 1;
                    if (a.description > b.description)
                        return -1;
                    return 0;
                });
            }
            else {
                operations.sort(function (a, b) { return new Date(b.date).getTime() - new Date(a.date).getTime(); });
            }
        }
    }
    getListOperations(__assign(__assign({}, data), { operations: operations }));
};
operationType.addEventListener("change", function (e) {
    updateOperations();
});
operationCategory.addEventListener("change", function (e) {
    updateOperations();
});
operationDate.addEventListener("change", function (e) {
    updateOperations();
});
operationOrder.addEventListener("change", function (e) {
    updateOperations();
});
bringCategories();
