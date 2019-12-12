export class StaffTransactionModel {
  id: string = "";
  staffID: string = "";
  name: string = "";
  credit: number = 0; // staff credit before this transaction occurred
  time: string = "";
  quantity: number = 0;
  total: number = 0; // total amount for this transcation
  transactionCredit: number = 0; // amount collected for this transaction
  signature: string;
  transactions: StaffTransactionRowModel[];
}

export class StaffTransactionRowModel {
  itemName: string = "";
  quantity: number = 0;
  pricePerItem: number = 0;
}
