const params = new URLSearchParams(window.location.search)
const categoryParam = params.get("category")

const editCategory = document.getElementById("editCategory")
const formEdit = document.getElementById("editFormCategory")

editCategory.value = categoryParam

formEdit.addEventListener("submit", (e) => {
    e.preventDefault()
    let data = getStorage()
    let {categories} = data
    let newCategory = editCategory.value
    for(const category of categories){
        if(category.name === categoryParam){
            category.name = newCategory
            category.slug = slugify(newCategory)
        }
    }
    localStorage.setItem("data", JSON.stringify(data))
})

