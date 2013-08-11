var ExerciseScreen = new Class({
   Extends: Screen,

   initialize: function(options) {
      this.parent(options);
      Resizer.addCallback(ButtonManager.resize);

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
      this.title.resize(width, height);
      this.setRecords.resize(width, height);
   },

   addChildren: function(options) {
      this.title = new ExerciseTitle({text: this.exercise.name});
      this.setRecords = new SetRecords({exercise: this.exercise});

      $(this).grab($(this.title));
      $(this).grab($(this.setRecords));

      // TESTING
      this.button = new Button({onClick: function(){console.log('hi');}});
      this.button2 = new Button({text: 'Shit yooo'});
      this.button3 = new Button({text: 'ya'});

      $(this).grab($(this.button));
      $(this).grab($(this.button2));
      $(this).grab($(this.button3));

      ButtonManager.addWidthGroup([this.button, this.button2]);
   }
});
