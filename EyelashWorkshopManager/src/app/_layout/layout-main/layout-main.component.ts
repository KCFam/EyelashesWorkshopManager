import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { AppService } from "src/app/_services/_app.service";

@Component({
  selector: "app-layout-main",
  templateUrl: "./layout-main.component.html",
  styleUrls: ["./layout-main.component.scss"]
})
export class LayoutMainComponent implements OnInit {
  // Mobile screen config
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  pageTitle: string = "";

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private appService: AppService
  ) {
    // Check for mobile device
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    // capture page title
    this.appService.pageTitleUpdated.subscribe(pageTitle => {
      this.pageTitle = this.appService.getPageTitle();
    });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
