


export interface filterData{
  CategoriesName :  string ,
  PriceLevel : number,
  BrandName : string

}
export interface Product{
    
    ProductId:number,
    brand:string,
    price:number,
    categories:string,
    destription:string,
    imageUrl:string,
    image:string

}

export interface  Cartproduct{
  ProductId: number,
  Name: string,
  Quantity: number,
  Price: number,
  imageUrl: string,
  SubTotal: number,
  Discount: number
 }
 export interface Profile{
   firstname:string,
   surname:string,
   email:string,
   address:string
 }
 export interface User{
      FirstName:string,
      MiddleName:string,
      LastName:string,
      IdentityNumber:string,
      Email:string,
      PhoneNumber: string,
      Password:string,
      AdditionalNumbe: string, 
      Address:string

  l
 }