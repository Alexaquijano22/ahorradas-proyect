var generateId = function () {
    var id = '';
    var charts = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 21; i++) {
        id += charts.charAt(Math.floor(Math.random() * charts.length));
        if (i % 5 === 1) {
            id += '-';
        }
    }
    return id;
};
console.log(generateId());
