
//Operations
const listOperations = document.getElementById("list-operations")
const earning = document.getElementById("earning")
const expense = document.getElementById("expense")
const totalBalance = document.getElementById("totalBalance")

let data = getStorage()
const { operations } = data
const objectCat = {}

const objectBalance = async (operations) => {
    objectCat = {}
    operations.map((operacion) => {
        if (!objectCat[operacion.category]) {
            objectCat[operacion.category] = {};
        }

        if (!objectCat[operacion.category][operacion.type]) {
            objectCat[operacion.category][operacion.type] = 0;
        }
        objectCat[operacion.category][operacion.type] += Number(operacion.amount);
    });
    return objectCat
}


//Edit operations


const editOperation = (id) => {
    const data = getStorage()
    const operationsUp = data.operations.filter((operation) => operation.id !== id)
    localStorage.setItem("data", JSON.stringify({ ...data, operations: operationsUp }))
    init()
}

const getListOperations = (data: LocalStorage) => {
    console.log(data);
    listOperations.innerHTML = '';
    if (data.operations.length > 0) {
        console.log(data);
        for (const operation of data.operations) {
            const div = document.createElement('div')
            const description = document.createElement('h6')
            const category = document.createElement('div')
            const date = document.createElement('div')
            const amount = document.createElement('div')
            const actions = document.createElement('div')
            const edit = document.createElement('a')
            const remove = document.createElement('a')
            const descriptionTxt = document.createTextNode(`${operation.description}`)
            const categoryTxt = document.createTextNode(`${operation.category}`)
            const dateTxt = document.createTextNode(`${operation.date}`)
            const amountTxt = document.createTextNode(` ${operation.type === "Ganancias" ? "+" : "-"}$ ${operation.amount}`)
            const editTxt = document.createTextNode("Editar")
            const removeTxt = document.createTextNode("Eliminar")
            div.setAttribute("class", "row mb-3")
            description.setAttribute("class", "col")
            category.setAttribute("class", "col-3")
            date.setAttribute("class", "col d-flex justify-content-center")
            amount.setAttribute("class", `col d-flex justify-content-center ${operation.type === "Ganancias" ? "text-success" : "text-danger"}`)
            actions.setAttribute("class", "col-3 d-flex justify-content-center align-items-center")
            edit.setAttribute("class", "btn btn-outline-primary btn-sm")
            remove.setAttribute("class", "btn btn-outline-secondary btn-sm")
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


    } else {
        console.log("gola");
        const div = document.createElement('div')
        const text = document.createElement('h5')
        const img = document.createElement('img')
        const textValue = document.createTextNode(`Agrega operaciones o cambia los filtros`)
        text.appendChild(textValue)
        img.setAttribute("src", "./assets/img/operationsEmpty.svg")
        img.setAttribute("class", "m-4")
        img.style.width = "25em"
        div.appendChild(img)
        div.appendChild(text)
        div.setAttribute("class", "d-flex flex-column align-items-center text-center")
        listOperations.appendChild(div)
    }
    objectBalance(data.operations)
    getBalance()

}

const getBalance = () => {
    earning.innerHTML = ""
    expense.innerHTML = ""
    totalBalance.innerHTML = ""
    let sumEarning = 0
    let sumExpense = 0
    for (const prop in objectCat) {
        sumEarning += (isNaN(objectCat[prop].Ganancias) ? 0 : objectCat[prop].Ganancias)
        sumExpense += (isNaN(objectCat[prop].Gastos) ? 0 : objectCat[prop].Gastos)
    }
    let balance = sumEarning - sumExpense
    const earningTxt = document.createTextNode(`+$ ${sumEarning}`)
    const expenseTxt = document.createTextNode(`-$ ${sumExpense}`)
    const balanceTxt = document.createTextNode(`${balance === 0 ? "" : balance < 0 ? "-" : "+"}$ ${balance}`)
    earning.setAttribute("class", "text-success")
    expense.setAttribute("class", "text-danger")
    totalBalance.setAttribute("class", `${balance === 0 ? ".text-dark" : balance < 0 ? "text-danger" : "text-success"}`)
    earning.appendChild(earningTxt)
    expense.appendChild(expenseTxt)
    totalBalance.appendChild(balanceTxt)

}


const init = () => {
    let storage = getStorage()
    getListOperations(storage)
}


init()