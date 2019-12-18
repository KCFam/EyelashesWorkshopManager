export class TransactionModel {
  id: string = ""; // [expense/income]-[ISO Time]
  type: string = "";
  amount: number = 0;
  note: string = "";
}
