import { Injectable } from '@angular/core';
import { Message } from '../models/messages';
import { Observable } from 'rxjs';
import { map } from  'rxjs/operators'
import { firestore } from 'firebase';

import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  allMessages: Observable<Message[]>;
  messageCollection: AngularFirestoreCollection<Message>;

  constructor(private fb: AngularFirestore) {
    this.messageCollection = fb.collection<Message>('posts');

   }

  // La mejor forma de leer la info de la BD
  //  retrieveMessagesFromDB(){
  //    this.allMessages = this.messageCollection.valueChanges();
  //  }

  retrieveMessagesFromDB(){
    this.allMessages = this.messageCollection.snapshotChanges().pipe(
      map(actions => {
          return actions.map(a => {
              let data = a.payload.doc.data();
              var d: any = data.createdOn; // <- firebase data format
              if(d){
                data.createdOn = new firestore.Timestamp(d.seconds, d.nanoseconds).toDate();
              }
              return {... data }
          })
      })
    );
  }


  public saveMessage(message){
    var plain = Object.assign({},message);

    console.log(message);
    console.log(plain);
    this.messageCollection.add(plain);
  }

  public getAllMessages(){

    this.retrieveMessagesFromDB();
    return this.allMessages;
  }
}
