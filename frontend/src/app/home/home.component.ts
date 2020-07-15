import { Component, OnInit } from '@angular/core';
import { CommonApiService } from '../services/common-api.service';
import {environment} from '../../environments/environment'
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products = [];
  apiUrl = environment.API_URL+'api/shop';
  isLoading:boolean = false;
  item: number = 0;
  jwt_decoded;

  constructor(
    private apiService: CommonApiService
  ) {

   }

  ngOnInit() {
    this.getProduct();
  }

  getProduct()
  {
    this.isLoading = true;
   this.apiService.getData(this.apiUrl+'/products').subscribe((res) =>{
    if(res.status === 200)
    {
      this.products = res.data;
      console.log(this.products);
      this.isLoading = false;
    }
    else{

      this.isLoading = false;
    }
  })
  
 }

 addToCart(product)
 {
   this.item = this.item + 1;
   this.apiService.cartItemSubject.next(this.item);

   this.apiService.userSubject.subscribe(response =>{
    this.jwt_decoded = jwt_decode(response);

    
  });

  console.log(this.jwt_decoded.email, 'jwt decodeedd')

   let addedItem = {
    user_email: this.jwt_decoded.email,
    product_name: product.product_name,
    original_price:product.original_price,
    offer_price:product.offer_price,
    offer:product.offer,
    color: product.color,
    brand: product.brand,
    size: product.size,
    qty: product.qty,
    category: product.category,
    description: product.description,
    timeStamp: product.timeStamp,
    pic_1: product.pic_1,
    pic_2: product.pic_2
   }

   this.apiService.postData(this.apiUrl+'/addToCart', addedItem).subscribe(res =>{
     if(res.status === 200)
     {
       alert(res.message);
     }
     else{
       alert(res.message);
     }
   })
   console.log(this.item);
   
 }
}
