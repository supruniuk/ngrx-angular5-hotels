import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { RegisterFormComponent } from './register-form.component';
import * as Auth from '../../actions/auth';
import * as fromAuth from '../../reducers';
import { ReactiveFormsModule } from '@angular/forms';

describe('Register Page', () => {
  let fixture: ComponentFixture<RegisterFormComponent>;
  let instance: RegisterFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RegisterFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(RegisterFormComponent);
    instance = fixture.componentInstance;
  });

  it('should compile', () => {
    fixture.detectChanges();

    /**
     * The login form is a presentational component, as it
     * only derives its state from inputs and communicates
     * externally through outputs. We can use snapshot
     * tests to validate the presentation state of this component
     * by changing its inputs and snapshotting the generated
     * HTML.
     *
     * We can also use this as a validation tool against changes
     * to the component's template against the currently stored
     * snapshot.
     */
    expect(fixture).toMatchSnapshot();
  });

  it('should disable the form if pending', () => {
    instance.pending = true;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should display an error message if provided', () => {
    instance.errorMessage = 'Invalid credentials';

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should emit an event if the form is valid when submitted', () => {
    const credentials = {
      name: 'user',
      email: 'user@mail.com',
      password: 'pass',
    };
    instance.form.setValue(credentials);

    spyOn(instance.onSubmit, 'emit');
    instance.submit();

    expect(instance.onSubmit.emit).toHaveBeenCalledWith(credentials);
  });
});
