import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'; 
import { CargoService } from '../../services/cargo.service';
import { TrabajadorService } from '../../services/trabajador.service';
import Swal from "sweetalert2";
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',

})
export class DialogComponent implements OnInit {
  forma = new FormGroup({

  });
  dataSource = [];
  numeroDat: number
  salario: number = 100;
  cargo: any[] = []


  constructor(public dialog: MatDialog, private fb: FormBuilder,
     private cargoService: CargoService, 
     private trabajadorService: TrabajadorService, 
     private router: Router,
     public dialogRef: MatDialogRef<DialogComponent>) {
    this.crearFormulario();
  }

  formatLabel(value: number) {

    if (value >= 1000) {
      this.numeroDat = Math.round(value)
      // console.log(this.numeroDat)
      return Math.round(value / 1000) + 'k';
    }

    return this.numeroDat;
  }


  ngOnInit(): void {
    this.cargoService.getCargo().subscribe((data: any[]) => {
      this.cargo = data['cargo']
      this.cargo.unshift({
        nombre: '[Seleccione cargo]',
        codigo: ''
      })
    });

    this.getTrabajador()

  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }
  get apellidoNoValido() {
    return this.forma.get('apellidos').invalid && this.forma.get('apellidos').touched
  }
  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }

  updateSetting(event) {
    this.salario = event.value;
    console.log(this.forma.value.apellidos)
    this.forma.reset({
      nombre: this.forma.value.nombre,
      apellidos: this.forma.value.apellidos,
      correo: this.forma.value.correo,
      salario: this.salario,
      cargo: this.forma.value.cargo

    })
  }
  crearFormulario() {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellidos: ['', [Validators.required, Validators.minLength(5)]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      cargo: ['', Validators.required],
      salario: ['0',]
    })
  }
  guardar() {
    if (this.forma.invalid) {

      return Object.values(this.forma.controls).forEach(control => {

        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
   
    this.trabajadorService.postTrabajadore(this.forma.value).subscribe(data => { 
      Swal.fire(
        'Registrado!',
        'se registro correctamente.',
        'success'
      )
    })

    
    setTimeout(() => {
      this.getTrabajador()
    }, 100); 
    this.dialogRef.close();
  }

  ///
  getTrabajador() {
    this.trabajadorService.getTrabajador().subscribe((data: any[]) => {
     // this.dataSource=[]
      this.dataSource = data['trabajador'];

    })
  }
 
}
