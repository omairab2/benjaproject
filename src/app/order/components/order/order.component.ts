import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Product } from "./../../../core/models/product.model";
import { CartService } from "./../../../core/services/cart.service";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.scss"],
})
export class OrderComponent implements OnInit {
  products$: Observable<Product[]>;
  total: any;
  productsDummy = [
    {
      id: 1,
      cantidad: 1,
      stock: 10,
      precio: 89.9,
      marca: "Adidas",
      descripcion: "Polo Adidas Hombre Talla S",
      categoriaId: "1",
      img: "https://imgvendefacil.blob.core.windows.net/imagenes/imagen-6.jpg",
    },
    {
      id: 2,
      cantidad: 1,
      stock: 10,
      precio: 89.9,
      marca: "Adidas",
      descripcion: "Polo Adidas Hombre Talla S",
      categoriaId: "1",
      img: "https://imgvendefacil.blob.core.windows.net/imagenes/imagen-6.jpg",
    },
    {
      id: 3,
      cantidad: 3,
      stock: 10,
      precio: 89.9,
      marca: "Adidas",
      descripcion: "Polo Adidas Hombre Talla S",
      categoriaId: "1",
      img: "https://imgvendefacil.blob.core.windows.net/imagenes/imagen-6.jpg",
    },
  ];
  registroPago: any = {
    datosDireccion: {
      nombre: "",
      apellidos: "",
      direccion: "",
      informacionAdicional: "",
      departamento: "Lima",
      provincia: "Lima",
      ciudad: "Lima",
      pais: "Peru",
      telefono: "",
    },
    datosPago: {
      //tipo de pago
      tipoPago: "Efectivo",
      tipoDocumento: "Boleta",
      documentoIdentidad: "DNI",
      numeroDocumentoIdentidad: "",
      razonSocial: "",
    },
    articulosPago: [
      {
        cantidad: 1,
        codArticulo: "sl-001",
      },
      {
        cantidad: 2,
        codArticulo: "sl-002",
      },
      {
        cantidad: 3,
        codArticulo: "sl-003",
      },
      {
        cantidad: 4,
        codArticulo: "sl-004",
      },
    ],
  };
  resultadoPago: any = {
    resultado: true,
    mensaje: "|Pago completado correctamente.",
    montosPago: {
      montoSinIGV: 100.0,
      montoIGV: 18.0,
      montoNeto: 118.0,
      tipoDocuPago: "BV",
      numeroDocuPago: 12345678,
      numeroPedido: 12354,
      fechaDocumento: "09/07/2021 18:36:00",
    },
    errores: [],
  };

  constructor(
    private cartService: CartService,
    public dialog: MatDialog,
    private route: Router
  ) {
    this.products$ = this.cartService.cart$;
  }

  ngOnInit() {
    this.sumTotal();
    console.log(this.products$)
  }

  deleteItem(id) {
    this.productsDummy = this.productsDummy.filter(function (item) {
      return item.id !== id;
    });
    this.sumTotal();
  }

  sumTotal() {
    this.total = 0;
    var array = [];
    this.productsDummy.forEach((element) => {
      array.push(element.precio * element.cantidad);
    });
    this.total = array.reduce((a, b) => a + b, 0);
  }

  abrirDialog(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
      width: "500px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.route.navigate(["/products"]);
    });
  }
}
