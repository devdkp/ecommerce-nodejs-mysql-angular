import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidatorService } from 'src/app/services/custom-validator.service';
import {environment }from '../../environments/environment'
import { CommonApiService } from 'src/app/services/common-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  apiMessage;
  isLoading: boolean = false;
  ipAddress: '';


  constructor(private fb: FormBuilder,
     private customValidator: CustomValidatorService,
     private commonService: CommonApiService,
     private router: Router
     ) { }

  ngOnInit() {
    this.createForm();
    //this.getIpAddress();
  }

  // getIpAddress()
  // {
  //   this.commonService.getIPAddress().subscribe((res:any)=>{  
  //     this.ipAddress=res.ip;  
  //   });  
  // }

  get registerFormControl() {
    return this.registerForm.controls;
  }


  createForm()
  {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, this.customValidator.emailValidator()])],
      contactNo: ['', Validators.compose([Validators.required, this.customValidator.phoneNoValidator()])],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
    }
    
    )
  }

  submitForm()
  {
    this.submitted = true;
    this.apiMessage = '';
    let url = environment.API_URL+ 'api/auth/register';
    let postData = 
    {
      name: this.registerForm.get('name').value,
      email: this.registerForm.get('email').value,
      contactNo: this.registerForm.get('contactNo').value,
      password: this.registerForm.get('password').value,
      timeStamp : new Date()

   }

   console.log(postData);
   

    if(this.registerForm.valid)
    {
    this.isLoading = true;
    this.commonService.postData(url, postData)
      .subscribe(res =>{
        console.log(res, 'response');
         if(res["status"] === 200)
         {
          this.apiMessage =  this.customValidator.showApiMessage('success', res["message"]);
          this.isLoading = false;
          setTimeout(() =>{
            this.router.navigate(['/login']);
          }, 2000)
         }
         else{
          this.apiMessage =  this.customValidator.showApiMessage('danger', res["message"]);
          this.isLoading = false;
         }
      },
      error =>{
        this.isLoading = false;
        this.apiMessage =  this.customValidator.showApiMessage('danger', error["message"]);

      })

    }
    
  }

}
