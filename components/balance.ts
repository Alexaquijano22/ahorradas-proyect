
//Operations
const listOperations = document.getElementById("list-operations")

//Edit operations

const editOperation = (id) => {
    const data = getStorage()
    const operationsUp = data.operations.filter((operation) => operation.id !== id)
    localStorage.setItem("data",  JSON.stringify({ ...data, operations: operationsUp}))
    init()
}

const getListOperations = (data: LocalStorage) => {
    listOperations.innerHTML = '';
    for(const operation of data.operations){
        const div = document.createElement('div')
        const description = document.createElement('div')
        const category = document.createElement('div')
        const date = document.createElement('div')
        const amount = document.createElement('div')
        const actions = document.createElement('div')
        const edit = document.createElement('a')
        const remove = document.createElement('a')
        const descriptionTxt = document.createTextNode(`${operation.description}`)
        const categoryTxt = document.createTextNode(`${operation.category}`)
        const dateTxt = document.createTextNode(`${operation.date}`)
        const amountTxt = document.createTextNode(`${operation.amount}`)
        const editTxt = document.createTextNode("Editar")
        const removeTxt = document.createTextNode("Eliminar")
        div.setAttribute("class", "row mb-3")
        description.setAttribute("class", "col")
        category.setAttribute("class", "col-3")
        date.setAttribute("class", "col d-flex justify-content-center")
        amount.setAttribute("class", "col d-flex justify-content-center")
        actions.setAttribute("class", "col-3 d-flex justify-content-center")
        actions.appendChild(edit)
        actions.appendChild(remove)
        edit.classList.add("me-2")
        description.appendChild(descriptionTxt)
        category.appendChild(categoryTxt)
        date.appendChild(dateTxt)
        amount.appendChild(amountTxt)
        edit.appendChild(editTxt)
        remove.appendChild(removeTxt)
        div.appendChild(description)
        div.appendChild(category)
        div.appendChild(date)
        div.appendChild(amount)
        div.appendChild(actions)
        listOperations.appendChild(div)

        edit.setAttribute("href", `./edit-operation.html?description=${operation.description}&amount=${operation.amount}&type=${operation.type}&category=${operation.category}&date=${operation.date}`)

        remove.addEventListener('click', () => {
            editOperation(operation.id)
        })
    }
}


const init = () => {
    let storage = getStorage()
    getListOperations(storage)
}


init()