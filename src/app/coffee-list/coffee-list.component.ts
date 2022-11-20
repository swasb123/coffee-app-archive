import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Coffee } from '../models/coffee.model';
import { select, Store } from '@ngrx/store';
import { CoffeState } from '../store/reducers/coffee.reducer';
import { coffeeSelector } from '../store/selector/coffee.selector';

@Component({
  selector: 'app-coffee-list',
  templateUrl: './coffee-list.component.html',
  styleUrls: ['./coffee-list.component.css'],
})
export class CoffeeListComponent implements OnInit {
  coffeeData$: any;
  displayedColumns = [
    'id',
    'uid',
    'blend_name',
    'origin',
    'variety',
    'notes',
    'intensifier',
  ];
  dataSource!: MatTableDataSource<Coffee>;

  @ViewChild(MatPaginator, { static: true })
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }

  constructor(private store: Store<CoffeState>) {}

  ngOnInit(): void {
    this.coffeeData$ = this.store.pipe(select(coffeeSelector));
    console.log('this.coffeeData$ ', this.coffeeData$);

    this.dataSource = this.coffeeData$;
  }
}
