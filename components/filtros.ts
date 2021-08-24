const operationType = document.getElementById("operationType")
const operationCategory = document.getElementById("operationCategory")
const operationDate = document.getElementById("operationDate")
const operationOrder = document.getElementById("operationOrder")
const newCategory = document.getElementById("newCategory")

const bringCategories = () => {
    let data = getStorage()
    let { categories } = data
    for (let category of categories) {
        const option = document.createElement('option')
        const optionTxt = document.createTextNode(`${category.name}`)
        option.appendChild(optionTxt)
        operationCategory.appendChild(option)
    }
}

operationType.addEventListener("change", (e) => {
    let data = getStorage()
    let { operations } = data
    let operationsUpdate = operations.filter((operation) => {
        if (e.target.value !== "Todos") {
            return operation.type === e.target.value
        } else {
            return operation
        }
    })
    getListOperations({ ...data, operations: operationsUpdate })
})

operationCategory.addEventListener("change", (e) => {
    let data = getStorage()
    let { operations } = data
    let operationsUpdate = operations.filter((operation) => {
        if (e.target.value !== "Todas") {
            return operation.category === e.target.value
        } else {
            return operation
        }
    })
    getListOperations({ ...data, operations: operationsUpdate })
})

operationDate.addEventListener("change", (e) => {
    let data = getStorage()
    let { operations } = data
    let today = '';
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    if (month < 10) {
        today = `${year}-0${month}-${day}`
    } else {
        today = `${year}-${month}-${day}`
    }
    let operationsUpdate = operations.filter((operation) => {
        if(operation.date >= e.target.value  && operation.date <= today){
            return operation.date >= e.target.value  && operation.date <= today
        }
        
    })
    getListOperations({ ...data, operations: operationsUpdate })
})

operationOrder.addEventListener("change", (e) => {
    let data = getStorage()
    let { operations } = data
    let operationsUpdate;
    if (e.target.value == "Menos reciente") {
        operationsUpdate = operations.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }else if(e.target.value == "Mayor monto"){
        operationsUpdate = operations.sort((a, b) => b.amount - a.amount);
    }else if(e.target.value == "Menor monto"){
        operationsUpdate = operations.sort((a, b) => a.amount - b.amount);
    }else if(e.target.value == "A/Z"){
        operationsUpdate = operations.sort((a, b) => {
            if(a.description < b.description) return -1;
            if(a.description > b.description) return 1;

            return 0;
        });
    }else if(e.target.value == "Z/A"){
        operationsUpdate = operations.sort((a, b) => {
           
            if(a.description < b.description) return 1;
            if(a.description > b.description) return -1;
        
            return 0;
        });
    }else{
        operationsUpdate = operations.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    getListOperations({ ...data, operations: operationsUpdate })
})

bringCategories()
