import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';

/**
 * Generated class for the DevicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-device',
  templateUrl: 'device.html',
})
export class DevicePage {

  peripheral: any = {};
  statusMessage: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private ble: BLE,
              private ngZone: NgZone,
              private toastCtrl: ToastController) {
  
  let device = navParams.get('device');
  console.log("Name is " + device.name + " and ID is " + device.id);
  this.setStatus('Connecting to ' + device.name || device.id);
              
  this.ble.connect(device.id).subscribe(
    peripheral => this.onConnected(peripheral),
    peripheral => this.onDeviceDisconnected(peripheral)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DevicePage');
  }

  onConnected(peripheral){
    this.ngZone.run(() => {
      this.setStatus('');
      this.peripheral = peripheral;
    });
  }

  onDeviceDisconnected(peripheral) {
    let toast = this.toastCtrl.create({
      message: 'The peripheral unexpectedly disconnected',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

   // Disconnect peripheral when leaving the page
    ionViewWillLeave() {
     console.log('ionViewWillLeave disconnecting Bluetooth');
     this.ble.disconnect(this.peripheral.id).then(
       () => console.log('Disconnected ' + JSON.stringify(this.peripheral)),
       () => console.log('ERROR disconnecting ' + JSON.stringify(this.peripheral))
     )
   }

  setStatus(message){
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

}
