import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'se-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass'],
})
export class NavComponent implements OnInit {

  public isNavCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

}
