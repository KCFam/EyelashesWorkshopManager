import {
  Injectable,
  OnChanges,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AppService {
  pageTitle = "";

  // Emitter for page title change event
  pageTitleUpdated = new EventEmitter();

  constructor() {}

  getPageTitle(): string {
    return this.pageTitle;
  }

  setPageTitle(newTitle: string) {
    this.pageTitle = newTitle;
    this.pageTitleUpdated.emit(this.pageTitle);
  }
}
