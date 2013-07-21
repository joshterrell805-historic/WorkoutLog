var Utils = {};
Utils.returnMember = function(arrayOrObject, memberKey, defaultValue) {
   return typeof arrayOrObject[memberKey] === 'undefined' ? defaultValue :
    arrayOrObject[memberKey];
};

POSITION = {};
POSITION.LEFT = 0;
POSITION.WEST = POSITION.LEFT;
POSITION.RIGHT = 1;
POSITION.EAST = POSITION.RIGHT;
POSITION.TOP = 2;
POSITION.TOP = POSITION.NORTH;
POSITION.BOTTOM = 3;
POSITION.BOTTOM = POSITION.SOUTH;

var HasOptions = new Class({
   initialize: function(options) {
      this.setOptions(options);
   },
   
   setOptions: function(options) {
      this.options = options;
   },
});

var Resizer = new Class({
   initialize: function() {
      this.resizeCallbacks = [];
      this.screenSize = {};
      this.checkResize.periodical(30, this);
   },
   // becase phones send resize events and orientation events multiple times 
   //  and most times the event is sent at the wrong time...
   checkResize: function() {
      var size = ScreenManager.getScreenSize();
      if (size.x !== this.screenSize.x || size.y !== this.screenSize.y) {
         this.screenSize.x = size.x;
         this.screenSize.y = size.y;
         Resizer.resize();
      }
   }
});
Resizer.getSingleton = function() {
   if (typeof Resizer.___SINGLETON___ === 'undefined')
      Resizer.___SINGLETON___ = new Resizer();
   return Resizer.___SINGLETON___;
};
Resizer.resize = function() {
   var self = Resizer.getSingleton();
   Array.each(self.resizeCallbacks, function(callback, index) {
      callback();
   });
};
Resizer.addCallback = function(callback) {
   var self = Resizer.getSingleton();
   self.resizeCallbacks.push(callback);
}
Resizer.clear = function(){
   var self = Resizer.getSingleton();
   self.resizeCallbacks = [];
}

//window.onresize = Resizer.resize;

