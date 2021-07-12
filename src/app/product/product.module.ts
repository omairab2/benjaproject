import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsComponent } from './components/products/products.component';

import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from './../shared/shared.module';
import { MaterialModule } from './../material/material.module';

import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FiltersComponent } from '../filters/filters.component';
import { SortFiltersComponent } from '../sort-filters/sort-filters.component';

import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatRadioModule,
  MatListModule,
  } from '@angular/material';

  import { MatCheckboxModule } from '@angular/material/checkbox';

  import { registerLocaleData } from '@angular/common';
  import localeDeAt from '@angular/common/locales/es-PE';

  registerLocaleData(localeDeAt);

@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailComponent,
    ProductsComponent,
    SearchBarComponent,
    FiltersComponent,
    SortFiltersComponent
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatListModule
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es_PE'
    }
  ],
})
export class ProductModule {

}
