import { Component } from '@angular/core';
import { Friend } from '../models/friends';
import { SharedService } from '../services/shared.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  friend: Friend = new Friend();
  myFriends: Friend[] =[];

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

  onSave(){

    this.friend.belongsTo = this.shared.userName;
    console.log(this.friend);

    this.data.saveFriend(this.friend);
    this.friend = new Friend();
  }
}
