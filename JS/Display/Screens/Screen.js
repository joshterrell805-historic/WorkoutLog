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
