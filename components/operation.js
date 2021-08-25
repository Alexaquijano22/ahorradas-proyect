//New operation
var formNewOperation = document.getElementById("formNewOperation");
var newDescription = document.getElementById("newDescription");
var newAmout = document.getElementById("newAmout");
var newType = document.getElementById("newType");
var newCategory = document.getElementById("newCategory");
var newDate = document.getElementById("newDate");
var bringCategories = function () {
    var data = getStorage();
    var categories = data.categories;
    for (var _i = 0, categories_1 = categories; _i < categories_1.length; _i++) {
        var category = categories_1[_i];
        var option = document.createElement('option');
        var optionTxt = document.createTextNode("" + category.name);
        option.appendChild(optionTxt);
        newCategory.appendChild(option);
    }
};
formNewOperation.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = getStorage();
    data.operations.push({
        category: newCategory.value,
        description: newDescription.value,
        date: newDate.value,
        id: generateId(),
        amount: newAmout.value,
        type: newType.value
    });
    localStorage.setItem("data", JSON.stringify(data));
    window.location.href = "./index.html";
});
bringCategories();
