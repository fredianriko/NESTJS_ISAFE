import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  // inject product service to controller through constructor
  constructor(private readonly productService: ProductsService) {}

  //endpoint to add new product
  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = this.productService.addProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  }

  @Get()
  getProduct() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id') prodId: string) {
    return this.productService.getOneProduct(prodId);
  }

  @Delete(':id')
  deleteOneProduct(@Param('id') prodId: string) {
    return this.productService.deleteOneProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    return this.productService.updateOneProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
  }
}
