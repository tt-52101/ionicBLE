import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DevicePage } from '../device/device';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = DevicePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
}
