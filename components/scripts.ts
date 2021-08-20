
//COLORES
//EAACAF

type Categories = {
    id: string;
    name: string;
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
    }

    return id;
}

const getStorage = () => {
    let locStorage: LocalStorage = JSON.parse(localStorage.getItem("data"));
    
    if(!locStorage){
        locStorage = {
            categories: [
                {
                    name:'Comida',
                    slug:'comida',
                    id: generateId(),
                },
                {
                    name:'Servicios',
                    slug:'servicios',
                    id: generateId(),

                },
                {
                    name:'Salidas',
                    slug:'salidas',
                    id: generateId(),

                },
                {
                    name:'Transporte',
                    slug:'transporte',
                    id: generateId(),
                },
                {
                    name:'Educación',
                    slug:'educacion',
                    id: generateId(),
                },
                {
                    name:'Trabajo',
                    slug:'trabajo',
                    id: generateId(),
                }
            ], 
            operations : []
        }
        localStorage.setItem("data",  JSON.stringify(locStorage));
    }



    return locStorage;
}

const init = () => {
    getStorage();
    // getListOperations():
}

init();




