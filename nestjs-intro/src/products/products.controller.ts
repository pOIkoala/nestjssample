import { Controller , Post , Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController{
    constructor(private readonly productsServices: ProductsService) {}
    @Post()
    addProduct(
        @Body('title') prodTitle:string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ): any {
        const generatedId = this.productsServices.insertProduct(prodTitle,prodDesc,prodPrice);
        return { id:generatedId };
    }

    @Get()
    getAllProduct(){
        return this.productsServices.fetchProducts();
    }

    @Get(':id')
    getProduct(
        @Param('id') prodId: string){
            return this.productsServices.fetchSingleProduct(prodId);
        }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string, 
        @Body('title')prodTitle: string,
        @Body('description')prodDesc: string,
        @Body('price')prodPrice: number
    ){
        this.productsServices.updateProducts(prodId, prodTitle,prodDesc,prodPrice );
        return null;
    }

    @Delete(':id')
    deleteProduct(
        @Param('id')prodId : string
    ){
        this.productsServices.deleteProduct(prodId);
        return null;
    }
}