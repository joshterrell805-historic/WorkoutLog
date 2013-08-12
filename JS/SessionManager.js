var SessionManager = new Class({
   startExercise: function(exercise) {
      ScreenManager.display(SCREEN.EXERCISE, {exercise: exercise});
   }
});

SessionManager.getSingleton = function() {                                       
   if (typeof SessionManager.___SINGLETON___ === 'undefined')                    
      SessionManager.___SINGLETON___ = new SessionManager();                      
   return SessionManager.___SINGLETON___;                                        
};

SessionManager.load = function(options) {
   //ScreenManager.display(SCREEN.SESSION, options);
   // for testing purposes: just jump strait to Exercise screen
   // TESTING
   ScreenManager.display(SCREEN.EXERCISE, {exercise: options.division});
};

SessionManager.openDivision = function(division) {
   if (instanceOf(division, Exercise)) {
      SessionManager.getSingleton().startExercise(division);
   } else if (instanceOf(division, DivisionSuite)) {

   } else
      // this should never happen unless I fucked up which is why I'm just
      //  throwing an error.
      throw new Error('Invalid division');
};
