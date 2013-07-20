var SessionTemplate = new Class({
   Extends: HasOptions,

   initialize: function(options) {
      this.parent(options);

      // Exercise or DivisionSuite
      // if divisionSuite contains more divisionsuites (circuits), each
      //  level 2 divisionsuite must have a name
      this.division = Utils.returnMember(options, 'division', null);

      this.title = Utils.returnMember(options, 'title', 'Today\'s Workout');
   }
});

var Division = new Class({
   Extends: HasOptions,
   initialize: function(options) {
      this.parent(options);
      this.name = Utils.returnMember(options, 'name', '');
   }
});

var DivisionSuite = new Class({
   Extends: Division,

   initialize: function(options) {
      // define this.title if circuit..

      this.parent(options);

      this.divisions = Utils.returnMember(options, 'divisions', null);

      // * null or 0 length: 0 rest time
      // * 1 length: same rest time between each division
      // * >1 length: assume durations.length = divisions.length - 1,
      //   each duration [x] is the duration between set [x] and set [x + 1]
      this.restDurations = Utils.returnMember(options, 'restDurations', null);
   }
});

var Set = new Class({
   Extends: DivisionSuite,

   initialize: function(options) {
      this.parent(options);

      // an array of Target
      this.targetData = Utils.returnMember(options, 'targetData', null);

      // an array of RecordField 
      this.lastData = Utils.returnMember(options, 'lastData', null);
   }
});

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

var RecordField = new Class({
   Extends: HasOptions,
   initialize: function(options) {
      this.parent(options);
      this.name = Utils.returnMember(options, 'name', null);
      this.value = Utils.returnMember(options, 'value', null);
   },
});

var RecordInputField = new Class({
   Extends: RecordField,
   
   initialize: function(options) {
      this.parent(options);

      // Any member of INPUT
      this.inputType = Utils.returnMember(options, 'inputType', null);
   },
});

var INPUT = {};
INPUT.BARBELL = 0;
INPUT.DIGIT = 1;


var Target = new Class({
   Extends: HasOptions,
});

var TargetRange = new Class({
   Extends: Target,

   initialize: function(options) {
      this.parent(options);
      this.name = Utils.returnMember(options, 'name', null);
      this.low = Utils.returnMember(options, 'low', null);
      this.high = Utils.returnMember(options, 'high', null);
   }
});

var TargetString = new Class({
   Extends: Target,

   initialize: function(options) {
      this.parent(options);
      this.message = Utils.returnMember(options, 'message', null);
   }
});
