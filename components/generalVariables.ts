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

const newOperation = {
    category: "" ,
    description: "",
    date: "",
    id: "",
    amount: 0,
    type: "",
}