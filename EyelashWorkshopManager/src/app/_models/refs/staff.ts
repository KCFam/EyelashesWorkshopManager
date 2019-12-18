import { LashToolModel } from "./lash-tool";

export class StaffModel {
  id: string = ""; // [Staff Name]-[ID]
  name: string = "";
  phone: string = "";
  credit: number = 0;
  address: string = "";
  lashTool: string[] = [];
  note: string = "";
}
