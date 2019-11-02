export class StaffTransactionModel {
  id: string = "";
  staffID: string = "";
  name: string = "";
  credit: number = 0;
  time: string = "";
  quantity: number = 0;
  total: number = 0;
  transactionCredit: number = 0;
  signature: string;
  transactions: StaffTransactionRowModel[];
}

export class StaffTransactionRowModel {
  itemName: string = "";
  quantity: number = 0;
  pricePerItem: number = 0;
}
