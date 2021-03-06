import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  previousSearch: string;

  animatePlop = false;

  showSearch = true;

  @Output()
  searchChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.previousSearch = '';
  }

  /*
    This event will emit an object indicating the new search term, and:
      -1 if the search term length has descreased
      1 if the search term length has increased
      0 if the search term remained equal
  */
  private onSearchKeyup(event: Event) {
    let change = 0;

    const filterValue = (event.target as HTMLInputElement).value;

    if (filterValue.length > this.previousSearch.length) {
      change = 1;
    } else if (filterValue.length < this.previousSearch.length) {
      change = -1;
    }
    this.previousSearch = filterValue;
    if (change !== 0) {
      this.searchChange.emit(filterValue);
    }
  }

  // Perform a plop animation on the search icon. This animation is executed on keydown just for visual reasons
  plop() {
    this.animatePlop = true;
    setTimeout(() => {
      this.animatePlop = false;
    }, 110);
  }

  reset() {
    this.showSearch = false;
    setTimeout(() => {
      this.showSearch = true;
    });
  }
}
