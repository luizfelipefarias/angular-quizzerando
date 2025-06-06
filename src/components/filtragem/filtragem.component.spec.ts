import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltragemComponent } from './filtragem.component';

describe('FiltragemComponent', () => {
  let component: FiltragemComponent;
  let fixture: ComponentFixture<FiltragemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltragemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltragemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
