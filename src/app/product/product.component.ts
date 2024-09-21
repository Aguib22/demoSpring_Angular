import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router, RouterLink, RouterModule } from '@angular/router';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';
import { Categorie } from '../models/Categorie';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,RouterModule,RouterLink,FormsModule,ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  search:String=""
  prodcuts:Product[]=[]
  filteredProducts: Product[] = []
  categories:Categorie[]=[]
  selectedFile:File|null=null
  addForm:FormGroup
  constructor(private updatePaht:Router,private form:FormBuilder){
    this.addForm = this.form.group({
      name: [''],
      description: [''],
      price: [''],
      categorie: [''],
      image:[''] 
    });
  }
  private productService = inject(ProductService)
  private searchService = inject(SearchService)
  ngOnInit(): void {
    console.log("ng onInit .........")
    this.searchService.loadProducts().subscribe(data=>{
      this.prodcuts = data
      console.log(this.prodcuts)
    })

    this.getAllCategorie()
    
    
  }
  
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  add:boolean=false


  getAllCategorie(){
    
    this.productService.allCategorie().subscribe(data=>{
      this.categories = data
    })
    

  }

  onSearch(search:String):Product[]{
   
    this.searchService.searchProduct(search).subscribe(data=>{
      this.filteredProducts = data
    })
    return this.filteredProducts
    
  }
  onSubmitAdd() {
      const formData = new FormData();
      formData.append('name', this.addForm.get('name')?.value);
      formData.append('description', this.addForm.get('description')?.value);
      formData.append('price', this.addForm.get('price')?.value);
      formData.append('categorie', this.addForm.get('categorie')?.value);

      // Ajouter l'image si elle a été sélectionnée
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
        console.log(this.selectedFile)
      }

      // Appel au service pour ajouter le produit
      this.productService.addProduct(formData).subscribe(response => {
        console.log('Produit ajouté avec succès', response);
        this.addForm.reset()
      }, error => {
        console.error('Erreur lors de l\'ajout du produit', error);
      })
}

  

  onEdit(id:number){
    this.updatePaht.navigate(['edit/',id])
  }

  onDelete(id:number){
    if(confirm("voulez-vous vraiment supprimé ce produit!")){
      this.productService.deleteProdut(id).subscribe(
        ()=>{
          console.log("suppression effectuée avec succés")
          this.searchService.loadProducts()
        },
        error=>{
          console.error("erreur de suppression",error)
        }
      )
      
    }

  }

}
