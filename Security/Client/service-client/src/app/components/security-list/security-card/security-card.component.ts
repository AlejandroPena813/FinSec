import {Component, Input, OnInit} from '@angular/core';
import {Security} from '../../../models/Security';
import { SecurityService } from '../../../services/security.service';

@Component({
  selector: 'app-security-card',
  templateUrl: './security-card.component.html',
  styleUrls: ['./security-card.component.css']
})
export class SecurityCardComponent implements OnInit {

  @Input() security: Security;

  constructor(
    private securityService: SecurityService
  ) { }

  ngOnInit() {
  }

  deleteSecurity(id: number) {
    this.securityService.deleteOneSecurity(id).subscribe( // todo toaster
      resp => {
        console.log(`Success: ${resp}`);
      }, err => {
        console.log(`Failure: ${err}`);
      }
    );
  }

}
