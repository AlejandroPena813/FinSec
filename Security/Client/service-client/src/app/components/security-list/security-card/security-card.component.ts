import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-security-card',
  templateUrl: './security-card.component.html',
  styleUrls: ['./security-card.component.css']
})
export class SecurityCardComponent implements OnInit {

  @Input() provider; // todo remove, add ': Security' model

  constructor() { }

  ngOnInit() {
  }

}
