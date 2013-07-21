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

var Screen = new Class({
   Extends: Panel,
   initialize: function(options) {
      options['class'] = 'screen';
      this.parent(options);
      Resizer.addCallback(function() {
         var size = ScreenManager.getScreenSize();
         this.resize(size.x, size.y);
      }.bind(this));
   },
   unhandledEvent: function(type, element) {
      throw new Error(
       'Event type=\'' + type +'\' fired in Screen was unhandled');
   },
   resize: function(width, height) {
      // the screen width and height
      // override in subclasses
   }
});

var SCREEN = {};
SCREEN.SESSION = 0;
SCREEN.EXERCISE = 1;

SCREEN_EVENT = {};
SCREEN_EVENT.LIST_ELEMENT_ACTION = {id: 0, action: 'click'};
SCREEN_EVENT.CLICK = {id: 1, action: 'click'};

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
      Resizer.addCallback(ButtonManager.resize);

      this.exercise = options.exercise;
      if (this.exercise === undefined)
         throw Error('Undefined Exercise');

      this.addChildren();
   },
   handleEvent: function(type, element) {
      switch (type) {
         case SCREEN_EVENT.LIST_ELEMENT_ACTION:
            switch (element.handle.options.class) {
               case 'dropDownElement':
                  this.setRecords.dropDownMenu.clickUnfoldedElement(element);
                  break;
               default:
                  this.unhandledEvent(type, element);
            }
            break;
         case SCREEN_EVENT.CLICK:
            element.handle.options.onClick();
            break;
         default:
            this.unhandledEvent(type, element);
      }
   },
   resize: function(width, height) {
      this.title.resize(width, height);
      this.setRecords.resize(width, height);
   },
   addChildren: function(options) {
      this.title = new ExerciseTitle({text: this.exercise.name});
      this.setRecords = new SetRecords({exercise: this.exercise});
      $(this).grab($(this.title));
      $(this).grab($(this.setRecords));
      this.button = new Button({onClick: function(){console.log('hi');}});
      this.button2 = new Button({text: 'Shit yooo'});
      this.button3 = new Button({text: 'ya'});
      $(this).grab($(this.button));
      $(this).grab($(this.button2));
      $(this).grab($(this.button3));
      ButtonManager.addWidthGroup([this.button, this.button2]);
   }
});

// keep all buttons uniform height-wise and border wise on page
//  optionally, make buttons uniform in width if they are in a group
//  (take largest width)
var ButtonManager = new Class({
   initialize: function() {
      this.styles = {
         // button outerHeight with respect to screen size
         buttonHeight: 0.05,
         // with respect to button innerHeight. Remainder goes to spacing.
         fontHeight: 0.6,
      };

      this.clear();
   },
   clear: function() {
      this.buttons = [];
      this.widthGroups = [];
   }

});

ButtonManager.getSingleton = function() {
   if (typeof ButtonManager.___SINGLETON___ === 'undefined')
      ButtonManager.___SINGLETON___ = new ButtonManager();
   return ButtonManager.___SINGLETON___;
};

ButtonManager.addButton = function(button) {
   ButtonManager.getSingleton().buttons.push(button);
};

ButtonManager.addWidthGroup = function(buttonArray) {
   var self = ButtonManager.getSingleton();
   self.widthGroups.push(buttonArray);
   var index = self.widthGroups.length - 1;
   Array.each(buttonArray, function(button, index) {
      button.__widthGroup__ = index;
   });
};

ButtonManager.isInWidthGroup = function(button) {
   return button.__widthGroup__ !== undefined;
};

ButtonManager.resize = function() {

   var self = ButtonManager.getSingleton();
   if (self.buttons.length === 0)
      return;

   var screenSize = ScreenManager.getScreenSize();

   var buttonHeight = screenSize.y * self.styles.buttonHeight;
   Array.each(self.buttons, function(button, index) {
      button.resize(undefined, buttonHeight);
   });
   // assert (at least for now) that all buttons in the button manager
   // have the same border-size settings
   
   var borderWidth = $(self.buttons[0]).getStyle('border-width').toInt();
   var innerHeight = $(self.buttons[0]).getSize().y - borderWidth * 2;
   var fontHeight = innerHeight * self.styles.fontHeight;
   var innerPadding = (innerHeight - fontHeight) / 2;
   options = {
      innerHeight: innerHeight,
      fontHeight: fontHeight,
      innerPadding: innerPadding,
      borderWidth: borderWidth
   };

   ButtonManager.setStyles(self.buttons, options);

   Array.each(self.widthGroups, function(widthGroup, index) {
      var largestWidth = 0;

      for (var i = 0; i < widthGroup.length; i++) {
         var buttonWidth = $(widthGroup[i]).getSize().x;
         largestWidth = buttonWidth > largestWidth ? buttonWidth : largestWidth;
      }

      largestWidth -= 2 * $(widthGroup[0]).getStyle('borderWidth').toInt();

      ButtonManager.setWidths(widthGroup, largestWidth);
   });
};

ButtonManager.setWidths = function(buttons, width) {
   width = width + 'px';

   for (var i = 0; i < buttons.length; i++)
      $(buttons[i]).setStyle('width', width);
}

ButtonManager.setStyles = function(buttons, styles) {
   for (var i = 0; i < buttons.length; i++) {
      var button = buttons[i];
      $(button).setStyle('width', null);
      $(button.innerDiv).setStyle('font-size', options['fontHeight'] + 'px');
      $(button.innerDiv).setStyle('line-height', options['innerHeight'] + 'px');
      var innerSize = $(button.innerDiv).getSize();
      $(button).setStyle('width', (innerSize.x + 2 * options['innerPadding']) + 'px');
   }
}

ButtonManager.clear = function() {
   ButtonManager.getSingleton().clear();
};

