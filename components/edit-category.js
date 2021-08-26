var params = new URLSearchParams(window.location.search);
var categoryParam = params.get("category");
var editCategory = document.getElementById("editCategory");
var formEdit = document.getElementById("editFormCategory");
editCategory.value = categoryParam;
formEdit.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = getStorage();
    var categories = data.categories;
    var newCategory = editCategory.value;
    console.log(categoryParam);
    for (var _i = 0, categories_1 = categories; _i < categories_1.length; _i++) {
        var category = categories_1[_i];
        console.log(category);
        if (category.name === categoryParam) {
            console.log(categoryParam);
            console.log(category.name);
            category.name = newCategory;
            category.slug = slugify(newCategory);
        }
    }
    localStorage.setItem("data", JSON.stringify(data));
    window.location.href = "./categories.html";
});
