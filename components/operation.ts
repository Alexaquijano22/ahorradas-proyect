//New operation
const formNewOperation = document.getElementById("formNewOperation");
const newDescription = document.getElementById("newDescription");
const newAmout = document.getElementById("newAmout");
const newType = document.getElementById("newType");
const newCategory = document.getElementById("newCategory");
const newDate = document.getElementById("newDate");

const bringCategories = () => {
    let data = getStorage()
    let { categories } = data
    for(let category of categories){
        const option = document.createElement('option')
        const optionTxt = document.createTextNode(`${category.name}`)
        option.appendChild(optionTxt)
        newCategory.appendChild(option)
    }
}

formNewOperation.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e);
    let data = getStorage();
    data.operations.push({
        category: newCategory.value,
        description: newDescription.value,
        date: newDate.value,
        id: generateId(),
        amount: newAmout.value,
        type: newType.value,
    });
    localStorage.setItem("data",  JSON.stringify(data));

    window.location.href = "./index.html"
})

bringCategories()

