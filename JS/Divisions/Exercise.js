var Exercise = new Class({
   Extends: Division,

   initialize: function(options) {
      this.parent(options);

      // either a DivisionSuite of Sets, or a single Set
      this.sets = Utils.returnMember(options, 'sets', null);

      // an array of RecordInputField
      this.inputFields = Utils.returnMember(options, 'inputFields', null);
   },
});
