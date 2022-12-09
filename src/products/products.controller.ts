import { Controller, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  // inject product service to controller through constructor
  constructor(private readonly productService: ProductsService) {}

  //endpoint to add new product
  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = this.productService.addProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  }
}
