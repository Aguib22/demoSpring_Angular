import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { Observable, of,tap } from 'rxjs';
import { Categorie } from '../models/Categorie';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  urlApiSpring = "http://localhost:8080/product"
  urlApiSpringForCategorie = "http://localhost:8080/categorie"

  constructor(private httpSrpring:HttpClient) { }

  getbyId(id:number):Observable<Product>{
    return this.httpSrpring.get<Product>(this.urlApiSpring+id)
  }

  
 

  
  addProduct(product:FormData):Observable<any>{
    return this.httpSrpring.post(`${this.urlApiSpring}/create`,product)
  }

  allCategorie():Observable<Categorie[]>{
    return this.httpSrpring.get<Categorie[]>(this.urlApiSpringForCategorie)

  }

  deleteProdut(id:number):Observable<void>{
    return this.httpSrpring.delete<void>(`${this.urlApiSpring}/delete/${id}`)
  }

  update(id:number,formdata:FormData):Observable<Product>{
    return this.httpSrpring.put<Product>(this.urlApiSpring+`/update/${id}`,formdata)
  }

}

