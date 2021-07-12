import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from './../../../core/models/product.model';
import { ProductsService } from './../../../core/services/products/products.service';

import { FiltersComponent } from '../../../filters/filters.component';
import { SearchBarComponent } from '../../../search-bar/search-bar.component';

import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productsAll: Product[] = [];
  products: Product[] = [];
  loading: boolean = false;

  @ViewChild('filtersComponent', {static: false})
  filtersComponent: FiltersComponent;

  @ViewChild('searchComponent', {static: false})
  searchComponent: SearchBarComponent;

  dataCategorias: any[] = [
    { id: 0, descripcion: "Todos", checked: true},
    { id: 1, descripcion: "Polos", checked: false},
    { id: 2, descripcion: "Pantalones", checked: false},
    { id: 3, descripcion: "Zapatillas", checked: false},
    { id: 4, descripcion: "Casacas", checked: false}
  ];

  dataMarcas: any[] = [
    { id: 0, descripcion: "Todos", checked: true},
    { id: 2, descripcion: "Varios", checked: false},
    { id: 1, descripcion: "Adidas", checked: false},
    { id: 3, descripcion: "Dssquared", checked: false},
    { id: 4, descripcion: "Reebook", checked: false},
  ];

  dataTipos: any[] = [
    { id: 0, descripcion: "Todos", checked: true},
    { id: 1, descripcion: "Prendas de vestir", checked: false},
    { id: 2, descripcion: "Electrodomésticos", checked: false},
    { id: 3, descripcion: "Tecnología", checked: false},
    { id: 4, descripcion: "Abarrotes", checked: false}
  ];

  // priceFilters: any[] = [
  //   { name: 'Todo', value: 'all', checked: true },
  //   { name: 'Precio > 30.000', value: 'more_30000', checked: false },
  //   { name: 'Precio < 10.000', value: 'less_10000', checked: false }
  // ];

  filterValues = {
    cat: 0,
    marca: 0,
    tipo: 0
  };

  constructor(private productsService: ProductsService){

  }

  ngOnInit() {
    this.fetchProducts();
  }

  clickProduct(id: number) {
    console.log('product');
    console.log(id);
  }

  fetchProducts() {
    this.loading = true;
    this.productsService.getAllProducts().subscribe(
      products => {
        this.productsAll = products;
        this.products = this.productsAll;
        this.loading = false;
    }, error =>{
      console.log("error",error);
      this.loading = false;
    });
  }

  onFilterChange(event){

    if(event.type == "category"){
      this.filterValues.cat = Number(event.filter.id);
    } else if(event.type == "mark"){
      this.filterValues.marca = event.filter.id;
    } else if(event.type == "type"){
      this.filterValues.tipo = event.filter.id;
    }

    this.products = this.productsAll.filter(
      data  =>
        Number(data.categoriaId) === (this.filterValues.cat == 0 ? Number(data.categoriaId) : this.filterValues.cat) &&
        data.marcaId === (this.filterValues.marca == 0 ? data.marcaId : this.filterValues.marca) &&
        data.tipoId === (this.filterValues.tipo == 0 ? data.tipoId : this.filterValues.tipo)
    );
  }

  sortProducts(){
  }

  onSearchChange(filterValue: string){
    this.products = this.productsAll;
    let dataSource = new MatTableDataSource(this.products);
    dataSource.filter = filterValue.trim().toLowerCase();
    this.products = dataSource.filteredData;
  }

}
