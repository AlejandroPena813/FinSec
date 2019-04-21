import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../services/security.service';
import {Security} from '../../models/Security';

@Component({
  selector: 'app-security-list',
  templateUrl: './security-list.component.html',
  styleUrls: ['./security-list.component.css'],
  providers: [SecurityService]
})
export class SecurityListComponent implements OnInit {
  // todo [2X]Sec+SecPrice -need forms for POST/PATCH. Delete button/service call
  // todo work on getAllSecurity. Then getSingleSec for details.

  securitiesList: Security[];

  constructor(
    private securityService: SecurityService
  ) { }

  ngOnInit() {
    // todo could add toasters for err/succ
    this.securityService.getSecurities().subscribe((securityList: Security[]) => {
      this.securitiesList = securityList;
    }, errRep => {
      console.log('Error getting all sec' + errRep); // toaster
    });
  }

}
