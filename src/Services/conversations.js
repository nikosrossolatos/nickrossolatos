import {inject} from 'aurelia-framework';
import {HttpClient,json} from 'aurelia-fetch-client';
import paths from '../config/defaults'
import 'fetch';

@inject(HttpClient,json)
export class Conversations{

  constructor(http,json){
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(paths.baseUrl+'/api/');
    });

    this.http = http;
  }
  getAll(){
  	return this.http.fetch('conversations')
      .then(response => response.json())
  }
  post(conversation,message){
    var request = {
      message
    }
    return this.http.fetch('conversations/'+conversation._id,{method:'post',body:json(request)})
      .then(response => response.json())
  }
  setUnread(id,state){
    return this.http.fetch('conversations/'+id,{method:'put',body:json({unread:state})})
      .then(response => response.json())
  }
}
