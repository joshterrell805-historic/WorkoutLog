var ExerciseTitle = new Class({
   Extends: Panel,

   initialize: function(options) {
      options['class'] = 'exerciseTitle';
      this.parent(options);

      this.styles = {
         fontPercent: 0.6
      };

      this.setText(Utils.returnMember(options, 'text', 'Exercise Title'));
   },

   setText: function(text) {
      $(this).set('text', text);
   },

   resize: function() {
      var titleHeight = $(this).getSize().y;
      var fontHeight = titleHeight * this.styles.fontPercent;

      $(this).setStyle('font-size', fontHeight + 'px');
      $(this).setStyle('line-height', titleHeight + 'px');
   }
});
