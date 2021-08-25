var params = new URLSearchParams(window.location.search);
var description = params.get("description");
var amount = params.get("amount");
var type = params.get("type");
var category = params.get("category");
var date = params.get("date");
var editDescription = document.getElementById("editDescription");
var editAmout = document.getElementById("editAmout");
var editType = document.getElementById("editType");
var editCategory = document.getElementById("editCategory");
var editDate = document.getElementById("editDate");
var formEditOperation = document.getElementById("formEditOperation");
editDescription.value = description;
editAmout.value = amount;
editType.value = type;
editCategory.value = category;
editDate.value = date;
var bringCategory = function () {
    var data = getStorage();
    var categories = data.categories;
    for (var _i = 0, categories_1 = categories; _i < categories_1.length; _i++) {
        var category_1 = categories_1[_i];
        var option = document.createElement('option');
        var optionTxt = document.createTextNode("" + category_1.name);
        option.appendChild(optionTxt);
        editCategory.appendChild(option);
    }
};
formEditOperation.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = getStorage();
    var operations = data.operations;
    var newDescription = editDescription.value;
    var newAmount = editAmout.value;
    var newType = editType.value;
    var newCategory = editCategory.value;
    var newDate = editDate.value;
    for (var _i = 0, operations_1 = operations; _i < operations_1.length; _i++) {
        var operation = operations_1[_i];
        if (operation.description === description) {
            operation.description = newDescription;
            operation.amount = newAmount;
            operation.type = newType;
            operation.category = newCategory;
            operation.date = newDate;
        }
    }
    localStorage.setItem("data", JSON.stringify(data));
});
bringCategory();
