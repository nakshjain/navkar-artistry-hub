import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitePoliciesComponent } from './site-policies.component';

describe('SitePoliciesComponent', () => {
  let component: SitePoliciesComponent;
  let fixture: ComponentFixture<SitePoliciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SitePoliciesComponent]
    });
    fixture = TestBed.createComponent(SitePoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
