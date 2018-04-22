import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TypeListPage } from './type-list';

@NgModule({
  declarations: [
    TypeListPage,
  ],
  imports: [
    IonicPageModule.forChild(TypeListPage),
  ],
})
export class TypeListPageModule {}
