var DivisionSuite = new Class({
   Extends: Division,

   initialize: function(options) {
      // this.title should be defined if circuit
      // (do this when creating the Circuit class)
      // this.name???

      this.parent(options);

      this.divisions = Utils.returnMember(options, 'divisions', null);

      // * null or 0 length: 0 rest time
      // * 1 length: same rest time between each division
      // * >1 length: assume durations.length = divisions.length - 1,
      //   each duration [x] is the duration between set [x] and set [x + 1]
      this.restDurations = Utils.returnMember(options, 'restDurations', null);
   }
});
