import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor( private router:Router) { }
  users: any = [];
  userVal: any = [];
  firstName: any;
  lastName: any;
  emailId: any;
  ngOnInit(): void {
    debugger;


    if (localStorage.getItem('Users')) {
      this.userVal = JSON.parse(localStorage.getItem('Users'));
      this.users = [...this.userVal];

    }
  }
  updateEmployee(id: any) {
    debugger;
    this.router.navigate(['update-user', id]);
    
  }
  deleteEmployee(id: any) {
    debugger;
    alert("Are you sure you want to delete this record?")
    if (localStorage.getItem('Users')) {
      this.userVal = JSON.parse(localStorage.getItem('Users'));
      this.users = [...this.userVal];
     
    
        this.users.splice(id-1, 1);
      
      localStorage.removeItem('Users');
      localStorage.setItem('Users', JSON.stringify(this.users));

    }

  }
}
