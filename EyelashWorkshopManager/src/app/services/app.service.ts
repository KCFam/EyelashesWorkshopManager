import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AppService {
  pageTitle = "";

  constructor() {}

  getPageTitle(): string {
    return this.pageTitle;
  }

  setPageTitle(newTitle: string) {
    this.pageTitle = newTitle;
  }
}
