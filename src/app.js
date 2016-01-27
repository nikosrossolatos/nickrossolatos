import {inject} from 'aurelia-framework';
import {AuthorizeStep} from 'aurelia-auth';
import {AuthService} from 'aurelia-auth';
import {Notify} from './notifications/index';

@inject(AuthService,Notify)
export class App {
  configureRouter(config, router) {
    config.title = 'Administration';
    config.addPipelineStep('authorize', AuthorizeStep);
    config.map([
    	{ route: ['', 'dashboard'], name: 'dashboard',      moduleId: 'dashboard',      nav: true, 	auth:true,title: 'Dashboard',		settings:{svgIcon:'thunder'} },
    	{ route: 'messages',        name: 'messages',       moduleId: 'messages',       nav: true, 	auth:true,title: 'Messages',		settings:{svgIcon:'messages'} },
    	{ route: 'settings',   			name: 'settings',  			moduleId: 'settings',  			nav: true, 	auth:true,title: 'Settings',		settings:{svgIcon:'gear'} },
    	{ route: 'login',        		name:'login', 					moduleId: './login',       	nav: false, title:'Login' },
	    { route: 'logout',        	name:'logout' , 				moduleId: './logout',       nav: false, title:'Logout' },
    ]);

    this.router = router;
  }
  constructor(auth,notify){
    this.auth = auth;
    this.notify = notify;
  }
  attached(){
  }
  get isAuthenticated(){
    return this.auth.isAuthenticated();
  }
}
