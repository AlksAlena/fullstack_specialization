import { Component, OnInit } from '@angular/core';
import { flyInOut, expand } from '../animations/app.animation';

import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {
	leaders: Leader[];
  leaderErrMess: string;

  constructor(private leaderService: LeaderService) { }

  ngOnInit() {
  	this.leaderService.getLeaders()
      .subscribe(
        leaders => this.leaders = leaders,
        errmess => this.leaderErrMess = <any>errmess
      );
  }

}
