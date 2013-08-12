var Exercise = new Class({
   Extends: Division,

   initialize: function(options) {
      this.parent(options);

      // instance of Sets
      this.sets = Utils.returnMember(options, 'sets', null);
   },
});
