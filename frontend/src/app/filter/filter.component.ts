import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {environment} from '../../environments/environment'
import { CommonApiService } from '../services/common-api.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  filterForm:FormGroup;
  products = [];
  apiUrl = environment.API_URL+'api/getProducts';
  isLoading:boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: CommonApiService

  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm()
  {
    this.filterForm = this.fb.group({

      color: [''],
      brand:[''],
      price:[''],
      discount:['']
    })
  }

  colorChaged(e)
  {
    console.log(e.target.value);


    
  }

  brandChaged(e)
  {
    console.log(e.target.value);

  }

  priceChaged(e)
  {
    console.log(e.target.value);

  }
  discountChaged(e)
  {
    console.log(e.target.value);

  }

  getProduct()
  {
    this.isLoading = true;
   this.apiService.getData(this.apiUrl).subscribe((res) =>{
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

}
