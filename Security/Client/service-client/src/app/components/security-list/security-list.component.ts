import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { SecurityService } from '../../services/security.service';
import {Security} from '../../models/Security';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-security-list',
  templateUrl: './security-list.component.html',
  styleUrls: ['./security-list.component.css'],
  providers: [SecurityService]
})
export class SecurityListComponent implements OnInit {
  // todo [2X]Sec+SecPrice -need forms for POST/PATCH.
  securitiesList: Security[];
  form: FormGroup; // exporting the form
  showEdit = false;
  selectedSecurityId = null;
  // @ViewChild('clicked') clicked: ElementRef;

  constructor(
    private securityService: SecurityService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    // todo could add toasters for err/succ
    this.securityService.getSecurities().subscribe((securityList: Security[]) => {
      this.securitiesList = securityList;
    }, errRep => {
      console.log('Error getting all sec' + errRep); // toaster
    });
  }

  // Forms
  createForm() {
    this.form = this.formBuilder.group({
      securityName: ['', Validators.compose([ // compose allows array of validators
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(25), // todo extend this in front/back
        ])],
      isin: ['', Validators.compose([
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(12),
        ])],
      country: ['', Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(25)
        ])]
      });
  }

  disableForm() {
    this.form.controls['securityName'].disable();
    this.form.controls['isin'].disable();
    this.form.controls['country'].disable();
  }

  enableForm() {
    this.form.controls['securityName'].enable();
    this.form.controls['isin'].enable();
    this.form.controls['country'].enable();
  }

  onRegisterSubmit() {
    // this.disableForm();

    const security = {
      securityName: this.form.get('securityName').value,
      isin: this.form.get('isin').value,
      country: this.form.get('country').value
    };

    this.securityService.createSecurity(security).subscribe( // toaster, todo need to check for unique!
      succResp => {
        console.log(succResp);
      }, errResp => {
        console.log(errResp);
      }
    );

    this.form.reset();
  }

  editSecurity(security) {
    this.form.reset();

    this.form.patchValue({securityName: security.securityName});
    this.form.patchValue({isin: security.isin});
    this.form.patchValue({country: security.country});

    document.getElementById('openCollapse').click();

    this.showEdit = true;
    this.selectedSecurityId = security.id;
  }

  submitEdit() {
    console.log(this.selectedSecurityId);

    const security = {
      id: this.selectedSecurityId,
      securityName: this.form.get('securityName').value,
      isin: this.form.get('isin').value,
      country: this.form.get('country').value
    };

    this.securityService.updateSecurity(security).subscribe( // toaster, todo need to check for unique!
      succResp => {
        console.log(succResp);
      }, errResp => {
        console.log(errResp);
      }
    );

    this.form.reset();
  }
}
