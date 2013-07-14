var SessionManager = new Class({
   load: function(options) {
      ScreenManager.display(SCREEN.SESSION, options);
   }
});

SessionManager.getSingleton = function() {                                       
   if (typeof SessionManager.___SINGLETON___ === 'undefined')                    
      SessionManager.___SINGLETON___ = new SessionManager();                      
   return SessionManager.___SINGLETON___;                                        
};

SessionManager.load = function(options) {
   var singleton = SessionManager.getSingleton();
   singleton.load(options);
};
