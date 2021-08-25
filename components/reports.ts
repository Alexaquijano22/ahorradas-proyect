const highEarning = document.getElementById("highEarning")
const highEarningValue = document.getElementById("highEarningValue")
const highExpense = document.getElementById("highExpense")
const highExpenseValue = document.getElementById("highExpenseValue")
const highBalance = document.getElementById("highBalance")
const highBalanceValue = document.getElementById("highBalanceValue")
const highEarningMonth = document.getElementById("highEarningMonth")
const highEarningMonthValue = document.getElementById("highEarningMonthValue")
const highExpenseMonth = document.getElementById("highExpenseMonth")
const highExpenseMonthValue = document.getElementById("highExpenseMonthValue")

const listCategories = document.getElementById("list-categories")
const monthsTotal = document.getElementById("months-total")

let data = getStorage()
    //Variables
const { operations } = data
const { categories } = data
const objectCategories = {};
const objectYear = {};
const operationsEaring = operations.filter((category) => category.type === "Ganancias")
const operationsExpense = operations.filter((category) => category.type === "Gastos")

const createObjectCategories = () => {
    operations.map((operacion) => {
		if (!objectCategories[operacion.category]) {
			objectCategories[operacion.category] = {};
		}

		if (!objectCategories[operacion.category][operacion.type]) {
			objectCategories[operacion.category][operacion.type] = 0;
		}
		objectCategories[operacion.category][operacion.type] += Number(operacion.amount);
	});	
    return objectCategories
}

const createObjectDates = () => {
    operations.map((operacion) => {
        let specificDate = '';
        const date = new Date(operacion.date)
        let day = date.getDate() + 1
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        if (month < 10) {
            specificDate = `${day}-0${month}-${year}`
        } else {
            specificDate = `${day}-${month}-${year}`
        }
        if (!objectYear[year]) {
            objectYear[year] = {};
        }
        if (!objectYear[year][month]) {
            objectYear[year][month] = {};
        }
        if (!objectYear[year][month][operacion.type]) {
            objectYear[year][month][operacion.type] = 0;
        }
    
        objectYear[year][month][operacion.type] += Number(operacion.amount);
    
        return objectYear
    })
}

const calcHighEarning = (operations: Operations[]) => {
    const operationsOrder = operations.sort((a, b) => b.amount - a.amount);
    const highEarningLabel = document.createElement("label");
    const highEarningTxt = document.createTextNode(operationsOrder[0].category)
    const highEarningTxtValue = document.createTextNode(`${operationsOrder[0].amount}`)
    highEarningLabel.appendChild(highEarningTxt)
    highEarning.appendChild(highEarningLabel)
    highEarningValue.appendChild(highEarningTxtValue)
}

const calcHighExpense = (operations: Operations[]) => {
    const operationsOrder = operations.sort((a, b) => b.amount - a.amount);
    const highExpenseLabel = document.createElement("label");
    const highExpenseTxt = document.createTextNode(operationsOrder[0].category)
    const highExpenseTxtValue = document.createTextNode(`${operationsOrder[0].amount}`)
    highExpenseLabel.appendChild(highExpenseTxt)
    highExpense.appendChild(highExpenseLabel)
    highExpenseValue.appendChild(highExpenseTxtValue)
}

const calcHighBalance = () => {
    let maxBalance = 0;
	let categoryName = "";
    for (const prop in objectCategories) {
		let balance = objectCategories[prop].Ganancias - objectCategories[prop].Gastos
		if (balance > maxBalance) {
			maxBalance = balance;
			categoryName = prop
		}
	}
    const highBalanceLabel = document.createElement("label");
    const highBalanceTxt = document.createTextNode(categoryName)
    const highBalanceTxtValue = document.createTextNode(`${maxBalance}`)
    highBalanceLabel.appendChild(highBalanceTxt)
    highBalance.appendChild(highBalanceLabel)
    highBalanceValue.appendChild(highBalanceTxtValue)
}

const calcHighEarningMonth = () => {
    let maxVal = 0;
    let highMonth = ""
    for(const prop in objectYear){
        for(const i in objectYear[prop]){
            if(objectYear[prop][i].Ganancias > maxVal){
                maxVal = objectYear[prop][i].Ganancias
                highMonth = `${i === "1" ? 
                "Enero" : i === "2" ? 
                "Febrero" : i === "3" ? 
                "Marzo": i === "4" ?
                "Abril": i === "5" ? 
                "Mayo" : i === "6" ? 
                "Junio": i === "7" ? 
                "Julio": i === "8" ? 
                "Agosto": i === "9" ? 
                "Septiembre": i === "10" ? 
                "Octubre": i === "11" ? 
                "Noviembre" : "Diciembre"} de ${prop}` 
            }
        }
    }
    const highEarningMonthLabel = document.createElement("label");
    const highEarningMonthTxt = document.createTextNode(highMonth)
    const highEarningMonthTxtValue = document.createTextNode(`${maxVal}`)
    highEarningMonthLabel.appendChild(highEarningMonthTxt)
    highEarningMonth.appendChild(highEarningMonthLabel)
    highEarningMonthValue.appendChild(highEarningMonthTxtValue)
}

const calcHighExpenseMonth = () => {
    let maxVal = 0;
    let highMonth = ""
    for(const prop in objectYear){
        for(const i in objectYear[prop]){
            if(objectYear[prop][i].Gastos > maxVal){
                maxVal = objectYear[prop][i].Gastos
                highMonth = `${i === "1" ? 
                "Enero" : i === "2" ? 
                "Febrero" : i === "3" ? 
                "Marzo": i === "4" ?
                "Abril": i === "5" ? 
                "Mayo" : i === "6" ? 
                "Junio": i === "7" ? 
                "Julio": i === "8" ? 
                "Agosto": i === "9" ? 
                "Septiembre": i === "10" ? 
                "Octubre": i === "11" ? 
                "Noviembre" : "Diciembre"} de ${prop}` 
            }
        }
    }
    const highExpenseMonthLabel = document.createElement("label");
    const highExpenseMonthTxt = document.createTextNode(highMonth)
    const highExpenseMonthTxtValue = document.createTextNode(`${maxVal}`)
    highExpenseMonthLabel.appendChild(highExpenseMonthTxt)
    highExpenseMonth.appendChild(highExpenseMonthLabel)
    highExpenseMonthValue.appendChild(highExpenseMonthTxtValue)
}


const calculateBalance = (ganancia: number, gasto: number) => {
    let gananciaValue = ganancia === undefined ? 0 : ganancia
    let gastoValue = gasto === undefined ? 0 : gasto
    let balance = gananciaValue - gastoValue
    return balance
}


const getTotalCategories = () => {

for(const prop in objectCategories){
      const div = document.createElement("div")

      const divCategory = document.createElement("div")
      const divEarning = document.createElement("div")
      const divExpense = document.createElement("div")
      const divBalance = document.createElement("div")

      const categoryTxt = document.createTextNode(prop)
      const earningTxt = document.createTextNode(`$ ${objectCategories[prop].Ganancias === undefined ? 0 : objectCategories[prop].Ganancias}`)
      const expenseTxt = document.createTextNode(`$ ${objectCategories[prop].Gastos === undefined ? 0 : objectCategories[prop].Gastos}`)
      const balanceTxt = document.createTextNode(`$ ${calculateBalance(objectCategories[prop].Ganancias, objectCategories[prop].Gastos)}`)

      //Styles
      div.setAttribute("class", "row mt-3")
      divCategory.setAttribute("class", "col-6")
      divEarning.setAttribute("class", "col-2 col d-flex justify-content-center")
      divExpense.setAttribute("class", "col-2 col d-flex justify-content-center")
      divBalance.setAttribute("class", "col-2 col d-flex justify-content-center")

      divCategory.appendChild(categoryTxt)
      divEarning.appendChild(earningTxt)
      divExpense.appendChild(expenseTxt)
      divBalance.appendChild(balanceTxt)
      div.appendChild(divCategory)
      div.appendChild(divEarning)
      div.appendChild(divExpense)
      div.appendChild(divBalance)
      listCategories.appendChild(div)
  }
}

const getTotalMonths = () => {
    for(const prop in objectYear){
        for(const i in objectYear[prop]){
            const div = document.createElement("div")
    
            const divMonth = document.createElement("div")
            const divEarning = document.createElement("div")
            const divExpense = document.createElement("div")
            const divBalance = document.createElement("div")
      
            const monthTxt = document.createTextNode(`${i === "1" ? 
            "Enero" : i === "2" ? 
            "Febrero" : i === "3" ? 
            "Marzo": i === "4" ?
            "Abril": i === "5" ? 
            "Mayo" : i === "6" ? 
            "Junio": i === "7" ? 
            "Julio": i === "8" ? 
            "Agosto": i === "9" ? 
            "Septiembre": i === "10" ? 
            "Octubre": i === "11" ? 
            "Noviembre" : "Diciembre"} de ${prop}`)
            const earningTxt = document.createTextNode(`$ ${objectYear[prop][i].Ganancias === undefined ? 0 : objectYear[prop][i].Ganancias}`)
            const expenseTxt = document.createTextNode(`$ ${objectYear[prop][i].Gastos === undefined ? 0 : objectYear[prop][i].Gastos}`)
            const balanceTxt = document.createTextNode(`$ ${calculateBalance(objectYear[prop][i].Ganancias, objectYear[prop][i].Gastos)}`)
      
            //Styles
            div.setAttribute("class", "row mt-3")
            divMonth.setAttribute("class", "col-6")
            divEarning.setAttribute("class", "col-2 col d-flex justify-content-center")
            divExpense.setAttribute("class", "col-2 col d-flex justify-content-center")
            divBalance.setAttribute("class", "col-2 col d-flex justify-content-center")
      
            divMonth.appendChild(monthTxt)
            divEarning.appendChild(earningTxt)
            divExpense.appendChild(expenseTxt)
            divBalance.appendChild(balanceTxt)
            div.appendChild(divMonth)
            div.appendChild(divEarning)
            div.appendChild(divExpense)
            div.appendChild(divBalance)
            monthsTotal.appendChild(div)
        }
    }
}



const resumeGeneral = () => {
    createObjectCategories();
    createObjectDates();
    calcHighEarning(operationsEaring)
    calcHighExpense(operationsExpense)
    calcHighBalance()
    calcHighEarningMonth()
    calcHighExpenseMonth()
    getTotalCategories()
    getTotalMonths()
}

resumeGeneral()