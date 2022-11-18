import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmptyError } from 'rxjs';
import { catchError, concatMap, exhaustMap, map, tap } from 'rxjs/operators';
import { CoffeeService } from 'src/app/service/coffee.service';
import { getCoffee, getCoffeeSuccess } from '../actions/coffee.action';

@Injectable()
export class CoffeeEffect {
  loadCoffee$ = createEffect(() =>
    this.action$.pipe(
      ofType(getCoffee),
      exhaustMap(() =>
        this.coffeService.getCoffee().pipe(
          map((coffees) => getCoffeeSuccess(coffees)),
          catchError(() => EmptyError)
        )
      )
    )
  );

  constructor(private action$: Actions, private coffeService: CoffeeService) {}
}
