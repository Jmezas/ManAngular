import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';

//material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule, } from '@angular/material/slider';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
//componentes
import { TrabajadorComponent } from './pagues/trabajador/trabajador.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DetalleTrabajadorComponent } from './pagues/detalle-trabajador/detalle-trabajador.component';
import { EditarTrabajadorComponent } from './pagues/editar-trabajador/editar-trabajador.component';

//rutas
import { RouterModule } from '@angular/router';
import { ROUTES } from "./app.routes";
import { EliminarComponent } from './components/eliminar/eliminar.component';



@NgModule({
  declarations: [
    AppComponent,
    TrabajadorComponent,
    DialogComponent,
    DetalleTrabajadorComponent,
    EditarTrabajadorComponent,
    EliminarComponent
  ],
  entryComponents:[
    DialogComponent
  ],
  imports: [
    BrowserModule,
   
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatSliderModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    RouterModule.forRoot( ROUTES ,{useHash:false})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
