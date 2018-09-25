import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Routes } from '@angular/router';

import { MaterialModule } from '../material';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { RegisterPageComponent } from './containers/register-page/register-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

import { AuthInterceptor, AuthService, AuthGuard, RoleGuard } from './services';
import { AuthEffects, reducers, sessionStorage } from './store';


export const COMPONENTS = [
  LoginPageComponent,
  LoginFormComponent,
  RegisterPageComponent,
  RegisterFormComponent,
];

export const ROUTES: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule,
      providers: [
        AuthService,
        AuthGuard,
        RoleGuard,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        },
      ],
    };
  }
}

@NgModule({
  imports: [
    AuthModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('auth', reducers, { metaReducers: [sessionStorage] }),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class RootAuthModule { }
