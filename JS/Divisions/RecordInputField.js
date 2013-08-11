var RecordInputField = new Class({
   Extends: RecordField,
   
   initialize: function(options) {
      this.parent(options);

      // Any member of INPUT
      this.inputType = Utils.returnMember(options, 'inputType', null);
   },
});
