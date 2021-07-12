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
  productsDummy = [];
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
      //Faltatipo de pago
      tipoPago: "Visa",
      tipoDocumento: "Boleta",
      documentoIdentidad: "DNI",
      numeroDocumentoIdentidad: "",
      razonSocial: "",
    },
    articulosPago: [
      {
        cantidad: 1,
        id: "1",
      }
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

    //console.log(this.products$)
    console.log(JSON.parse(localStorage.getItem("product")))
    if(JSON.parse(localStorage.getItem("product")) != null){
      this.productsDummy.push(JSON.parse(localStorage.getItem("product")));
    }
    this.sumTotal();
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
    console.log(this.total)
  }

  abrirDialog(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
      width: "500px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.route.navigate(["/products"]);
    });
  }

  sendDataPago(){
    this.registroPago.articulosPago = this.productsDummy;
    let params = this.registroPago;
  }
}
