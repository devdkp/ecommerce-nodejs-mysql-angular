export interface Products{
    id:number,
    product_name: string,
    original_price:string,
    offer_price:string,
    offer:string,
    color: string,
    brand: string,
    size: string,
    qty: number,
    category: string,
    description: string,
    timeStamp: Date,
    pic_1: string,
    pic_2: string,
  }

  export interface CartProducts{
    user_email: string,
    product_name: string,
    original_price:string,
    offer_price:string,
    offer:string,
    color: string,
    brand: string,
    size: string,
    qty: number,
    category: string,
    description: string,
    timeStamp: Date,
    pic_1: string,
    pic_2: string,
    status: string
  }