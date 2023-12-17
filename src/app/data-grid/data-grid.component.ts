import { AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Roadwork } from "@model/roadwork";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { ParkingLorry } from "@model/lorry-parking";
import { Closure } from "@model/closure";
import { Warning } from "@model/warning";

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('22ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class DataGridComponent implements AfterViewInit {
  private _elementData: Roadwork[] | ParkingLorry[] | Closure[] | Warning[] = [];

  @Input() set ELEMENT_DATA(data: Roadwork[] | ParkingLorry[] | Closure[] | Warning[]) {
    this._elementData = data;
    this.dataSource = new MatTableDataSource<Roadwork | ParkingLorry | Closure | Warning>(this._elementData);
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  get ELEMENT_DATA(): Roadwork[] | ParkingLorry[] | Closure[] | Warning[] {
    return this._elementData;
  }

  displayedColumns: string[] = ['act', 'title', 'subtitle', 'startTimestamp'];
  dataSource = new MatTableDataSource<Roadwork | ParkingLorry | Closure | Warning>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  expandedElement: Roadwork | ParkingLorry | Closure | Warning | null | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this?.dataSource ? this?.paginator : null;
  }
}
