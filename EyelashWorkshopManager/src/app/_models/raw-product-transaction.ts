import { TransactionModel } from "./refs/transaction";
import { RawProductModel } from "./refs/raw-product";

export class RawProductTransactionModel {
  id: string = ""; //[Staff Name]-[ISO Time]
  staffID: string = "";
  totalQuantity: number = 0;
  totalAmount: number = 0;
  transaction: TransactionModel = new TransactionModel();
  transactionItems: Array<RawProductModel> = [];
}
