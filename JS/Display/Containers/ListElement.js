var ListElement = new Class({
   Extends: Panel, 

   initialize: function(options) {
      options['class'] = Utils.returnMember(options, 'class', 'listElement');
      this.parent(options);
   }
});
