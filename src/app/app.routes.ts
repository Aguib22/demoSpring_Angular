import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { UpdateComponent } from './update/update.component';
import { AppComponent } from './app.component';

export const routes: Routes = [

    
    {path:'product',component:ProductComponent},
    {path:'edit/:id',component:UpdateComponent}
];
