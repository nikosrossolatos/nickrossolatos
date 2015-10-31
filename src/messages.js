
import {inject} from 'aurelia-framework'
import {Conversations} from './Services/conversations'

@inject(Conversations)
export class Messages{
	constructor(Conversations){
		this.Conversations = Conversations;
	}

	attached(){
		this.Conversations.getAll()
											.then(response=>this.conversations = response);
	}

	selectConversation(conversation){
		this.conversation = conversation;
		if(!conversation.unread){
			return;
		}
		this.Conversations.setUnread(this.conversation._id,false)
										 .then(response=>this.conversation.unread = false);
	}
	sendMessage(){
		this.reply = '';
	}
}
