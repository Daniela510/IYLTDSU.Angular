import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFormFields } from '@aws-amplify/ui';
import { Auth, I18n } from 'aws-amplify';
const { v4: uuidv4 } = require('uuid');
const authScreenLabels = {
  nl: {
    'Change Password': 'wachtwoord wijzigen',
    'Sign in': 'aanmelden',
    'Forgot your password?': 'Wachtwoord vergeten?',
    'Send Code': 'wachtwoord herstellen',
    'Back to Sign In': 'Terug naar aanmeldingsscherm',
    'Reset your password': '',
    'Resend Code': 'Code opnieuw versturen',
    'Your passwords must match': 'De wachtwoorden komen niet overeen',
    'Incorrect username or password.': 'Ongeldige gebruikersnaam en/of wachtwoord',
  },
};
I18n.setLanguage('en');
I18n.putVocabularies(authScreenLabels);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private roomId?: string | null;
  private playerId?: string | null;

  constructor(private router: Router) {

  }
  ngOnInit(): void {

    this.playerId = uuidv4();
    sessionStorage.setItem("playerId", this.playerId!)

    this.roomId = sessionStorage.getItem("roomId")
    if (!isNullOrUndefined(this.roomId)) {
      this.router.navigate(['x01', this.roomId])
    }
    this.router.navigate(['lobby'])
  }
  title = 'IYLTDSU.Angular';
  public signOut(): void {
    Auth.signOut({ global: true });
  }
  public signInFormFields: AuthFormFields = {
    signIn: {
      username: {
        isRequired: true,
        autocomplete: 'email',
        labelHidden: true,
        order: 1,
        placeholder: 'E-mailadres',
      },
      password: {
        isRequired: true,
        labelHidden: true,
        order: 2,
        placeholder: 'Password',
      },
    },
    forceNewPassword: {
      password: {
        isRequired: true,
        labelHidden: true,
        order: 2,
        placeholder: 'Password',
      },
      confirm_password: {
        isRequired: true,
        labelHidden: true,
        order: 2,
        placeholder: 'Confirm password',
      },
    },
    confirmResetPassword: {
      confirmation_code: {
        isRequired: true,
        autocomplete: 'email',
        labelHidden: true,
        order: 1,
        placeholder: 'Receive code',
      },
      password: {
        isRequired: true,
        labelHidden: true,
        order: 2,
        placeholder: 'Password',
      },
      confirm_password: {
        isRequired: true,
        labelHidden: true,
        order: 2,
        placeholder: 'Confirm password',
      },
    },
    resetPassword: {
      username: {
        isRequired: true,
        autocomplete: 'email',
        labelHidden: true,
        order: 1,
        placeholder: 'E-mailadres',
      },
    },
  };
}



export function isNullOrUndefined(value: any): boolean {
  return value == null || value == undefined
}