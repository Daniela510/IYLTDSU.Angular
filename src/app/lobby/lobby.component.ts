import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from '../app/app.component';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  public players: IPlayer[] = []
  public player!: IPlayer
  constructor(private webSocketService: WebsocketService) {
    webSocketService.messages.subscribe(msg => {
      console.log("Response from websocket");
      console.log(JSON.parse(msg.message));
      if (JSON.parse(msg.message).action == "room/joined") {
        this.players.push({id: JSON.parse(msg.message).message })
      }
      if (JSON.parse(msg.message).action == "lobby/joined") {
        var playerIds: string[] = JSON.parse(msg.message).message;
        playerIds.forEach(x=>this.players.push({id: x}))
      }
    })
  }
  ngOnInit(): void {
    var playerId = sessionStorage.getItem("playerId");
    if (!isNullOrUndefined(playerId)) {
      this.player = {
        id: playerId!,
      }
    }
  }

  joinLobby() {
    this.players.push(this.player)
    this.webSocketService.messages.next({action: "rooms/join", message: `lobby#${this.player.id}`})
  }

  createPlayerRoom() {
    this.webSocketService.messages.next({action: "rooms/create", message: this.player.id})
  }
}

export interface IPlayer {
  id: string
}