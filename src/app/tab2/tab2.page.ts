import { Component } from '@angular/core';
import { Message } from '../models/messages';
import { SharedService } from '../services/shared.service';
import { DataService } from '../services/data.service';
import { Friend } from '../models/friends';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  message: Message = new Message();
  myFriends: Friend[] = [];

  constructor(private shared: SharedService, private data: DataService) {
    this.data.getAllFriends().subscribe(list =>{

      // All Friend for the db
      //this.myFriends = list;

      this.myFriends = [];
      for(let i=0; i< list.length; i++){
        var myF = list[i];

        if(myF.belongsTo == this.shared.userName){
          this.myFriends.push(myF);
        }
      }

      
    });
  }

  onPost(){

    this.message.from = this.shared.userName;
    this.message.createdOn = new Date();

    this.data.saveMessage(this.message);

    console.log("posting",this.message);
    this.message = new Message();
  }

}
