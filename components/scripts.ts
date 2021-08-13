
type Categories = {
    id: string;
    nombre: string;
    slug: string;
}

type Operations = {
    category: string;
    description: string;
    date: string;
    id: string;
    amount: number;
    type: string;
}

type LocalStorage = {
    categories: Categories[];
    operations: Operations[];
}

const generateId = ():string => {
    let id = '';
    const charts = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 21; i++) {
        id += charts.charAt(Math.floor(Math.random() * charts.length))
        if(i % 5 === 1){
            id += '-'
        }
    }

    return id;
}

console.log(generateId());