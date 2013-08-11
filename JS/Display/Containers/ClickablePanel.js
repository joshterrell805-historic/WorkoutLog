var ClickablePanel = new Class({
   Extends: Panel,

   // set options.onClick to the method to be called on click
   initialize: function(options) {
      this.parent(options);

      $(this).addEvent(
       SCREEN_EVENT.CLICK.action,
       ScreenManager.handleEvent.pass({
        type: SCREEN_EVENT.CLICK,
        element: $(this)
       })
      );
   }
});
