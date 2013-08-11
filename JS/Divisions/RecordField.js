// A field representing data recorded in the past
var RecordField = new Class({
   Extends: HasOptions,

   initialize: function(options) {
      this.parent(options);
      this.name = Utils.returnMember(options, 'name', null);
      this.value = Utils.returnMember(options, 'value', null);
   },
});
