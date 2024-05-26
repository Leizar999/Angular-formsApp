import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidatorService implements AsyncValidator {

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;

    const httpCallObservable = new Observable<ValidationErrors | null>( (subscriber) => {
      console.log({ email });

      if ( email === 'leizar@google.com' ) {
        subscriber.next({ emailTaken: true });
        subscriber.complete();
      }

      subscriber.next(null);
      subscriber.complete();
    }).pipe(
      delay(2000)
    )

    return httpCallObservable;
  }

  // validate(control: AbstractControl): Observable<ValidationErrors | null> {
  //   const email = control.value;

  //   console.log({ email })

  //   return of({
  //     emailTaken: true
  //   }).pipe(
  //     delay( 2000 )
  //   )
  // }

  // The following is just an example of how it would look with a BE DB
  // return this.http.get<any[]>(`http://localhost:3000/useres?q=${ email }`)
  //   .pipe(
  //     map( resp => {
  //       return ( resp.lenght === 0 )
  //         ? null
  //         : { emailTaken: true }
  //     })
  //   );

}
