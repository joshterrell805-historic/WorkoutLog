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
      case SCREEN.EXERCISE:
         screen = new ExerciseScreen(options);
         break;
      default:
         throw new Error('Invalid screenType');
   }

   self.setScreen(screen);
};

ScreenManager.handleEvent = function(typeAndElement) {
   var type = typeAndElement['type'];
   var element = typeAndElement['element'];

   var self = ScreenManager.getSingleton();
   self.currentScreen.handleEvent(type, element);
};

var Screen = new Class({
   Extends: Panel,
   initialize: function(options) {
      options['class'] = 'screen';
      this.parent(options);
   },
   unhandledEvent: function(type, element) {
      throw new Error(
       'Event type=\'' + type +'\' fired in Screen was unhandled');
   }
});

var SCREEN = {};
SCREEN.SESSION = 0;
SCREEN.EXERCISE = 1;

SCREEN_EVENT = {};
SCREEN_EVENT.LIST_ELEMENT_ACTION = 'dblclick';

var SessionScreen = new Class({
   Extends: Screen,
   initialize: function(options) {
      this.parent(options);
      this.list = new SessionDivisions(options);
      $(this).grab($(this.list));
   },
   handleEvent: function(type, element) {
      switch (type) {
         case SCREEN_EVENT.LIST_ELEMENT_ACTION:
            switch (element.handle.options.class) {
               case 'sessionDivisionsElement':
                  SessionManager.openDivision(
                   element.handle.options.division);
               break;
               default:
                  this.unhandledEvent(type, element);
            }
         break;
         default:
            this.unhandledEvent(type, element);
      }
   }
});

var ExerciseScreen = new Class({
   Extends: Screen,
   initialize: function(options) {
      this.parent(options);

   }
});


