
import {inject} from 'aurelia-framework';
import {BindingSignaler} from 'aurelia-templating-resources';
import {Conversations} from './Services/conversations';
import socket from './socket/index';

@inject(Conversations,BindingSignaler)
export class Messages{
	constructor(Conversations,signaler){
		this.Conversations = Conversations;
		//For livestamp reloading
		setInterval(()=>signaler.signal('update-time'),30000)
		this.room = '';
	}
	attached(){
		socket.subscribe('dashboard');
		socket.on('update conversation',(data)=>{
			var conversation = this.conversations.findById(data._id);
			conversation.last_active = data.last_active;
			conversation.messages = data.messages;
			if(this.room!=data._id){
				conversation.unread = true;
			}
		});
		this.Conversations.getAll()
											.then(response=>this.conversations = response);
	}

	selectConversation(conversation){
		this.conversation = conversation;
		if(this.room){
			socket.unsubscribe(this.room);
		}
		this.room = this.conversation.persona;
		socket.subscribe(this.room);
		if(!conversation.unread){
			return;
		}
		this.Conversations.setUnread(this.conversation._id,false)
										 .then(response=>this.conversation.unread = false);
	}
	sendMessage(){
		this.Conversations.post(this.conversation,this.reply)
											.then(response=>{
												this.reply = '';
												this.conversation.messages.push(response)
											});
	}
	detached(){
		socket.unsubscribe('dashboard');
	}
}

Array.prototype.findById = function(id){
  return this[this.map(function(x) {return x._id; }).indexOf(id)];
}
