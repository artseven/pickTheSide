import { Subscription } from 'rxjs/subscription';
import { StarWarsService } from '../star-wars.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  characters = [];
  loadedSide = 'all';
  subscription: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private swService: StarWarsService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.characters = this.swService.getCharacters(params.side);
        this.loadedSide = params.side;
      }
    );
    this.subscription = this.swService.charactersChanged.subscribe(
      () => {
        this.characters = this.swService.getCharacters(this.loadedSide);
      }
    );
  }

  ngOnDestroy() {
    // remove subscription when component is destroyed
    this.subscription.unsubscribe();

  }
}
