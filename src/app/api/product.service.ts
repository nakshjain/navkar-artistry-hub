import {Injectable} from '@angular/core';
import {Product, ProductsByCategory} from "../types/products.types";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private dataSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public products$: Observable<Product[]> = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.fetchProductData();
  }

  private fetchProductData(): void {
    const documentId = '1Rc3UPChXpkP7u2XrJ6mX_JK1ao3y2m-53zVLQZwnxUI';
    const exportUrl = `https://docs.google.com/spreadsheets/d/${documentId}/gviz/tq?tqx=out:json`;

    this.http.get(exportUrl, { responseType: 'text' }).subscribe(
      (response: string) => {
        const startIndex = response.indexOf('google.visualization.Query.setResponse');
        if (startIndex !== -1) {
          const jsonStartIndex = response.indexOf('{', startIndex);
          const jsonEndIndex = response.lastIndexOf('}') + 1;
          if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
            const jsonResponse = JSON.parse(response.substring(jsonStartIndex, jsonEndIndex));
            const rawData = jsonResponse.table.rows;
            const formattedData = rawData.map((row: any) => {
              return {
                id: row.c[0].v,
                name: row.c[1].v,
                author: row.c[2].v,
                category: row.c[3].v,
                rating: row.c[4].v,
                imageUrl: row.c[5].v,
                review: row.c[6].v,
              };
            });
            this.dataSubject.next(formattedData)
          } else {
            console.error('Unexpected response format:', response);
          }
        } else {
          console.error('Response does not contain expected data:', response);
        }
      },
      (error) => {
        console.error('Error fetching Product data:', error);
      }
    );
  }

  getProductsAll(): Observable<Product[]> {
    return this.products$;
  }

  getAllProductsByCategory(): Observable<ProductsByCategory[]> {
    return this.products$.pipe(
      map(
        (products)=>{
          const productsByCategory: { [category: string]: Product[] } = {};

          products.forEach((product) => {
            if (productsByCategory[product.category]) {
              productsByCategory[product.category].push(product);
            } else {
              productsByCategory[product.category] = [product];
            }
          });
          return Object.keys(productsByCategory).map(
            (category) => ({
              category: category,
              products: productsByCategory[category],
            })
          );
        }
      )
    )
  }

  getProductById(id: string){
    return this.products$.pipe(
      map((products)=>{
        return products.find(product=>product.id===id)
      })
    )
  }

  getProductsByCategory(category: string){
    return this.products$.pipe(
      map((products)=>{
        return products.filter(product => product.category === category)
      })
    )
  }
}
