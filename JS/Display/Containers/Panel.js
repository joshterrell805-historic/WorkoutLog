var Panel = new Class({
   Extends: HasOptions,

   initialize: function(options) {
      this.parent(options);

      this.panel = new Element('div', {
         class: Utils.returnMember(options, 'class', 'panel')
      });

      $(this).handle = this;
   },

   toElement: function() {
      return $(this.panel);
   }
});
