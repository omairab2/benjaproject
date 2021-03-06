import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input()
  categorias: Categoria[];

  @Input()
  marcas: Marca[];

  @Input()
  tipos: Tipo[];

  // @Input()
  // customFilters: any[];

  // @Input()
  // priceFilters: any[];

  @Output()
  filterChange = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  // reset(customFilters, priceFilters) {
  //   this.customFilters = customFilters;
  //   this.priceFilters = priceFilters;
  //   this.showFilters = false;
  //   setTimeout(() => {
  //     this.showFilters = true;
  //   });
  // }

  onInputChange($event, filter, type) {
    const change = $event.target.checked ? 1 : -1;
    this.filterChange.emit({
      type: type,
      filter: filter,
      isChecked: $event.target.checked,
      change: change
    });
  }
}

export interface Categoria{
  id: number;
  descripcion: string;
  checked: boolean;
}

export interface Marca{
  id: number;
  descripcion: string;
  checked: boolean;
}
export interface Tipo{
  id: number;
  descripcion: string;
  checked: boolean;
}