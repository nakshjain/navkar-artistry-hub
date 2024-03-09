import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageMainComponent } from './home-page-main.component';

describe('HomePageMainComponent', () => {
  let component: HomePageMainComponent;
  let fixture: ComponentFixture<HomePageMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageMainComponent]
    });
    fixture = TestBed.createComponent(HomePageMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
