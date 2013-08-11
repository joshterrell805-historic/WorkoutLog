var TargetString = new Class({
   Extends: Target,

   initialize: function(options) {
      this.parent(options);
      this.message = Utils.returnMember(options, 'message', null);
   }
});
