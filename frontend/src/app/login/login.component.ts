import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonApiService } from '../services/common-api.service';
import { CustomValidatorService } from '../services/custom-validator.service';
import {environment} from '../../environments/environment'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  apiMessage: string;
  submitted:boolean = false;
  isLoading: boolean = false;


  constructor(
    private fb: FormBuilder,
    private apiService: CommonApiService,
    private validationService: CustomValidatorService,
    private router: Router
  ) { }

  ngOnInit() {

    this.createForm();
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  createForm()
  {
this.loginForm = this.fb.group({
  email:['sudodkp777@gmail.com', Validators.required],
  password: ['Dkp@123456', Validators.required]
})
  }

  loginSubmit()
  {
    this.submitted = true;
    this.apiMessage = '';
    let url = environment.API_URL+ 'api/auth/login';
    let postData = 
    {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,

   }

   console.log(postData);
   

    if(this.loginForm.valid)
    {
      this.isLoading = true;

       this.apiService.postData(url, postData).subscribe(res =>{
             
        if(res.status === 200)
         {
          this.isLoading = false;
          this.apiMessage =  this.validationService.showApiMessage('success', res["message"]);
           localStorage.setItem('access_token', res['token']);

           let token = localStorage.getItem('access_token');
           console.log('Accee tikkkkkkk', token);
           
          //  setTimeout(() =>{
            this.apiService.userSubject.next(token);
             this.router.navigate(['/']);
          //  },0)
          
         
         }
         else{
          this.isLoading = false;
          this.apiMessage =  this.validationService.showApiMessage('danger', res["message"]);
          
         }
      },
      error =>{
        this.isLoading = false;
        this.apiMessage =  this.validationService.showApiMessage('danger', error["message"]);

      }
      
      
      )

    }
    
  }

}
