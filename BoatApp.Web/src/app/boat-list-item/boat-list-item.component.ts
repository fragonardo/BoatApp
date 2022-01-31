import { Component, OnInit, Input } from '@angular/core';
import { Boat } from '../Models/Boat';

@Component({
  selector: 'app-boat-list-item',
  templateUrl: './boat-list-item.component.html',
  styleUrls: ['./boat-list-item.component.css']
})
export class BoatListItemComponent implements OnInit {

  @Input() boat!: Boat;
  constructor() { }

  ngOnInit(): void {
  }

}
