var RecordField = new Class({
   Extends: HasOptions,

   initialize: function(options) {
      this.parent(options);

      this.name = Utils.returnMember(options, 'name', null);
      this.lastValue = Utils.returnMember(options, 'lastValue', null);
      this.system = Utils.returnMember(options, 'system', null);
      this.inputType = Utils.returnMember(options, 'inputType', null);
   },
});
