// an exercise or a set/circuit/etc of exercises (see DivisionSuite)
var Division = new Class({
   Extends: HasOptions,

   initialize: function(options) {
      this.parent(options);
      this.name = Utils.returnMember(options, 'name', '');
   }
});
