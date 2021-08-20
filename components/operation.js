//New operation
var formNewOperation = document.getElementById("formNewOperation");
var newDescription = document.getElementById("newDescription");
var newAmout = document.getElementById("newAmout");
var newType = document.getElementById("newType");
var newCategory = document.getElementById("newCategory");
var newDate = document.getElementById("newDate");
//Operations
var listOperations = document.getElementById("list-operations");
formNewOperation.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log(e);
    var data = getStorage();
    newOperation.category = newCategory.value;
    newOperation.description = newDescription.value;
    newOperation.date = newDate.value;
    newOperation.id = generateId();
    newOperation.amount = newAmout.value;
    newOperation.type = newType.value;
    data.operations.push(newOperation);
    localStorage.setItem("data", JSON.stringify(data));
});
var getListOperations = function (data) {
    for (var i = 0; i < data.operations.length; i++) {
        console.log(i);
    }
};
getListOperations();
