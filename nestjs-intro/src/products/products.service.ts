import { Injectable , NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number){
        const prodId = Math.random().toString();
        const newProduct = new Product( prodId , title, desc, price);
        this.products.push(newProduct);
        return prodId;
    }

    fetchProducts(){
        return [...this.products];
    }

    fetchSingleProduct(productId: string){
        const product = this.findProduct(productId)[0];
        return {...product};
    }

    updateProducts(productId: string, title: string, desc:string, price: number){
        const [product,index] = this.findProduct(productId);
        const updatedProducts = {...product};
        if(title){
            updatedProducts.title = title;
        }
        if(desc){
            updatedProducts.desc = desc;
        }
        if(price){
            updatedProducts.price = price;
        }
        this.products[index] = updatedProducts;
    }

    deleteProduct(productId:string){
        const index = this.findProduct(productId)[1];
        this.products.splice(index,1);
    }

    private findProduct(id: string):[Product, number]{
    const productIndex = this.products.findIndex((prod) => prod.id === id );
    const product = this.products[productIndex];
        if(!product){
            throw new NotFoundException("NO products found!!!");
        }
        return [product,productIndex];

    }    
}