import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SecurityService } from '../../../services/security.service';
import {Security} from '../../../models/Security';
// import Chart from 'chart.js';

@Component({
  selector: 'app-security-details',
  templateUrl: './security-details.component.html',
  styleUrls: ['./security-details.component.css']
})
export class SecurityDetailsComponent implements OnInit {
  // @ViewChild('donut') donut: ElementRef;
  security: Security;

  constructor(
    private activatedRoute: ActivatedRoute,
    private securityService: SecurityService
  ) { }

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

}
