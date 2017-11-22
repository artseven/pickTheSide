import { StarWarsService } from '../star-wars.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  characters = [];
  chosenList = 'all';
  constructor(
    private starWarsSrv: StarWarsService
  ) { }

  ngOnInit() {
  }

  onChoose(side) {
    this.chosenList = side;
  }

  getCharacters() {
    this.characters = this.starWarsSrv.getCharacters(this.chosenList);
    return this.characters;
  }
}
