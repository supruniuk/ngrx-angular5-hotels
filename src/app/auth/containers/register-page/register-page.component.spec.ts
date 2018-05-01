import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatInputModule, MatCardModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { RegisterPageComponent } from './register-page.component';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import * as Auth from '../../actions/auth';
import * as fromAuth from '../../reducers';

describe('Register Page', () => {
  let fixture: ComponentFixture<RegisterPageComponent>;
  let store: Store<fromAuth.State>;
  let instance: RegisterPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        StoreModule.forRoot({
          auth: combineReducers(fromAuth.reducers),
        }),
        MatInputModule,
        MatCardModule,
        ReactiveFormsModule,
      ],
      declarations: [RegisterPageComponent, RegisterFormComponent],
    });

    fixture = TestBed.createComponent(RegisterPageComponent);
    instance = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  /**
   * Container components are used as integration points for connecting
   * the store to presentational components and dispatching
   * actions to the store.
   *
   * Container methods that dispatch events are like a component's output observables.
   * Container properties that select state from store are like a component's input properties.
   * If pure components are functions of their inputs, containers are functions of state
   *
   * Traditionally you would query the components rendered template
   * to validate its state. Since the components are analagous to
   * pure functions, we take snapshots of these components for a given state
   * to validate the rendered output and verify the component's output
   * against changes in state.
   */
  it('should compile', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a REGISTER action on submit', () => {
    const $event: any = {};
    const action = new Auth.Register($event);

    instance.onSubmit($event);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch a LOGIN_REDIRECT action on cancel', () => {
    const action = new Auth.LoginRedirect();

    instance.onCancel();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

});
