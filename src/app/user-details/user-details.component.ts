import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  Country: any = ['India', 'USA']
  City: any = ['Ahemdabad', 'Gandhinagar', 'Udaipur', 'Jaipur','New York']
  State: any = ['Rajasthan', 'Gujarat', 'California']
  id: any;
  updateUserVal: any;
  userscope!: any[];
  updateUserdata: any;
  userscopeUpdate!: any[];
  check:boolean=false;
  
  constructor(private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute) { }
  user!: FormGroup;
  users: any = {};
  ngOnInit(): void {
    debugger;
    let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    this.user = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', [<any>Validators.required, <any>Validators.pattern(emailRegex)]],
      phoneNo: ['', [Validators.required,Validators.pattern("[0-9 ]{10}")]],

      dob: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[A-Za-z])(?=.*[0-8])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      conpassword:['',Validators.required]
    });
    this.id = this.route.snapshot.params['id'];
    this.getUpdateUserData(this.id);
  }
  
  validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }

getUpdateUserData(id:any){
  debugger;
  if (localStorage.getItem('Users')) {
    this.updateUserVal = JSON.parse(localStorage.getItem('Users'));
    this.userscope = [...this.updateUserVal];
    for(let item of this.userscope){
      if(item['id']==id){
        this.updateUserdata=item;
      }

    }
    this.user.get('id')?.setValue(this.updateUserdata.id);
    this.user.get('firstName')?.setValue(this.updateUserdata.firstName);
    this.user.get('lastName')?.setValue(this.updateUserdata.lastName);
    this.user.get('emailId')?.setValue(this.updateUserdata.emailId);
    this.user.get('phoneNo')?.setValue(this.updateUserdata.phoneNo);
    this.user.get('dob')?.setValue(this.updateUserdata.dob);
   
    this.user.get('country')?.setValue(this.updateUserdata.address.country);
    this.user.get('city')?.setValue(this.updateUserdata.address.city);
    this.user.get('state')?.setValue(this.updateUserdata.address.state);
  
}
}
comparePassword(){
  
  debugger;
  if(this.user.value.password==this.user.value.conpassword)
  {
    
    this.check=false;
    return true;
  }
  else{
    
    this.check=true;
    return false;
  }
}


onSubmit(){
  debugger;
  
  if (this.user.valid && this.comparePassword()) {

    let jsonData={
      "id":this.user.value.id,
      "firstName":this.user.value.firstName,
      "lastName":this.user.value.lastName,
      "emailId":this.user.value.emailId,
      "phoneNo":this.user.value.phoneNo,
      "dob":this.user.value.dob,
      "password":this.user.value.password,
      "address":{
        "country":this.user.value.country,
        "city":this.user.value.city,
        "state":this.user.value.state,
      }

     }
    if(this.user.value.id != null && this.user.value.id!='' ){
      this.users = Object.assign(this.users, this.user.value);
      this.saveUpdateUSerData(this.user.value.id,jsonData);
    }
    else{
    let userVal = [];
    let allUser = [];
    if (localStorage.getItem('Users')) {
      userVal = JSON.parse(localStorage.getItem('Users'));
      allUser = [...userVal];
      jsonData.id=allUser.length + 1;

    }

    else {
      jsonData.id= 1;

    }
    this.addUser(jsonData);
  }
  } else {
    this.validateAllFields(this.user);
  }


}

saveUpdateUSerData(id:any,users:any){
  if (localStorage.getItem('Users')) {
    this.updateUserVal = JSON.parse(localStorage.getItem('Users'));
    this.userscopeUpdate = [...this.updateUserVal];
    this.userscopeUpdate[id-1]=users;
    localStorage.removeItem('Users');
    localStorage.setItem('Users', JSON.stringify(this.userscopeUpdate));
    alert("Your details updated sucessfully!")
    this.router.navigate(['user']);
  }

}


addUser(users: any){
  let userVal = [];
  let allUser = [];
  if (localStorage.getItem('Users')) {
    userVal = JSON.parse(localStorage.getItem('Users'));
    allUser = [...userVal];
    this.user.value.id = allUser.length + 1;
    allUser.push(users);
  }

  else {
    this.user.value.id = 1;
    allUser.push(users);
  }
  localStorage.removeItem('Users');
  localStorage.setItem('Users', JSON.stringify(allUser));
  alert("Your details added sucessfully!")
  this.router.navigate(['user']);

}

}
