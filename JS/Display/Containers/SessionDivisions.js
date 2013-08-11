var SessionDivisions = new Class({
   Extends: List,

   initialize: function(options) {
      options['class'] = 'sessionDivisions';
      options['rowPercent'] = 0.20;

      this.parent(options);
      this.setDivision(options.division);
   },

   addElement: function(options) {
      var element = new SessionDivisionsElement(options);
      this.parent(element);

      this.getRow(element).addEvent(
       SCREEN_EVENT.LIST_ELEMENT_ACTION.action,
       ScreenManager.handleEvent.pass({
        type: SCREEN_EVENT.LIST_ELEMENT_ACTION, 
        element: $(element)
       })
      );
   },

   setDivision: function(division) {
      if (instanceOf(division, Exercise)) {
         // TESTING
         this.addElement({division: division});
         this.addElement({division: division});
         this.addElement({division: division});
         this.addElement({division: division});
         this.addElement({division: division});
      } else if (instanceOf(division, DivisionSuite)) {
         throw new Error('Not implemented yet');
      } else
         throw new Error('Cannot set this division.');
   }
});
