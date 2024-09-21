import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Product } from './models/Product';
import { ProductService } from './services/product.service';
import { FormsModule } from '@angular/forms';
import { SearchbarComponent } from "./searchbar/searchbar.component";
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule, RouterLink, FormsModule, SearchbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'VueProductApi';
  private searchService= inject(SearchService)
  search:String =""
  
  filteredProducts: Product[] = []
  constructor(public router:Router){}
  ngOnInit(): void {
    this.searchService.loadProducts().subscribe(
      (data)=>{
        this.filteredProducts=data
        console.log(this.filteredProducts)
      }
    )
    this.onSearch(this.search)
  }
  
  onSearch(search:String):Product[]{
    console.log(search)
    let productSearch:Product[]=[]
     this.searchService.searchProduct(search).subscribe((data)=>{
      this.filteredProducts = data
      console.log(this.filteredProducts)
     })
     return this.filteredProducts
     
   }

  
}
