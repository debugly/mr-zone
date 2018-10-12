import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrCodeComponent } from './qrcode/qrcode.component';
import { TimeStampComponent } from './timestamp/timestamp.component';
import { UrlCodeComponent } from './url-code/urlcode.component';
import { JsonComponent } from './json/json.component';

const routes: Routes = [
    { path: '', redirectTo: 'url-code', pathMatch: 'full'},
    { path: 'qr', component: QrCodeComponent },
    { path: 'timestamp', component: TimeStampComponent },
    { path: 'url-code', component: UrlCodeComponent },
    { path: 'json', component: JsonComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, {useHash: true})],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
