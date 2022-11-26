import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
const { v4: uuidv4 } = require('uuid');

@Component({
  selector: 'app-x01',
  templateUrl: './x01.component.html',
  styleUrls: ['./x01.component.scss']
})
export class X01Component implements OnInit {
  public content = '';
  public received: any[] = [];
  public sent: any[] = [];
  public defaults: number[] = [26, 41, 45, 60, 85, 100]
  constructor(private webSocketService: WebsocketService, private route: ActivatedRoute, private router: Router) {
    webSocketService.messages.subscribe(msg => {
      this.received.push(msg);
      console.log("Response from websocket");
      console.log(JSON.stringify(msg));
    })
   }

  ngOnInit(): void {
    
  }

  onJoin() {
    let message = { action: 'rooms/create', message: this.route.snapshot.params["roomId"].toString() }
    this.webSocketService.messages.next(message)
  }
  sendMsg(value?: string) {
    console.log(this.route.snapshot.params["roomId"])
    let message = {
      action: '',
      message: ''
    }

    message.action = 'sendmessage'
    message.message = value ?? this.content;

    this.sent.push(message)
    this.webSocketService.messages.next(message)
  }

  buttonPressed(value: number) {
    this.sendMsg(value.toString())
  }
}
