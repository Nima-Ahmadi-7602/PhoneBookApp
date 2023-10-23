import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactManagerComponent } from './components/contact-manager/contact-manager.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import { ViewContactComponent } from './components/view-contact/view-contact.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  {path:'' , redirectTo:'contact/admin' , pathMatch:'full'},
  {path:'contact/admin' , component:ContactManagerComponent},
  {path:'contact/add' , component:AddContactComponent},
  {path:'contact/edit/:contactId' , component:EditContactComponent},
  {path:'contact/view/:contactId' , component:ViewContactComponent},
  {path:'**' , component:PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
