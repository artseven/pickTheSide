import { StarWarsService } from '../star-wars.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  characters = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private swService: StarWarsService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.characters = this.swService.getCharacters(params.side);
      }
    );
  }


}
