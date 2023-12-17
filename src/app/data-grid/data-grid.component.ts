import { AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { RoadEvent } from "@model/shared";

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
  private _elementData: RoadEvent[] = [];

  @Input() set ELEMENT_DATA(data: RoadEvent[]) {
    this._elementData = data;
    this.dataSource = new MatTableDataSource<RoadEvent>(this._elementData);
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  get ELEMENT_DATA(): RoadEvent[] {
    return this._elementData;
  }

  displayedColumns: string[] = ['act', 'title', 'subtitle', 'isBlocked', 'startTimestamp'];
  columnHeaders: {
    [key: string]: string
  } = {'act': 'act', 'title': 'Title', 'subtitle': 'Subtitle', 'isBlocked': 'Is Blocked', 'startTimestamp': 'Date'};
  dataSource = new MatTableDataSource<RoadEvent>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  expandedElement: RoadEvent | null | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this?.dataSource ? this?.paginator : null;
  }
}
