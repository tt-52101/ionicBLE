import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { NgZone } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  devices: any[] = [];
  statusMessage: string;

  constructor(public navCtrl: NavController, 
              private ble: BLE,
              private ngZone: NgZone) {

  }

  scan() {
    console.log('Scanning for Bluetooth LE Devices');
    this.devices = []; //clear list

    this.ble.scan([], 5).subscribe(
      device => this.onDeviceDiscovered(device),
      error => console.log("Error occurred: " + JSON.stringify(error))
    );
    setTimeout(this.ble.stopScan, 5000, 'Scan Complete');
  }

  onDeviceDiscovered(device) {
    console.log('Discovered' + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      this.devices.push(device);
    });
  }


}
