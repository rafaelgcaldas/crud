import { Component } from '@angular/core';
import { Routes } from '@angular/router'
import { ListComponent } from './list/list.component';
import { SaveComponent } from './save/save.component';
import { UpdateComponent } from './update/update.component';

export const ROUTES: Routes = [
    { path: "", component: ListComponent },
    { path: "save", component: SaveComponent},
    { path: "update", component: SaveComponent}
]