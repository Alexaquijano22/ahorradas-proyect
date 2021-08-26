const operationType = document.getElementById("operationType")
const operationCategory = document.getElementById("operationCategory")
const operationDate = document.getElementById("operationDate")
const operationOrder = document.getElementById("operationOrder")

let listFiltered: Operations[] = []

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

const updateOperations = () => {
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
    if (operationType.value !== "" ||
        operationCategory.value !== "" ||
        operationDate.value !== "" ||
        operationOrder.value !== "") {
        if (operationType.value !== "Todos") {
            console.log("Entro a buscar por tipo");
            operations = operations.filter((operation) => {
                if (operationType.value !== "Todos") {
                    return operation.type === operationType.value
                } else {
                    return operation
                }

            })
        }
        if (operationCategory.value !== "Todas") {
            console.log("Entro a buscar por categoria");
            operations = operations.filter((operation) => {
                if (operationCategory.value !== "Todos") {
                    return operation.category === operationCategory.value
                } else {
                    return operation
                }

            })
            console.log(operations);
        }
        if (operationDate.value !== "") {
            console.log("Entro a buscar por DIA");
            console.log("Hola, soy fecha");
            operations = operations.filter((operation) => {
                if (operation.date >= operationDate.value && operation.date <= today) {
                    return operation.date >= operationDate.value && operation.date <= today
                }

            })
        }
        if (operationOrder.value !== "") {
            console.log("Entro a buscar por ORDEN");
            if (operationOrder.value == "Menos reciente") {
                operations.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            } else if (operationOrder.value == "Mayor monto") {
                operations.sort((a, b) => b.amount - a.amount);
            } else if (operationOrder.value == "Menor monto") {
                operations.sort((a, b) => a.amount - b.amount);
            } else if (operationOrder.value == "A/Z") {
                operations.sort((a, b) => {
                    if (a.description < b.description) return -1;
                    if (a.description > b.description) return 1;

                    return 0;
                });
            } else if (operationOrder.value == "Z/A") {
                operations.sort((a, b) => {

                    if (a.description < b.description) return 1;
                    if (a.description > b.description) return -1;

                    return 0;
                });
            } else {
                operations.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            }
        }
    }
    getListOperations({ ...data, operations: operations })
}


operationType.addEventListener("change", (e) => {
    updateOperations()
})

operationCategory.addEventListener("change", (e) => {
    updateOperations()
})

operationDate.addEventListener("change", (e) => {
    updateOperations()
})

operationOrder.addEventListener("change", (e) => {
    updateOperations()
})

bringCategories()


