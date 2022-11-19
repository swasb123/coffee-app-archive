import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Coffee } from '../models/coffee.model';
import { getCoffee } from '../store/actions/coffee.action';
import { CoffeState } from '../store/reducers/coffee.reducer';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  coffees: Coffee[] = [];
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
  dataSource!: MatTableDataSource<any>;
  //paginator!: MatPaginator;

  @ViewChild(MatPaginator, { read: true }) paginator!: MatPaginator;

  constructor(private store: Store<CoffeState>) {
    this.getAllCoffees();
    //this.coffeeData$ = this.store.select(`coffees`);
    this.coffeeData$ = this.store.select((store) => store.coffees);
    console.log('this.coffeeData$ ', this.coffeeData$);

    this.dataSource = this.coffeeData$;

    if (this.dataSource != undefined) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngAfterViewInit(): void {
    if (this.dataSource != undefined) {
      this.dataSource.paginator = this.paginator;
    }
  }

  // applyFilter(event: Event) {
  //   let filterValue = (event.target as HTMLInputElement).value.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  //   this.dataSource.filter = filterValue;

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  getAllCoffees() {
    this.store.dispatch(getCoffee());
  }
}
