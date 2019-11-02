import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRefComponent } from './product-ref.component';

describe('ProductRefComponent', () => {
  let component: ProductRefComponent;
  let fixture: ComponentFixture<ProductRefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
