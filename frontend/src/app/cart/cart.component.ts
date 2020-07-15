import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment'
import { CommonApiService } from '../services/common-api.service';
import * as jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  isLoading: boolean = false;
  apiUrl = environment.API_URL+'api/shop';
  products = [];
  jwt_decoded;
  private sum=0;  
  private value;

  constructor(
    private apiService:CommonApiService
  ) { }

  ngOnInit() {
    this.apiService.cartItemSubject.next(null);

    this.getCartProduct();
    
  }


  getCartProduct()
  {
    this.apiService.userSubject.subscribe(response =>{
      this.jwt_decoded = jwt_decode(response);
  
      
    });

     const postData = {
      email: this.jwt_decoded.email,
      status: 'Pending'
    }
    
    this.isLoading = true;
   this.apiService.postData(this.apiUrl+'/getCartProducts', postData).subscribe((res) =>{

    // console.log(res, 'response');
    
    if(res.status === 200)
    {
      this.products = res.data;
      // this.addTotal(this.products)
     console.log(this.products, 'product from cart');
      this.isLoading = false;
    }
    else{

      this.isLoading = false;
    }
  })
  
 }

}
