var ScreenManager = new Class({
   // only use static methods!
   initialize: function() {
      this.initializeDisplay();
      this.currentScreen = null;
   },
   initializeDisplay: function() {
      this.body = $(document.body);
   },
   setScreen: function(screen) {
      if (this.currentScreen)
         $(this.currentScreen).dispose();

      this.currentScreen = screen;
      this.body.grab($(this.currentScreen));
   }
});

ScreenManager.getSingleton = function() {
   if (typeof ScreenManager.___SINGLETON___ === 'undefined')
      ScreenManager.___SINGLETON___ = new ScreenManager();
   return ScreenManager.___SINGLETON___;
};

ScreenManager.display = function(screenType, options) {
   var self = ScreenManager.getSingleton();
   var screen = null;

   switch (screenType) {
      case SCREEN.SESSION:
         screen = new SessionScreen(options);
         break;
      default:
         throw new Error('Invalid screenType');
   }

   self.setScreen(screen);
};

var Screen = new Class({
   Extends: Panel,
   initialize: function(options) {
      options['class'] = 'screen';
      this.parent(options);
   },
});

var SCREEN = {}
SCREEN.SESSION = 0;

var SessionScreen = new Class({
   Extends: Screen,
   initialize: function(options) {
      this.parent(options);
      this.list = new SessionDivisions(options);
      $(this).grab($(this.list));
   }
});

