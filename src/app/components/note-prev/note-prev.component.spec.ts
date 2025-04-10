import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotePrevComponent } from './note-prev.component';

describe('NotePrevComponent', () => {
  let component: NotePrevComponent;
  let fixture: ComponentFixture<NotePrevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotePrevComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotePrevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
