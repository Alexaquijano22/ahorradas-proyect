const params = new URLSearchParams(window.location.search)
const description = params.get("description")
const amount = params.get("amount")
const type = params.get("type")
const category = params.get("category")
const date = params.get("date")

const editDescription = document.getElementById("editDescription")
const editAmout = document.getElementById("editAmout")
const editType = document.getElementById("editType")
const editCategory = document.getElementById("editCategory")
const editDate = document.getElementById("editDate")
const formEditOperation = document.getElementById("formEditOperation")

editDescription.value = description
editAmout.value = amount
editType.value = type
editCategory.value = category
editDate.value = date

formEditOperation.addEventListener("submit", (e) => {
    e.preventDefault()
    let data = getStorage()
    let { operations } = data
    const newDescription = editDescription.value
    const newAmount = editAmout.value
    const newType = editType.value
    const newCategory = editCategory.value
    const newDate = editDate.value
    for(let operation of operations){
        if(operation.description === description){
            operation.description = newDescription
            operation.amount = newAmount
            operation.type = newType
            operation.category = newCategory
            operation.date = newDate
        }
    }
    localStorage.setItem("data",  JSON.stringify(data));

})

