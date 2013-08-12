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
   Resizer.clear();
   ButtonManager.clear();

   var self = ScreenManager.getSingleton();
   var screen = null;

   switch (screenType) {
      case SCREEN.SESSION:
         screen = new SessionScreen(options);
         break;
      case SCREEN.EXERCISE:
         screen = new ExerciseScreen(options);
         break;
      default:
         throw new Error('Invalid screenType');
   }

   self.setScreen(screen);
   Resizer.addCallback(ButtonManager.resize);
   Resizer.resize();
};

ScreenManager.handleEvent = function(typeAndElement) {
   var type = typeAndElement['type'];
   var element = typeAndElement['element'];

   var self = ScreenManager.getSingleton();
   self.currentScreen.handleEvent(type, element);
};

ScreenManager.getScreenSize = function() {
   return $(ScreenManager.getSingleton().currentScreen).getSize();
};

ScreenManager.grab = function(element) {
   ScreenManager.getSingleton().body.grab($(element));
};
