import { Routes, RouterModule } from '@angular/router';
import { TrabajadorComponent } from './pagues/trabajador/trabajador.component';
import { DetalleTrabajadorComponent } from './pagues/detalle-trabajador/detalle-trabajador.component';
import { EditarTrabajadorComponent } from './pagues/editar-trabajador/editar-trabajador.component';

export const ROUTES:Routes=[
    { path: 'trabajador', component: TrabajadorComponent },
    { path: 'detalle/:id', component: DetalleTrabajadorComponent },
    { path: 'editar/:id', component: EditarTrabajadorComponent },
    { path: '', pathMatch: 'full', redirectTo: 'trabajador' },
    { path: '**', pathMatch: 'full', redirectTo: 'trabajador' }
  ];