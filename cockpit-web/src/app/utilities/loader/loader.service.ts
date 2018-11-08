import { Injectable } from '@angular/core';
import {LoaderState } from './loader-state';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();
  constructor() { }
  show() {
    console.log('show');
    this.loaderSubject.next(<LoaderState>{ show: true });
  }
  hide() {
    console.log('hide');
    this.loaderSubject.next(<LoaderState>{ show: false });
  }
}
