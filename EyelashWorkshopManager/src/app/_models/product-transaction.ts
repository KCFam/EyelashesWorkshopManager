import { ProductModel } from "./refs/product";

export class ProductTransactionModel {
  id: string = ""; //[Customer Name]-[ISO Time]
  customerName: string = "";
  customerPhone: string = "";
  deliveryDate: string = "";
  totalQuantity: number = 0;
  totalAmount: number = 0;
  transactionStatus: string = "";
  transactionItems: Array<ProductModel> = [];
  subProductTransactions: Array<SubProductTransactionModel> = [];
}

export class SubProductTransactionModel {
  id: string = ""; // [ISO Time]
  subTransactionStatus: string = "";
  newDeliveryDate: string = "";
  collectedAmount: number = 0;
  deliveriedItems: Array<ProductModel> = [];
}
