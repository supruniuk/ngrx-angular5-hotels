import { NgModule, ModuleWithProviders, ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";



@Injectable()
export class MyErrorHandler implements ErrorHandler {
  constructor() { }
  
  handleError(error) {
    if (error instanceof HttpErrorResponse) {
      // this.handleServerError(error)
      alert("Handler: " + error);
    } else if (error instanceof Error) {
      alert("Handler: " + error);
      // this.handleClientError(error)
    } else {
      alert("Handler: " + error);
      // this.handleUnexpectedError(error)
    }

    // throw error;
  }
}