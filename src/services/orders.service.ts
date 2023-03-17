import connection from '../models/connection';
import OrderModel from '../models/order.model';
import { IOrder } from '../interfaces';
import UserModel from '../models/user.model';
import ProductModel from '../models/product.model';

export default class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  userModel = new UserModel(connection);

  productModel = new ProductModel(connection);

  public async getAll(): Promise<IOrder[]> {
    const orders = await this.model.getAll();
    return orders;
  }

  public async create(order: IOrder) {
    const { productsIds, user: { id } } = order;
     
    const newOrder = await this.model.create(id);

    await Promise.all(productsIds.map(async (productId) => 
      this.productModel.update(productId, newOrder)));
    
    return { type: null, message: { userId: id, productsIds } };
  }
}