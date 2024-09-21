import { Categorie } from "./Categorie"


export class Product{
    id?:number
    name:String=""
    description:String=""
    price:number=0
    categorie?:Categorie
    image?:File
}