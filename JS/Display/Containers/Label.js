var Label = new Class({
   Extends: Panel,

   initialize: function(options) {
      options['class'] = Utils.returnMember(options, 'class', 'Label');
      this.parent(options);

      this.styles = {
         fontPercent: Utils.returnMember(options, 'fontPercent', 0.8)
      };

      this.setText(Utils.returnMember(options, 'text', ''));
   },

   setText: function(text) {
      if (typeof text == 'number')
         text = text.toString();
      else if (typeof text == 'string')
         ;
      else if (typeof text == 'undefined')
         text = '';
      else
         throw new Error('Invalid text type');

      $(this).set('text', text);
   },

   resize: function() {
      var textHeight = $(this).getSize().y;
      var fontHeight = textHeight * this.styles.fontPercent;

      $(this).setStyle('font-size', fontHeight + 'px');
      $(this).setStyle('line-height', textHeight + 'px');
   }
});
