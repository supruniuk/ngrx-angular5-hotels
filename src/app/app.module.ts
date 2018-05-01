import { NgModule, ErrorHandler, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@env/environment';

import { reducers, metaReducers } from './core/store/reducers';
import { CustomRouterStateSerializer } from './shared/utils';

import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './core/components/app/app.component';
import {
  LayoutComponent,
  RootRedirectComponent,
  NotFoundPageComponent,
} from './core/containers/';
import { AuthGuard, RoleGuard } from './auth/services';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RootRedirectComponent,
    // canActivate: [RoleGuard],
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'customer',
        loadChildren: './customer/customer.module#CustomerModule',
        // canLoad: [PermissionGuard],
      },
      {
        path: 'hotel',
        loadChildren: './hotel/hotel.module#HotelModule',
        // canLoad: [PermissionGuard],
      }
    ]
  },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes, { useHash: true }),
    // RouterModule.forRoot(routes, { useHash: true, enableTracing: true }),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule,
    EffectsModule.forRoot([]),
    CoreModule.forRoot(),
    AuthModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    { 
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer 
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }



