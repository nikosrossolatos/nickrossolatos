import {inject} from 'aurelia-framework';
import {HttpClient,json} from 'aurelia-fetch-client';
import paths from '../config/defaults'
import 'fetch';

@inject(HttpClient,json)
export class Settings{

  constructor(http,json){
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(paths.baseUrl+'/api/');
    });

    this.http = http;
  }
  getAll(){
  	return this.http.fetch('settings')
      .then(response => response.json())
  }
  setAutopilot(state){
    return this.http.fetch('settings',{method:'put',body:json({autopilot:state})})
      .then(response => response.json())
  }
}
