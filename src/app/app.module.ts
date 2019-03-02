import { ROUTES } from './app-route';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TopoComponent } from './topo/topo.component';
import { ListComponent } from './list/list.component';
import { SaveComponent } from './save/save.component';
import { UpdateComponent } from './update/update.component';
import { RouterModule } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppService } from './app.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    ListComponent,
    SaveComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ AppService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
