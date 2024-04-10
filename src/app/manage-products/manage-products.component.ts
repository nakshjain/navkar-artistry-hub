import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../api/product.service";
import {MatTableDataSource} from "@angular/material/table";
import {Product} from "../models/products.types";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {AddProductComponent} from "./add-product/add-product.component";
import {ConfirmDeleteDialogComponent} from "./confirm-delete-dialog/confirm-delete-dialog.component";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {AddProductImagesComponent} from "./add-product-images/add-product-images.component";

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit{
  allProducts: any
  dataSource: any
  displayedColumns=['image', 'name', 'category', 'subCategory', 'price', 'availability', 'quantity', 'action']
  @ViewChild(MatPaginator) paginator !: MatPaginator
  @ViewChild(MatSort) sort !: MatSort
  constructor(private ngxUiLoaderService:NgxUiLoaderService,
              private matDialog: MatDialog,
              private productService:ProductService,
              private snackBar: MatSnackBar,) {
  }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this.ngxUiLoaderService.start()
    this.productService.getAllProducts().subscribe(
      (response)=>{
        this.allProducts=response
        this.dataSource=new MatTableDataSource<Product>(this.allProducts)
        this.dataSource.paginator=this.paginator
        this.dataSource.sort=this.sort
        this.ngxUiLoaderService.stop()
      },(error)=>{
        this.ngxUiLoaderService.stop()
      }
    )
  }
  openAddEditProductDialog(product?: Product) {
    const dialogRef=this.matDialog.open(AddProductComponent,{
      width: '500px',
      data: product
    })
    dialogRef.componentInstance.closeDialogEvent.subscribe(() => {
      dialogRef.close();
      this.getProducts()
    });
  }

  openAddEditImagesDialog(product?: Product) {
    const dialogRef=this.matDialog.open(AddProductImagesComponent,{
      width: '500px',
      data: product
    })
    dialogRef.componentInstance.closeDialogEvent.subscribe(() => {
      dialogRef.close();
      this.getProducts()
    });
  }

  openDeleteProductDialog(product: Product){
    const dialogRef=this.matDialog.open(ConfirmDeleteDialogComponent,{
      width: '500px',
      data: product
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.deleteProduct(product)
      }
    })
  }

  addProduct() {
    this.openAddEditProductDialog()
  }

  search($event: Event) {
    this.dataSource.filter=($event.target as HTMLInputElement).value
  }

  editProduct(product: Product) {
    this.openAddEditProductDialog(product)
  }

  editProductImages(product: Product) {
    this.openAddEditImagesDialog(product)
  }

  deleteProductConfirmation(product: Product) {
    this.openDeleteProductDialog(product)
  }
  deleteProduct(product: Product){
    this.productService.deleteProduct(product.productId).subscribe(
      (response)=>{
        this.openSnackBar(product.name+' deleted successfully!', 'Success');
        this.getProducts()
      }, (error)=>{
        this.openSnackBar(error.error, 'Error');
      }
    )
  }

  openSnackBar(message: string, action: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';

    this.snackBar.open(message, action, config)
  }
}
