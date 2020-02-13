


export interface filterData{
  CategoriesName :  string ,
  PriceLevel : number,
  BrandName : string

}
export interface Product{
    
    productID:number,
    brand:string,
    price:number,
    categories:string,
    destription:string,
    imageUrl:string,
    image:string

}

export interface  Cartproduct{
  id :number,
  name: string,
  quatity : number,
  price: number,
  imageUrl: string,
  subTotal:  number
 }
 export interface Profile{
   name:string,
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