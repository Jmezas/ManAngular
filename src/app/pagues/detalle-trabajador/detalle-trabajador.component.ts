import { Component, OnInit } from '@angular/core';
import { CargoService } from '../../services/cargo.service';
import { TrabajadorService } from '../../services/trabajador.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detalle-trabajador',
  templateUrl: './detalle-trabajador.component.html',
  styleUrls: ['./detalle-trabajador.component.css']
})
export class DetalleTrabajadorComponent implements OnInit {
  cargo:any[]=[]
  trabajador:any={}
  constructor(private cargoService: CargoService,private trabajadorService:TrabajadorService,private route:ActivatedRoute) {

    this.route.params.subscribe(params => {
      this.getrabajador(params['id'])
    })
  
   }

  ngOnInit(): void {
    this.cargoService.getCargo().subscribe((data: any[]) => {
      this.cargo=data['cargo'] 
    })
 
  }

  getrabajador(id:number){
    this.trabajadorService.getTrabajadorId(id).subscribe(data=>{
  
      this.trabajador=data['trabajdor']
      console.log(this.trabajador)
    })
  }

}
