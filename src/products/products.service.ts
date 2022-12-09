import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';
// import database entity

@Injectable()
export class ProductsService {
  //dummy database
  private products: Product[] = [];

  addProduct(title: string, desc: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);

    this.products.push(newProduct);

    // with database

    return prodId;
  }

  getAllProducts(): Product[] {
    // return products arrays
    return [...this.products];
  }

  getOneProduct(productId: string) {
    const product = this.products.find((prod) => prod.id === productId);

    // throw if product not exist with given id
    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    return { ...product };
  }

  deleteOneProduct(productId: string) {
    // check if product with given id exist or not
    // if product with given id exist, then delete that product
    const product = this.products.find((prod) => prod.id === productId);

    // check condition
    if (!product) {
      throw new NotFoundException('Cannot delete non-existence product');
    } else {
      this.products = this.products.filter((prod) => prod.id !== productId);
    }

    // construct desired return result
    const result = {
      deletedProduct: product,
    };

    return result;
  }

  updateOneProduct(
    prodId: string,
    prodTitle: string,
    prodDesc: string,
    prodPrice: number,
  ) {
    // check if product exist or not
    const checkProduct = this.products.find((prod) => prod.id === prodId);
    // if product not existed, throw not found exception
    if (!checkProduct) {
      throw new NotFoundException('Cannot update product that non-existence');
    }
    //if product exist, reassign the value in that product with the new value from input
    checkProduct.title = prodTitle ? prodTitle : checkProduct.title;
    checkProduct.description = prodDesc ? prodDesc : checkProduct.description;
    checkProduct.price = prodPrice ? prodPrice : checkProduct.price;
    // return new product

    return checkProduct;
  }
}
