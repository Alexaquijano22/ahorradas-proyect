var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var listCategories = document.getElementById("list-categories");
var formNewCategory = document.getElementById("formCategory");
var nameCategory = document.getElementById("nameCategory");
var removeCategory = function (id) {
    var data = getStorage();
    var categoriesUp = data.categories.filter(function (category) { return category.id !== id; });
    localStorage.setItem("data", JSON.stringify(__assign(__assign({}, data), { categories: categoriesUp })));
    getListCategories();
};
var getListCategories = function () {
    listCategories.innerHTML = '';
    var data = getStorage();
    var _loop_1 = function (category) {
        var div = document.createElement('div');
        var categoryDiv = document.createElement('div');
        var accions = document.createElement('div');
        var categoryTxt = document.createTextNode("" + category.name);
        var edit = document.createElement('a');
        var remove = document.createElement('a');
        var editTxt = document.createTextNode("Editar");
        var removeTxt = document.createTextNode("Eliminar");
        categoryDiv.appendChild(categoryTxt);
        edit.appendChild(editTxt);
        remove.appendChild(removeTxt);
        accions.appendChild(edit);
        accions.appendChild(remove);
        div.appendChild(categoryDiv);
        div.appendChild(accions);
        //estilos
        div.setAttribute("class", "d-flex justify-content-between mt-3");
        edit.setAttribute("class", "me-4");
        listCategories.appendChild(div);
        edit.setAttribute("class", "btn btn-outline-primary btn-sm me-2");
        remove.setAttribute("class", "btn btn-outline-secondary btn-sm");
        edit.setAttribute("href", "./edit-category.html?category=" + category.name);
        remove.addEventListener("click", function () {
            removeCategory(category.id);
        });
    };
    for (var _i = 0, _a = data.categories; _i < _a.length; _i++) {
        var category = _a[_i];
        _loop_1(category);
    }
};
//Falta corroborar si el nombre que se agrega ya estaba agregado
formNewCategory.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = getStorage();
    data.categories.push({
        name: nameCategory.value,
        slug: slugify(nameCategory.value),
        id: generateId()
    });
    localStorage.setItem("data", JSON.stringify(data));
    getListCategories();
    formNewCategory.reset();
});
getListCategories();
