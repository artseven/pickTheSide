import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
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
    this.http.get('https://swapi.co/api/people/')
    .map((response: Response) => {
      const data = response.json();
      const extractedChars = data.results;
      // change the array so it matches our schema of character
      const chars = extractedChars.map((char) => {
        return { name: char.name , side: ''};
      });
      return chars;
    })
    .subscribe(
      (data) => {
        console.log(data);
        this.characters = data;

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
