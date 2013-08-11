var SessionDivisionsElement = new Class({
   Extends: ListElement,

   initialize: function(options) {
      options['class'] = 'sessionDivisionsElement';

      this.parent(options);

      $(this).set('text', options.division.name);
   }
});
