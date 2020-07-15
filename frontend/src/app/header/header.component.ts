import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { CommonApiService } from '../services/common-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin:boolean = false;
  jwt_decoded;
  cartItem:number = 0;

  constructor(
    private commonService: CommonApiService,
    private router: Router
  ) { 

    this.commonService.userSubject.subscribe(response =>{
      console.log('User Subject is', response);
      this.jwt_decoded = jwt_decode(response);
      console.log('decoded jwt is', this.jwt_decoded);
  
      if(this.jwt_decoded.email)
      this.isLogin = true;
      else
      this.isLogin = false;
      
    });

    this.commonService.cartItemSubject.subscribe(res =>{
       this.cartItem = res;
    })
  }

  ngOnInit() {
    
  }

  logOut()
  {
   localStorage.removeItem('access_token');
    this.router.navigate(['/']);
   // this.commonService.userDetails.next(null);
    this.isLogin = false;

    
  }

}
