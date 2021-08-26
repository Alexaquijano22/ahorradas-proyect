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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
//Operations
var listOperations = document.getElementById("list-operations");
var earning = document.getElementById("earning");
var expense = document.getElementById("expense");
var totalBalance = document.getElementById("totalBalance");
var data = getStorage();
var operations = data.operations;
var objectCat = {};
var objectBalance = function (operations) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        objectCat = {};
        operations.map(function (operacion) {
            if (!objectCat[operacion.category]) {
                objectCat[operacion.category] = {};
            }
            if (!objectCat[operacion.category][operacion.type]) {
                objectCat[operacion.category][operacion.type] = 0;
            }
            objectCat[operacion.category][operacion.type] += Number(operacion.amount);
        });
        return [2 /*return*/, objectCat];
    });
}); };
//Edit operations
var editOperation = function (id) {
    var data = getStorage();
    var operationsUp = data.operations.filter(function (operation) { return operation.id !== id; });
    localStorage.setItem("data", JSON.stringify(__assign(__assign({}, data), { operations: operationsUp })));
    init();
};
var getListOperations = function (data) {
    console.log(data);
    listOperations.innerHTML = '';
    if (data.operations.length > 0) {
        console.log(data);
        var _loop_1 = function (operation) {
            var div = document.createElement('div');
            var description = document.createElement('h6');
            var category = document.createElement('div');
            var date = document.createElement('div');
            var amount = document.createElement('div');
            var actions = document.createElement('div');
            var edit = document.createElement('a');
            var remove = document.createElement('a');
            var descriptionTxt = document.createTextNode("" + operation.description);
            var categoryTxt = document.createTextNode("" + operation.category);
            var dateTxt = document.createTextNode("" + operation.date);
            var amountTxt = document.createTextNode(" " + (operation.type === "Ganancias" ? "+" : "-") + "$ " + operation.amount);
            var editTxt = document.createTextNode("Editar");
            var removeTxt = document.createTextNode("Eliminar");
            div.setAttribute("class", "row mb-3");
            description.setAttribute("class", "col");
            category.setAttribute("class", "col-3");
            date.setAttribute("class", "col d-flex justify-content-center");
            amount.setAttribute("class", "col d-flex justify-content-center " + (operation.type === "Ganancias" ? "text-success" : "text-danger"));
            actions.setAttribute("class", "col-3 d-flex justify-content-center align-items-center");
            edit.setAttribute("class", "btn btn-outline-primary btn-sm");
            remove.setAttribute("class", "btn btn-outline-secondary btn-sm");
            actions.appendChild(edit);
            actions.appendChild(remove);
            edit.classList.add("me-2");
            description.appendChild(descriptionTxt);
            category.appendChild(categoryTxt);
            date.appendChild(dateTxt);
            amount.appendChild(amountTxt);
            edit.appendChild(editTxt);
            remove.appendChild(removeTxt);
            div.appendChild(description);
            div.appendChild(category);
            div.appendChild(date);
            div.appendChild(amount);
            div.appendChild(actions);
            listOperations.appendChild(div);
            edit.setAttribute("href", "./edit-operation.html?description=" + operation.description + "&amount=" + operation.amount + "&type=" + operation.type + "&category=" + operation.category + "&date=" + operation.date);
            remove.addEventListener('click', function () {
                editOperation(operation.id);
            });
        };
        for (var _i = 0, _a = data.operations; _i < _a.length; _i++) {
            var operation = _a[_i];
            _loop_1(operation);
        }
    }
    else {
        console.log("gola");
        var div = document.createElement('div');
        var text = document.createElement('h5');
        var img = document.createElement('img');
        var textValue = document.createTextNode("Agrega operaciones o cambia los filtros");
        text.appendChild(textValue);
        img.setAttribute("src", "./assets/img/operationsEmpty.svg");
        img.setAttribute("class", "m-4");
        img.style.width = "25em";
        div.appendChild(img);
        div.appendChild(text);
        div.setAttribute("class", "d-flex flex-column align-items-center text-center");
        listOperations.appendChild(div);
    }
    objectBalance(data.operations);
    getBalance();
};
var getBalance = function () {
    earning.innerHTML = "";
    expense.innerHTML = "";
    totalBalance.innerHTML = "";
    var sumEarning = 0;
    var sumExpense = 0;
    for (var prop in objectCat) {
        sumEarning += (isNaN(objectCat[prop].Ganancias) ? 0 : objectCat[prop].Ganancias);
        sumExpense += (isNaN(objectCat[prop].Gastos) ? 0 : objectCat[prop].Gastos);
    }
    var balance = sumEarning - sumExpense;
    var earningTxt = document.createTextNode("+$ " + sumEarning);
    var expenseTxt = document.createTextNode("-$ " + sumExpense);
    var balanceTxt = document.createTextNode((balance === 0 ? "" : balance < 0 ? "-" : "+") + "$ " + balance);
    earning.setAttribute("class", "text-success");
    expense.setAttribute("class", "text-danger");
    totalBalance.setAttribute("class", "" + (balance === 0 ? ".text-dark" : balance < 0 ? "text-danger" : "text-success"));
    earning.appendChild(earningTxt);
    expense.appendChild(expenseTxt);
    totalBalance.appendChild(balanceTxt);
};
var init = function () {
    var storage = getStorage();
    getListOperations(storage);
};
init();
