import connection from '../models/connection';
import ProductModel from '../models/product.model';
import { IProduct } from '../interfaces';

export default class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async getAll(): Promise<IProduct[]> {
    const products = await this.model.getAll();
    return products;
  }

  public async create(product: IProduct): Promise<IProduct> {
    return this.model.create(product);
  }
}
