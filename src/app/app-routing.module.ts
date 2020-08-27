import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileComponent} from './files';
import { DatafileComponent} from './files/datafile.component';
import { AuthGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);

const routes: Routes = [
    { path: 'file', component: FileComponent, canActivate: [AuthGuard] },
    { path: 'data', component: DatafileComponent, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },

    // otherwise redirect to home
    { path: '**', redirectTo: 'file' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
