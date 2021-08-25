const listCategories = document.getElementById("list-categories");
const formNewCategory = document.getElementById("formCategory");
const nameCategory = document.getElementById("nameCategory");

const removeCategory = (id: string) => {
    let data = getStorage()
    const categoriesUp = data.categories.filter((category) => category.id !== id)
    localStorage.setItem("data",  JSON.stringify({ ...data, categories: categoriesUp}))
    getListCategories()
}

const getListCategories = () => {
    listCategories.innerHTML = ''
    let data = getStorage()
    for(const category of data.categories){
        const div = document.createElement('div')
        const categoryDiv = document.createElement('div')
        const accions = document.createElement('div')
        const categoryTxt = document.createTextNode(`${category.name}`)
        const edit = document.createElement('a')
        const remove = document.createElement('a')
        const editTxt = document.createTextNode("Editar")
        const removeTxt = document.createTextNode("Eliminar")
        categoryDiv.appendChild(categoryTxt)
        edit.appendChild(editTxt)
        remove.appendChild(removeTxt)
        accions.appendChild(edit)
        accions.appendChild(remove)
        div.appendChild(categoryDiv)
        div.appendChild(accions)
        //estilos
        div.setAttribute("class", "d-flex justify-content-between mt-3")
        edit.setAttribute("class", "me-4")
        listCategories.appendChild(div)
        edit.setAttribute("class", "btn btn-outline-primary btn-sm me-2")
        remove.setAttribute("class", "btn btn-outline-secondary btn-sm")
        edit.setAttribute("href", `./edit-category.html?category=${category.name}`)

        remove.addEventListener("click", () => {
            removeCategory(category.id)
        })
    }
}

//Falta corroborar si el nombre que se agrega ya estaba agregado
formNewCategory.addEventListener("submit", (e) => {
    e.preventDefault()
    let data = getStorage()
    data.categories.push({
        name: nameCategory.value,
        slug: slugify(nameCategory.value),
        id: generateId(),
    })
    localStorage.setItem("data", JSON.stringify(data))
    getListCategories()
    formNewCategory.reset()
})

getListCategories()