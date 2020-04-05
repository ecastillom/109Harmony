import { Injectable } from '@angular/core';
import { Message } from '../models/messages';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  allMessage: Message[] = [];

  constructor() { }

  public saveMessage(message){
    this.allMessage.push(message);
  }

  public getAllMessages(){
    return this.allMessage;
  }
}
