import { StarWarsService } from '../star-wars.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() character;

  constructor(
    private starWarsSrv: StarWarsService
  ) { }

  ngOnInit() {
  }

  onAssign(side) {
    // this.character.side = side;
    // this.sideAssigned.emit({name: this.character.name, side: side});
    this.starWarsSrv.onSideChosen({ name: this.character.name, side: side});
  }
}
