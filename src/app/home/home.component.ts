import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Coffee } from '../models/coffee.model';
import { getCoffee } from '../store/actions/coffee.action';
import { CoffeState } from '../store/reducers/coffee.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  coffees: Coffee[] = [];
  coffeeData$: any;

  constructor(private store: Store<CoffeState>) {}

  ngOnInit(): void {
    this.getAllCoffees();
    this.coffeeData$ = this.store.select(`coffees`);
    console.log(this.coffeeData$);
  }

  getAllCoffees() {
    this.store.dispatch(getCoffee());
  }
}
