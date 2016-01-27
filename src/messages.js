
import {inject} from 'aurelia-framework';
import {BindingSignaler} from 'aurelia-templating-resources';
import {Conversations} from './Services/conversations';
import socket from './socket/index';
import {Notify} from './notifications/index';

@inject(Conversations,BindingSignaler,Notify)
export class Messages{
	constructor(Conversations,signaler,notify){
		this.Conversations = Conversations;
		//For livestamp reloading
		setInterval(()=>signaler.signal('update-time'),30000)
		this.room = '';
		this.notify = notify;
	}
	attached(){
		this.chatWindow = document.getElementById('js-chat');
		socket.subscribe('dashboard');
		socket.on('update conversation',(data)=>{
			var conversation = this.conversations.findById(data._id);
			conversation.last_active = data.last_active;
			conversation.messages = data.messages;
			var lastSent = data.messages[data.messages.length-1]
			//notify me when there is a response but not from admin
			if(!lastSent.admin){
				this.notify.spawn(conversation.persona.name + ' sent',lastSent.content.substring(0,60))
			}
			if(isAtBottom(this.chatWindow)){
				this.scrollChatBottom()
			}
			else{
				conversation.unread = true;
			}
		});
		function isAtBottom(element){
			return element.scrollTop + element.clientHeight == element.scrollHeight;
		}
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
		this.scrollChatBottom();
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
												this.conversation.messages.push(response);
												this.scrollChatBottom();
											});
	}
	scrollChatBottom(){
		//TODO: temp fix for scrolling when a change happens
		setTimeout(()=>{
			this.chatWindow.scrollTop = this.chatWindow.scrollHeight;
		},0)
	}
	detached(){
		socket.unsubscribe('dashboard');
	}
}

Array.prototype.findById = function(id){
  return this[this.map(function(x) {return x._id; }).indexOf(id)];
}
