import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SecurityService } from '../../../services/security.service';
import {Security} from '../../../models/Security';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
// import Chart from 'chart.js';

@Component({
  selector: 'app-security-details',
  templateUrl: './security-details.component.html',
  styleUrls: ['./security-details.component.css']
})
export class SecurityDetailsComponent implements OnInit {
  // @ViewChild('donut') donut: ElementRef;
  security: Security;
  form: FormGroup; // exporting the form
  showEdit = false;
  selectedPriceId = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private securityService: SecurityService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {

      if (params) {
        // params.id
        this.securityService.getOneSecurity(params.id).subscribe((security: Security) => {
          // todo view loads first, then data ready. need opposite
          this.security = security;
        }, errRep => {
          console.log('Error security details' + errRep); // toaster
        });

      } else {
        // todo could to toaster message
        console.log('Must provide id of security in URL');
      }

    }, (err) => {
      console.log('Error getting id of security from URL');
    });

    // const donutCtx = this.donut.nativeElement.getContext('2d');
    //
    // const data = {
    //   labels: [
    //     'Value A',
    //     'Value B'
    //   ],
    //   datasets: [
    //     {
    //       data: [101342, 55342],   // Example data
    //       backgroundColor: [
    //         '#1fc8f8',
    //         '#76a346'
    //       ]
    //     }]
    // };
    //
    // const chart = new Chart(
    //   donutCtx,
    //   {
    //     type: 'line',
    //     'data': data,
    //     options: {
    //       'cutoutPercentage': 50,
    //       'animation': {
    //         'animateScale': true,
    //         'animateRotate': false
    //       }
    //     }
    //   }
    // );

  }

  deletePrice(id: number) { // todo reload lists after delete. sec and prices.
    this.securityService.deleteOnePrice(id).subscribe( // todo toaster
      resp => {
        console.log(`Success: ${resp}`);
      }, err => {
        console.log(`Failure: ${err}`);
      }
    );
  }

  // Forms
  createForm() {
    this.form = this.formBuilder.group({
      date: ['', Validators.compose([Validators.required])],
      endDayPrice: ['', Validators.compose([Validators.required])]
    });
  }

  // todo can have loading screen stuff

  // disableForm() {
  //   this.form.controls['securityName'].disable();
  //   this.form.controls['isin'].disable();
  //   this.form.controls['country'].disable();
  // }
  //
  // enableForm() {
  //   this.form.controls['securityName'].enable();
  //   this.form.controls['isin'].enable();
  //   this.form.controls['country'].enable();
  // }

  onRegisterSubmit() {
    // this.disableForm();

    const price = {
      date: this.form.get('date').value,
      endDayPrice: this.form.get('endDayPrice').value,
      securityId: this.security.id
    };

    this.securityService.createPrice(price).subscribe( // toaster, todo need to check for unique!
      succResp => { // todo success not being read properly. because of srtatus parsing
        console.log(succResp);
      }, errResp => {
        console.log(errResp);
      }
    );

    this.form.reset();
  }

  editPrice(price) {
    this.form.reset();

    this.form.patchValue({date: price.date});
    this.form.patchValue({endDayPrice: price.endDayPrice});


    document.getElementById('openCollapse').click();

    this.showEdit = true;
    this.selectedPriceId = price.id;
  }

  submitEdit() {
    console.log(this.selectedPriceId + '  ' + this.form.get('date').value);

    const price = {
      id: this.selectedPriceId,
      date: this.form.get('date').value,
      endDayPrice: this.form.get('endDayPrice').value
    };

    this.securityService.updatePrice(price).subscribe( // toaster, todo need to check for unique!
      succResp => {
        console.log(succResp);
      }, errResp => {
        console.log(errResp);
      }
    );

    this.form.reset();
    document.getElementById('openCollapse').click();
  }

  // TODO next at least have collapsible form, both sec + prices. Passable Input(patch), or button(POST).

}
