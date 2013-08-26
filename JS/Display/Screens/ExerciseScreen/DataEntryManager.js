
var DataEntryManager = new Class({
   label: null,
   currentManager: null,
   plateEntry: new PlateEntry(),
   digitEntry: new DigitEntry(),
   durationEntry: new DurationEntry()
});

DataEntryManager.getSingleton = function() {
   if (typeof DataEntryManager.___SINGLETON___ === 'undefined')
      DataEntryManager.___SINGLETON___ = new DataEntryManager();
   return DataEntryManager.___SINGLETON___;
};

DataEntryManager.showFor = function(monitorLabel, dataEntryType) {
   var self = DataEntryManager.getSingleton();

   self.currentManager && self.currentManager.hide();

   switch (dataEntryType) {
      case DATAENTRYTYPE.PLATE:
         self.currentManager = self.plateEntry;
         break;
      case DATAENTRYTYPE.DIGIT:
         self.currentManager = self.digitEntry;
         break;
      case DATAENTRYTYPE.DURATION:
         self.currentManager = self.durationEntry;
         break;
      default:
         throw new Error("Invalid DATAENTRYTYPE");
   }

   self.label = monitorLabel;

   self.currentManager.showFor(monitorLabel);
};

DataEntryManager.setContainer = function(container) {
   var self = DataEntryManager.getSingleton();
   // It looks like calling this method multiple times with different
   // containers is okay. The browser should automatically remove the element
   // from its old container then add it to the new container.
   // Or so says this post from npup on stackoverflow, haha
   // http://stackoverflow.com/a/2453434/1433127
   $(container).grab($(self.plateEntry));
   $(container).grab($(self.digitEntry));
   $(container).grab($(self.durationEntry));
};

