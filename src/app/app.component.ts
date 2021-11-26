import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app3';

ngOnInit(): void {

  const firebaseConfig = {
    apiKey: "AIzaSyAkp6iHkEBCavVUo9XwuyfI5ci7f_0W3pQ",
    authDomain: "instagram-clone-5ff1d.firebaseapp.com",
    databaseURL: "https://instagram-clone-5ff1d-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-5ff1d",
    storageBucket: "instagram-clone-5ff1d.appspot.com",
    messagingSenderId: "950170163030",
    appId: "1:950170163030:web:e60bdfed42eb149a40e8f7",
    measurementId: "G-JS1PF3NGRH"
  };

  firebase.initializeApp(firebaseConfig)
  }
}
