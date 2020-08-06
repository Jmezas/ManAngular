import { Component, OnInit } from '@angular/core';
import { CargoService } from '../../services/cargo.service';
import { TrabajadorService } from '../../services/trabajador.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import  Swal from "sweetalert2";
@Component({
  selector: 'app-editar-trabajador',
  templateUrl: './editar-trabajador.component.html',
  styleUrls: ['./editar-trabajador.component.css']
})
export class EditarTrabajadorComponent implements OnInit {
  forma = new FormGroup({});
  cargo: any[] = []
  trabajador: any = {}

  numeroDat: number
  salario: number = 100;
  idtr: number
  constructor(private fb: FormBuilder, private cargoService: CargoService, private trabajadorService: TrabajadorService, private route: ActivatedRoute) {
    this.crearFormulario();
    //this.cargarDataAlFormulario()
    this.route.params.subscribe(params => {
      this.getrabajador(params['id'])
      this.idtr = params['id']
      
    });
    setTimeout(() => {
      this.cargarDataAlFormulario()
    }, 200);
    
   
  }

  formatLabel(value: number) {
 
    if (value >= 1000) {
      this.numeroDat = Math.round(value)
      //console.log(this.numeroDat)
      return Math.round(value / 1000) + 'k';
    }
    console.log(value)
    return value;
  }
  updateSetting(event) {
    this.salario = event.value;
    this.forma.reset({ 
      nombre:this.trabajador['nombre'],
      apellidos: this.trabajador['apellidos'],
      correo:this.trabajador['correo'],
      salario:this.salario,
      cargo:this.trabajador['cargo']
    })
  }
  ngOnInit(): void {
    this.cargoService.getCargo().subscribe((data: any[]) => {
      this.cargo = data['cargo']

    })
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

  //cargar el formulario
  crearFormulario() {
    this.forma = this.fb.group({   
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      cargo: ['', Validators.required],
      salario: ['0',]
    })
  }
  

  getrabajador(id: number) {

    this.trabajadorService.getTrabajadoredit(id).subscribe(data => {
      this.trabajador = data['trabajdor']
  
      this.formatLabel(500)
    })
    
  }

  cargarDataAlFormulario() {
  
    this.forma.reset({ 
      nombre:this.trabajador['nombre'],
      apellidos: this.trabajador['apellidos'],
      correo:this.trabajador['correo'],
      salario:this.trabajador['salario'],
      cargo:this.trabajador['cargo']
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
  
    this.trabajadorService.putTrabajadore(this.forma.value, this.idtr).subscribe(data => {
      console.log(data)
    })
    Swal.fire(
      'Actulizado!',
      'se actualizo correctamente.',
      'success'
    )
  }

}
