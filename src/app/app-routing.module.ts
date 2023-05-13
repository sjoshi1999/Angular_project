import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';


const routes: Routes = [
  {path:'user', component:UserListComponent},
  {path:'create-user', component:UserDetailsComponent},
  {path:'',redirectTo:'user',pathMatch:'full'},
  {path:'update-user/:id',component:UserDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
