//New operation
const formNewOperation = document.getElementById("formNewOperation");
const newDescription = document.getElementById("newDescription");
const newAmout = document.getElementById("newAmout");
const newType = document.getElementById("newType");
const newCategory = document.getElementById("newCategory");
const newDate = document.getElementById("newDate");

//Operations
const listOperations = document.getElementById("list-operations");


formNewOperation.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e);
    let data = getStorage();
    newOperation.category = newCategory.value;
    newOperation.description = newDescription.value;
    newOperation.date = newDate.value;
    newOperation.id = generateId()
    newOperation.amount = newAmout.value;
    newOperation.type = newType.value;

    data.operations.push(newOperation);
    localStorage.setItem("data",  JSON.stringify(data));
})

const getListOperations = (data: LocalStorage) => {
    for(let i = 0; i < data.operations.length; i++){
        console.log(i);
    }
}

getListOperations();