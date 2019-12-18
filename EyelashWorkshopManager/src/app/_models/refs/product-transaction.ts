import { ProductModel } from "./product";

export class ProductTransaction {
  id: string = ""; // [product-transaction ISO Time]
  customerName: string = "";
  customerPhone: string = "";
  deliveryDate: string = "";
  remainingAmount: number = 0;
  remainingItems: Array<ProductModel> = [];
}
