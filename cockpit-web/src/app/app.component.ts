import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cockpit';

  idInput: string;

  constructor(private router: Router) {
    
  }

  onSearch() {
    if (this.idInput != undefined) {
      if (this.idInput.startsWith("O") && this.idInput.length == 14) {
        window.open('#/orders/' + this.idInput);
      } else if  (this.idInput.startsWith("E") && this.idInput.length == 14) {
        window.open('#/executions/' + this.idInput);
      } else {
        alert("Please enter a valid ID"); 
      }
    }
  }
  
  
}


