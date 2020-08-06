import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
 
@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {

  
  constructor(private http: HttpClient) {
    
   }

  getTrabajador() {
    return this.http.get('http://localhost:3000/trabajador')
  }
  getTrabajadorId(id: number) {//detalle
    return this.http.get(`http://localhost:3000/trabajadordet/${id}`)
  }
  getTrabajadoredit(id: number) {//edit
    return this.http.get(`http://localhost:3000/trabajador/${id}`)
  }

  postTrabajadore(trabajador: any):Observable<any>{

    let url = "http://localhost:3000/trabajador"
     return this.http.post<any>(url,trabajador);

  }

  putTrabajadore(trabajador: any,id:number):Observable<any>{

    let url = "http://localhost:3000/trabajador/"+id
     return this.http.put<any>(url,trabajador); 
  }
  deleteTrabajadoredit(id: number) {//edit
    return this.http.delete(`http://localhost:3000/trabajador/${id}`)
  }
  
}
