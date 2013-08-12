var Set = new Class({
   Extends: DivisionSuite,

   initialize: function(options) {
      this.parent(options);

      // an array of Target
      this.targetData = Utils.returnMember(options, 'targetData', null);

      // an array of RecordField 
      this.recordFields = Utils.returnMember(options, 'fields', null);
   }
});
