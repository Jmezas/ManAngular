import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';

import { EliminarComponent } from '../../components/eliminar/eliminar.component';

import { TrabajadorService } from '../../services/trabajador.service';
import  Swal from "sweetalert2";
 
@Component({
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styleUrls: ['./trabajador.component.css']
})
export class TrabajadorComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'salario', 'estado', 'cargo','correo','ver','eliminar'];
  dataSource = [];
 
  trabajadores:any[]=[]
  

  constructor(public dialog: MatDialog,
    private trabajadorService: TrabajadorService) { }

  ngOnInit(): void {
  

    this.getTrabajador();
  } 

  //abriri modal
  openDialog(){
  
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    //this.dialog.open(DialogComponent,dialogConfig);
    const digalogReg= this.dialog.open(DialogComponent,dialogConfig);
    digalogReg.afterClosed().subscribe(data=>{
      this.getTrabajador();
    })
  }
  onDelete(post){
     console.log('eliminar ' + post)
     Swal.fire({
      title: 'estas Seguto',
      text: "se Eliminara permenentemente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, eliminar!'
    }).then((result) => {
      if (result.value) {
        console.log('delete'+post)
        this.trabajadorService.deleteTrabajadoredit(post).subscribe(data=>{
          console.log(data)
         // this.dataSource=[]
         this.getTrabajador()
        })

        //this.getTrabajador()

        // setTimeout(() => {
        //   this.getTrabajador()
        // }, 100);
   

        Swal.fire(
          'eliminado!',
          'se elimino correctamente.',
          'success'
        )
      }
    })

  }

  getTrabajador(){
    this.trabajadorService.getTrabajador().subscribe((data: any[]) => {     
     // console.log(this.dataSource)
      this.dataSource = data['trabajador'];
      console.log(this.dataSource)
    })
  }
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  nombre:string;
}

 