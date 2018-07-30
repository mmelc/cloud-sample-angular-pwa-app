import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeliveryClient, ItemResponses } from 'kentico-cloud-delivery';
import { Subscription } from 'rxjs';
import { GeolocationService } from '../services/geolocation.service';

import { PointOfInterest } from '../models/point_of_interest';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit, OnDestroy {
  dataSubscription: Subscription;
  pointsOfInterest: PointOfInterest[];

  constructor(
    private deliveryClient: DeliveryClient,
    private geolocationService: GeolocationService
  ) { }

  ngOnInit() {
    this.dataSubscription = this.deliveryClient
      .items<PointOfInterest>()
      .type('point_of_interest')
      .getObservable()
      .subscribe((response: ItemResponses.DeliveryItemListingResponse<PointOfInterest>) => {
        this.pointsOfInterest = response.items;
      });
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  openMap(pointOfInterest: PointOfInterest) {
    location.href = this.geolocationService
      .getMapLink(pointOfInterest.latitudeDecimalDegrees.value, pointOfInterest.latitudeDecimalDegrees.value);
  }
}


