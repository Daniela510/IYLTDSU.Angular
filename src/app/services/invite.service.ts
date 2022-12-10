import { Injectable } from "@angular/core";

@Injectable()
export class InviteService {
    getInviteUrl(): string {
        return window.location.href
    }
}