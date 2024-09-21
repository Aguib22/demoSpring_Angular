import { Component, inject } from '@angular/core';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {
  private searchService= inject(SearchService)
  search:String =""
  products:Product[]=[]

  ngOnInit(): void {
    this.searchService.loadProducts().subscribe(
      (data)=>{
        this.products=data
      }
    )
    this.onSearch(this.search)
    
  }
  
  

  onSearch(search:String):Product[]{
    let productSearch:Product[]=[]
     this.searchService.searchProduct(search).subscribe(data=>{
       productSearch = data
     })
     return productSearch
     
   }

}
