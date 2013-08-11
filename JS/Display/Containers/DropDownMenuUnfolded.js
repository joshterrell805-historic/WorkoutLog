var DropDownMenuUnfolded = new Class({
   Extends: List,

   initialize: function(options) {
      options['class'] = 'dropDownMenu_unfolded';
      options['rowPercent'] = 1 / options.items.length;
      options['tableOptions'] = {
         tdClass: 'dropDownMenu_td'
      };

      this.parent(options);
      this.elements = [];

      for (var i = 0; i < options.items.length; i++)
         this.addElement(options.items[i]);
   },

   addElement: function(item) {
      var element = new DropDownElement({item: item});
      this.elements.push(element);
      this.parent(element);

      this.getRow(element).addEvent(
       SCREEN_EVENT.LIST_ELEMENT_ACTION.action,
       ScreenManager.handleEvent.pass({
        type: SCREEN_EVENT.LIST_ELEMENT_ACTION, 
        element: $(element)
       })
      );
   }
});
