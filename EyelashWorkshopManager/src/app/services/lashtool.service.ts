import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LashToolService {
  lashToolList: string[] = [
    "3D-9mm",
    "3D-10mm",
    "3D-11mm",
    "3D-12mm",
    "3D-13mm",
    "3D-14mm",
    "3D-15mm",
    "3D-16mm",
    "4D-9mm",
    "4D-10mm",
    "4D-11mm",
    "4D-12mm",
    "4D-13mm",
    "4D-14mm",
    "4D-15mm",
    "4D-16mm",
    "5D-9mm",
    "5D-10mm",
    "5D-11mm",
    "5D-12mm",
    "5D-13mm",
    "5D-14mm",
    "5D-15mm",
    "5D-16mm"
  ];

  constructor() {}
}
