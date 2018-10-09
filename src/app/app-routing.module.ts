import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrCodeComponent } from './qrcode/qrcode.component';
import { TimeStampComponent } from './timestamp/timestamp.component';
import { UrlCodeComponent } from './url-code/urlcode.component';

const routes: Routes = [
    { path: '', redirectTo: 'url-code', pathMatch: 'full'},
    { path: 'qr', component: QrCodeComponent },
    { path: 'timestamp', component: TimeStampComponent },
    { path: 'url-code', component: UrlCodeComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, {useHash: true})],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
