import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css']
})
export class SlidebarComponent implements OnInit {

  menuArreglo: any[] = [];

  config = {
    paddingAtStart: true,
    classname: 'tree-menu-custom',
    listBackgroundColor: '',
    fontColor: '',
    backgroundColor: '',
    selectedListFontColor: '#000',
  };

  appitems = [
    {
      label: 'Empleados',
      link: '/empleados',
      icon: 'person'
    }
  ];

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  selectedItem(event:any):void{
    console.log(event.link);
    this.router.navigate([event.link]);
  }

}
