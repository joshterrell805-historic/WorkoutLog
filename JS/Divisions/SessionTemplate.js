// the division representing the session as a whole
var SessionTemplate = new Class({
   Extends: HasOptions,

   initialize: function(options) {
      this.parent(options);

      // Exercise or DivisionSuite
      // if divisionSuite contains more divisionsuites (circuits), each
      //  tier 2 divisionsuite must have a name
      this.division = Utils.returnMember(options, 'division', null);

      this.title = Utils.returnMember(options, 'title', 'Today\'s Workout');
   }
});
