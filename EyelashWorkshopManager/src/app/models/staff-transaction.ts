export class StaffTransactionModel {
  id: string = "";
  staffID: string = "";
  time: string = "";
  quantity: number = 0;
  total: number = 0;
  transactions: StaffTransactionRowModel[];
}

export class StaffTransactionRowModel {
  itemName: string = "";
  quantity: number = 0;
  pricePerItem: number = 0;
}
