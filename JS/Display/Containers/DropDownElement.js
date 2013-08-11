var DropDownElement = new Class({
   Extends: ListElement,

   initialize: function(options) {
      options['class'] = 'dropDownElement';
      this.parent(options);
      $(this).set('text', options.item.name);
   }
});
