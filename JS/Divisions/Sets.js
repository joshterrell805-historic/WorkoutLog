var Sets = new Class({
   Extends: DivisionSuite,

   initialize: function(options) {
      this.parent(options);
      // essentially sets takes the place of divisions, but create a new class
      //  just incase anything different ends up being done, or at least for
      //  abstraction's sake.

      // on second thought, I don't like having two variables for the same thing.
      // TODO: change this
      this.sets = Utils.returnMember(options, 'sets', null);
   }
});
