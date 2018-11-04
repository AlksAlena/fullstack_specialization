import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteMoviesComponent } from './favorite-movies.component';

describe('FavoriteMoviesComponent', () => {
  let component: FavoriteMoviesComponent;
  let fixture: ComponentFixture<FavoriteMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
