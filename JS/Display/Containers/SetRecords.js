var SetRecords = new Class({
   Extends: Panel,

   initialize: function(options) {
      options['class'] = 'setRecords';
      this.parent(options);
      this.exercise = options.exercise;

      var dropDownItems = [];
      for (var i = 0; i < this.exercise.inputFields.length; i++) {
         var field = this.exercise.inputFields[i];
         dropDownItems.push(new DropDownMenuItem(field.name, field));
      }

      this.dropDownMenu = new DropDownMenu({
         items: dropDownItems,
         setRecord: this.setRecord.bind(this)
      });

      this.setRecord(dropDownItems[0]);
      $(this).grab($(this.dropDownMenu));
   },

   resize: function() {
      this.dropDownMenu.resize();
   },

   setRecord: function(dropDownItem) {
      this.dropDownMenu.setText(dropDownItem.name);
   }
});
