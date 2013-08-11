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

   // assume (at least for now) that all buttons in the button manager
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
