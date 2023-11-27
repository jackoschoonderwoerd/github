import { Category } from "./category.model";

export interface AmplifierType {
    type: 'combo' | 'top' | 'speaker'
}



export interface Product {
    id?: string;
    category: Category;
    name: string;
    description: string;
    price: number;

    // watt:number;
    // sold:boolean;
    // description:string;
}
