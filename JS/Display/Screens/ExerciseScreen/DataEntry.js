var DataEntry = new Class({
   Extends: Panel,

   initialize: function() {
      this.parent({});
      this.hide();
   },

   showFor: function(label) {
      this.label = label;
      $(this).setStyle('display', 'block');
   },

   hide: function() {
      $(this).setStyle('display', 'none');
   }

});
