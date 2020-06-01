import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms'
import {HTTPRequestService} from '../../services/httprequest.service'
import {IteamsService} from '../../services/iteams.service'
import * as XLSX from 'xlsx';

type AOA = any[][];
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})


export class AddProductComponent implements OnInit {
  data: AOA ;
  fileData: File = null;
  previewUrl: any = null;
  addProductGroup: FormGroup;
  addProductForm ={
    Name:"",
    Brand: "",
    Price: "",
    Categories: "",
    ImageUrl: "",
    Destription: "",
    Features:""
    
  }
  showPages:boolean =false;

  constructor(private http: HTTPRequestService, private Response:IteamsService  ) { 
    this.createAddProductForm();
  }

  ngOnInit() {
  }

  createAddProductForm(){
    this.addProductGroup = new FormGroup({
        'Name': new FormControl(this.addProductForm.Name,[Validators.required]),
        'Brand': new FormControl(this.addProductForm.Brand,[Validators.required]),
        'Price': new FormControl(this.addProductForm.Price,[Validators.required]),
        'Categories': new FormControl(this.addProductForm.Categories,[Validators.required]),
        'Destription': new FormControl(this.addProductForm.Destription,[Validators.required]),
        'ImageUrl': new FormControl(this.addProductForm.ImageUrl),
        'Features': new FormControl(this.addProductForm.Features)
        
    })

  }

  onSubmit()
  { 
   this.addProductGroup.get('ImageUrl').setValue(this.previewUrl); 
   this.http.AddProduct(this.addProductGroup.value).subscribe(response =>{this.ClearForm(response)});
   this.openDialog();
  }
  openDialog() {
   
  }
  ClearForm(response)
  {
    this.Response.closeDialog(response);
    this.addProductGroup.reset();
  }
  ConvertImageToBase64(imageInput: any) 
  {
    this.fileData = <File> imageInput.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.addEventListener('load',(event: any) => {
      this.previewUrl = reader.result;
     
    })
  }
  SelectedCategory(category)
  {
    this.addProductGroup.get('Categories').setValue(category);
    if(this.addProductGroup.value.Categories == "Pages")
    {
      this.showPages = true;
    }
    else
    {
      this.showPages = false;
    }
  }
  SelectedFeatures(features)
  {
    this.addProductGroup.get('Features').setValue(features);  
    console.log(features);
  }
  ConvertStringToNumber(value)
  {
    return parseFloat(value);
  }
  onFileUpload(event:any)
  {
    const target:DataTransfer = <DataTransfer>(event.target)
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }
}
