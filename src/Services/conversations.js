import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import paths from '../config/defaults'
import 'fetch';

@inject(HttpClient)
export class Conversations{

  constructor(http){
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
  setUnread(id,state){
    return this.http.fetch('conversations/'+id,{method:'put',body:{unread:state}})
      .then(response => response.json())
  }
}
