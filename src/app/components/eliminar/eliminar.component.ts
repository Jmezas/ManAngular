import { Component, OnInit,Input } from '@angular/core';
import { TrabajadorService } from '../../services/trabajador.service';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit {
@Input() letras:string

  constructor(private trabajadorService: TrabajadorService) { }

  ngOnInit(): void {
  }


  elimiar() {
    this.trabajadorService.deleteTrabajadoredit(1).subscribe(data => {
      console.log(data)
    })
  }
}
