import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { ExibitionsComponent } from './exibitions/exibitions.component';
import { NewExibitionComponent } from './exibitions/new-exibition/new-exibition.component';
import { ExibitionItemComponent } from './exibitions/exibition-item/exibition-item.component';
import { ExibitionDetailComponent } from './exibitions/exibition-detail/exibition-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ExibitionEditComponent } from './exibitions/exibition-edit/exibition-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavBarComponent,
    ExibitionsComponent,
    NewExibitionComponent,
    ExibitionItemComponent,
    ExibitionDetailComponent,
    ExibitionEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
