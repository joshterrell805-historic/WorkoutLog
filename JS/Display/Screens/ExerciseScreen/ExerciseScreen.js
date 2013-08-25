var ExerciseScreen = new Class({
   Extends: Screen,

   initialize: function(options) {
      this.parent(options);

      this.exercise = options.exercise;
      if (this.exercise === undefined)
         throw Error('Undefined Exercise');

      this.addChildren();
   },

   handleEvent: function(type, element) {
      switch (type) {
         case SCREEN_EVENT.LIST_ELEMENT_ACTION:
            switch (element.handle.options.class) {
               case 'dropDownElement':
                  this.setRecords.dropDownMenu.clickUnfoldedElement(element);
                  break;
               default:
                  this.unhandledEvent(type, element);
            }
            break;
         case SCREEN_EVENT.CLICK:
            element.handle.options.onClick();
            break;
         default:
            this.unhandledEvent(type, element);
      }
   },

   resize: function(width, height) {
      this.labelTitle.resize(width, height);
      this.setRecords.resize(width, height);
   },

   addChildren: function(options) {
      this.labelTitle = new Label({
         class: 'exerciseTitle',
         text: this.exercise.name,
         fontPercent: 0.6
      });

      this.setRecords = new SetRecords({exercise: this.exercise});

      $(this).grab($(this.labelTitle));
      $(this).grab($(this.setRecords));
   }
});
