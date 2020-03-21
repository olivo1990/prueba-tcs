import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'wom-chile';
  public isLogin: boolean;

  constructor(private router: Router) {
      this.isLogin = false;

      router.events.subscribe( (event: Event) => {

        if (event instanceof NavigationStart) {
  
        }

        if (event instanceof NavigationEnd) {

        }
    });
  }

  ngOnInit() {

  }

}
