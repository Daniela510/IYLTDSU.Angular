import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InviteService } from '../services/invite.service';
const { v4: uuidv4 } = require('uuid');

@Component({
  selector: 'app-x01',
  templateUrl: './x01.component.html',
  styleUrls: ['./x01.component.scss']
})
export class X01Component implements OnInit {
  public inviteLink: string = ''
  public content = '';
  public player: number[] = [];
  public opponent: number[] = [];
  public player_score: number = 501;
  public opponent_score: number = 501;
  public player_avg: number = 0;
  public opponent_avg: number = 0;
  constructor(
    private webSocketService: WebsocketService,
    private inviteService: InviteService,
    private route: ActivatedRoute,
    private router: Router) {
    webSocketService.messages.subscribe(msg => {
      console.log("Response from websocket");
      console.log(JSON.parse(msg.message));
      if (JSON.parse(msg.message).action == "x01/score-updated") {
        if (sessionStorage.getItem("playerId") == JSON.parse(msg.message).message.split('#')[0]) {
          this.player.push(JSON.parse(msg.message).message.split('#')[1]);
          this.player_score -= JSON.parse(msg.message).message.split('#')[1];
          const result = this.player.reduce((accumulator, current) => {
            return accumulator + current;
          }, 0);
          this.player_avg = result / this.player.length;
        } else {
          this.opponent.push(JSON.parse(msg.message).message.split('#')[1]);
          this.opponent_score -= JSON.parse(msg.message).message.split('#')[1]
          const result = this.opponent.reduce((accumulator, current) => {
            return accumulator + current;
          }, 0);
          this.opponent_avg = result / this.opponent.length;
        }
      }
    })
  }

  ngOnInit(): void {
    this.inviteLink = this.inviteService.getInviteUrl();
    console.log();
  }

  getInviteLink() {
    console.log(this.inviteService.getInviteUrl());
  }

  sendScore(input?: number) {
    let body = {
      action: 'x01/score',
      message: `${this.route.snapshot.params["roomId"]}#${sessionStorage.getItem('playerId')}#${this.player_score}#${input}`
    }
    this.webSocketService.messages.next(body)
  }
}
