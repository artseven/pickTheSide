import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { LogService } from './log.service';
import { Injectable } from '@angular/core';


@Injectable()
export class StarWarsService {
  private characters = [
    { name: 'Luke Skywalker', side: ''},
    { name: 'Darth Vader', side: ''},
    { name: 'Kylo Ren', side: ''},
    { name: 'Yoda', side: ''}
  ];
  charactersChanged = new Subject<void>();
  constructor(
    private logSrv: LogService,
    private http: Http
  ) {}

  getCharacters(chosenList) {
    if (chosenList === 'all') {
      return this.characters.slice();
    }
    return this.characters.filter((char) => {
      return char.side === chosenList;
    });
  }

  fetchCharacters() {
    this.http.get('https://swapi.co/api/people/').subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }

  onSideChosen(charInfo) {
    const pos = this.characters.findIndex((char) => {
      return char.name === charInfo.name;
    });
    this.characters[pos].side = charInfo.side;
    // because Subject
    this.charactersChanged.next();
    this.logSrv.writeLog('Changed side of ' + charInfo.name + ', new side: ' + charInfo.side);
  }

  addCharacter(name, side) {
    const pos = this.characters.findIndex((char) => {
      return char.name === name;
    });
    if (pos !== -1) {
      return;
    }
    const newChar = {name: name, side: side};
    this.characters.push(newChar);
  }
}
