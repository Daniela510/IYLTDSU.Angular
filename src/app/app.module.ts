import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './login/login.component';
import { CarouselComponent } from './login/carousel/carousel.component';
import { MainComponent } from './login/main/main.component';
import { AcceptTocComponent } from './login/main/accept-toc/accept-toc.component';
import { X01Component } from './x01/x01.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LobbyComponent } from './lobby/lobby.component';
import { WebsocketService } from './services/websocket.service';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CarouselComponent,
    MainComponent,
    AcceptTocComponent,
    X01Component,
    LobbyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AmplifyAuthenticatorModule
  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
