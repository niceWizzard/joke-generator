import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewChildren} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { JokeHttpService} from 'src/app/services/joke-http-service/joke-http.service';
import {TwoPartJoke,Joke, SingleJoke, getJokeString} from '../../misc/joke.model';
import { Title } from '@angular/platform-browser';
import { MetaService } from 'src/app/services/meta-services/meta.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  jokeString!: string | null | undefined;
  joke!: Joke;

  jokeSuscription!: Subscription;
  
  constructor(private httpService : JokeHttpService, private _metaService : MetaService ) {}


  ngOnDestroy(): void {
    this.jokeSuscription.unsubscribe();
  }


  ngOnInit(): void {
    this.getNewJoke();
    this._metaService.updateTitle('Home');
  }

  private getNewJoke() {
    this.jokeString = null;
    let joke: Observable<Joke>;

    let random = Math.random();
    
    if(random > 0.5) {
      joke = this.httpService.getSingleJoke();
    } else {
      joke = this.httpService.getTwoPartJoke();
    }
    


    this.jokeSuscription = joke.subscribe((val) => {
      this.jokeString = getJokeString(val) || 'Error';
      this.joke = val;
    });

    
  }

  handleClick(){
    this.getNewJoke();
    


  }
  


}
