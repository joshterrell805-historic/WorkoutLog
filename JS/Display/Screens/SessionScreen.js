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
