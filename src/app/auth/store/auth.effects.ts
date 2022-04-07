import {Actions, ofType} from "@ngrx/effects";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";

import * as AuthActions from "./auth.actions";
import {catchError, map, switchMap} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {AuthResponseData} from "../auth.service";


export class AuthEffects {
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }
        ).pipe(catchError(error => {
            // ...
            of();
          }), map(resData => {
            of();
          })
        );
    }),
  );

  constructor(private actions$: Actions,
              private http: HttpClient) {
  }
}
