import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Option } from './components/multi-check.component'

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
  it('should have options greater than zero', () => {
    app.options = [{ value: "123", label: "testhero" }]
    expect(app.options.length > 0).toBeTruthy();
  });

  it('should be able to show options selected', () => {
    const options: Option[] = [{ value: '123', label: 'ABC' }];
    expect(app.onSelectedOptionsChange(options));
  });
});
