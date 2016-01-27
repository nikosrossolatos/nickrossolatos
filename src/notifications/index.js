export class Notify{
  constructor(){

    this.delayNotification = 4000;
    if (!("Notification" in window)) {
      console.info("This browser does not support desktop notification");
    }
  }

  checkPermissions(){
    if(Notification.permission==='granted'){
      return true;
    }
    else if(Notification.permission!=='denied'){
      Notification.requestPermission(function (permission) {
        if(permission==='denied'){
          return false;
        }
        return true;
      });
    }
  }
  spawn(title,body,icon) {
    if(!this.checkPermissions()){
      return;
    }
    var options = {
        body,
        icon :'/img/notify-icon.png'
    }
    var n = new Notification(title,options);
    setTimeout(()=>{
      n.close();
    },this.delayNotification)
  }
}