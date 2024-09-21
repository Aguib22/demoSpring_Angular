import { Component, inject, OnInit } from '@angular/core';
import { Categorie } from '../models/Categorie';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../models/Product';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit{
  categories:Categorie[]=[]
  updateForm:FormGroup
  selectedFile:File|null=null
  upId:number=0
  productUp:FormGroup|undefined
  private productService=inject(ProductService)
  constructor(private url:Router,private urlId:ActivatedRoute,private form:FormBuilder){
    this.updateForm = this.form.group(
      {
        name: [''],
        description: [''],
        price: [''],
        categorie: [''],
        image:[null] 
      }
    )
  }
  
  ngOnInit(): void {
    this.getAllCategorie()
    this.upId = +(this.urlId.snapshot.paramMap.get('id')!)
    this.productUp = this.updateForm
    this.productService.getbyId(this.upId).subscribe(
      product=> this.productUp?.patchValue(product)
    )
  }
  getAllCategorie(){
    
    this.productService.allCategorie().subscribe(data=>{
      this.categories = data
     
    })
    
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpdate(){
    
     
      const formData = new FormData();
      formData.append('name', this.updateForm.get('name')?.value);
      formData.append('description', this.updateForm.get('description')?.value);
      formData.append('price', this.updateForm.get('price')?.value);
      formData.append('categorie', this.updateForm.get('categorie')?.value);

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
        console.log(this.selectedFile)
      }

      const productId = this.updateForm.get('id')?.value;

      this.productService.update(this.upId, formData).subscribe(
        response => {
          console.log('Produit mis à jour avec succès', response);
          this.updateForm.reset()
      }, error => {

          console.error('Erreur lors de la mise à jour du produit', error);
      });
     
      
      
    }
}


