var SetRecords = new Class({
   Extends: Panel,

   initialize: function(options) {
      options['class'] = 'setRecords';
      this.parent(options);
      this.exercise = options.exercise;
      this.addChildren();
      this.setSet(0);
   },

   resize: function() {
      this.dropDownMenu.resize();
      this.previousBox.resize();
      this.previousBoxLabel.resize();
      this.previousLabel.resize();
      this.currentBox.resize();
      this.currentLabel.resize();
   },

   setRecord: function(dropDownItem) {
      this.dropDownItem = dropDownItem;
      this.dropDownMenu.setText(dropDownItem.name);
      this.previousBoxLabel.setText(dropDownItem.inputField.lastValue);
   },

   addChildren: function() {
      this.dropDownMenu = new DropDownMenu({
         setRecord: this.setRecord.bind(this)
      });

      $(this).grab($(this.dropDownMenu));

      this.recordContainer = new Panel({class: 'setRecords_recordContainer'});
      this.previousDiv = new Panel({class: 'setRecords_Div'});
      this.previousLabel = new Label({
         class: 'setRecords_Label',
         text: 'previous'
      });
      this.previousBox = new BorderedPanel({
         class: 'setRecords_previousBox',
         borderSize: 0.05
      });
      this.previousBoxLabel = new Label({class: 'setRecords_BoxLabel'});
      $(this.previousBox).grab(this.previousBoxLabel);
      $(this.previousDiv).grab(this.previousLabel);
      $(this.previousDiv).grab(this.previousBox);
      $(this.recordContainer).grab(this.previousDiv);

      this.currentDiv = new Panel({class: 'setRecords_Div'});
      this.currentLabel = new Label({
         class: 'setRecords_Label',
         text: 'this set'
      });
      this.currentBox = new BorderedPanel({
         class: 'setRecords_currentBox',
         borderSize: 0.05
      });
      this.currentBoxLabel = new Label({class: 'setRecords_BoxLabel'});
      $(this.currentBox).grab(this.currentBoxLabel);
      $(this.currentDiv).grab(this.currentLabel);
      $(this.currentDiv).grab(this.currentBox);
      $(this.recordContainer).grab(this.currentDiv);

      $(this).grab(this.recordContainer);
   },

   setSet: function(index) {
      if (index >= this.exercise.sets.divisions.length)
         throw new Error('Invalid set');

      this.setIndex = index;
      this.set = this.exercise.sets.divisions[index];

      var dropDownItems = [];
      for (var i = 0; i < this.set.recordFields.length; i++) {
         var field = this.set.recordFields[i];
         dropDownItems.push(new DropDownMenuItem(field.name, field));
      }

      this.dropDownMenu.setItems(dropDownItems);

      if (dropDownItems.length != 0)
         this.setRecord(dropDownItems[0]);
   }
});
