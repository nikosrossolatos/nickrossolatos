import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';


@inject(AuthService)

export class Login{
    constructor(auth){
        this.auth = auth;
        this.heading = 'Login';
        this.username='';
        this.password='';
    };
    APIAuthenticate = {
        UserName:null,
        Password:null,
        RememberMe:true,
        AppId:null
    }
    login(){
        this.APIAuthenticate.UserName = this.username;
        this.APIAuthenticate.Password = this.password
        return this.auth.login(this.APIAuthenticate)
        .then(response=>{
            console.log("success logged " + response);
            console.log(response);
        })
        .catch(err=>{
            console.log(err);
        });
    };
}