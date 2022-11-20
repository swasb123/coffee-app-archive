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
  coffeeData$: any = [];
  displayedColumns = [
    'id',
    'uid',
    'blend_name',
    'origin',
    'variety',
    'notes',
    'intensifier',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;

  constructor(private store: Store<CoffeState>) {}

  ngOnInit(): void {
    this.store.pipe(select(coffeeSelector)).subscribe((data) => {
      this.coffeeData$ = data;
      this.dataSource = new MatTableDataSource<any>(this.coffeeData$);
      if (this.matPaginator) {
        this.dataSource.paginator = this.matPaginator;
      }
    });
  }
}
