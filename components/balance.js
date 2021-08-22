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
//Operations
var listOperations = document.getElementById("list-operations");
//Edit operations
var editOperation = function (id) {
    var data = getStorage();
    var operationsUp = data.operations.filter(function (operation) { return operation.id !== id; });
    localStorage.setItem("data", JSON.stringify(__assign(__assign({}, data), { operations: operationsUp })));
    init();
};
var getListOperations = function (data) {
    listOperations.innerHTML = '';
    var _loop_1 = function (operation) {
        var div = document.createElement('div');
        var description = document.createElement('div');
        var category = document.createElement('div');
        var date = document.createElement('div');
        var amount = document.createElement('div');
        var actions = document.createElement('div');
        var edit = document.createElement('a');
        var remove = document.createElement('a');
        var descriptionTxt = document.createTextNode("" + operation.description);
        var categoryTxt = document.createTextNode("" + operation.category);
        var dateTxt = document.createTextNode("" + operation.date);
        var amountTxt = document.createTextNode("" + operation.amount);
        var editTxt = document.createTextNode("Editar");
        var removeTxt = document.createTextNode("Eliminar");
        div.setAttribute("class", "row mb-3");
        description.setAttribute("class", "col");
        category.setAttribute("class", "col-3");
        date.setAttribute("class", "col d-flex justify-content-center");
        amount.setAttribute("class", "col d-flex justify-content-center");
        actions.setAttribute("class", "col-3 d-flex justify-content-center");
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
};
var init = function () {
    var storage = getStorage();
    getListOperations(storage);
};
init();
