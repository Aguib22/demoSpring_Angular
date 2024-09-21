import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  products:Product[]=[]
  urlApiSpring = "http://localhost:8080/product"
  constructor(private httpSrpring:HttpClient) { }

  findAll():Observable<Product[]>{
    return this.httpSrpring.get<Product[]>(this.urlApiSpring)
  }

  loadProducts():Observable<Product[]>{
    return this.findAll().pipe(tap(products=> this.products = products))
  }

  searchProduct(search:any):Observable<Product[]>{
    if(!search){
      return of(this.products)
    }else{
      search= search.toString().toLowerCase()
      const getProductFilter = this.products.filter(product=>product.name.toLowerCase().includes(search)||product.description.toLowerCase().includes(search)||product.categorie?.categorieName?.toLowerCase().includes(search)||product.price.toString().includes(search))
      
      return of(getProductFilter)
      
    }
  }

}
