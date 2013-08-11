var TargetRange = new Class({
   Extends: Target,

   initialize: function(options) {
      this.parent(options);
      this.name = Utils.returnMember(options, 'name', null);
      this.low = Utils.returnMember(options, 'low', null);
      this.high = Utils.returnMember(options, 'high', null);
   }
});
