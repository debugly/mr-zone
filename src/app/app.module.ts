import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSelectModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatRadioModule,
    MatCheckboxModule
} from '@angular/material';

import { SafeHtmlPipe } from './app.pipe.sanitize-html';

import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { TimeStampComponent } from './timestamp/timestamp.component';
import { UrlCodeComponent } from './url-code/urlcode.component';
import { QrCodeComponent } from './qrcode/qrcode.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { JsonComponent } from './json/json.component';



@NgModule({
    declarations: [
        AppComponent,
        SafeHtmlPipe,
        CategoryComponent,
        TimeStampComponent,
        UrlCodeComponent,
        QrCodeComponent,
        FooterComponent,
        JsonComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatRadioModule,
        MatCheckboxModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
