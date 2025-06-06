import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoSideLayerComponent } from './logo-side-layer.component';

describe('LogoSideLayerComponent', () => {
  let component: LogoSideLayerComponent;
  let fixture: ComponentFixture<LogoSideLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoSideLayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogoSideLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
