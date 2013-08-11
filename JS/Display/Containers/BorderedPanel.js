var BorderedPanel = new Class({
   Extends: Panel,

   initialize: function(options) {
      options['class'] = Utils.returnMember(options, 'class', 'borderedPanel');
      this.parent(options);

      this.styles = {
         borderSizePercentage: Utils.returnMember(options, 'borderSize', 0.02),
         ofHeight: Utils.returnMember(options, 'ofHeight', true)
      };
   },

   resize: function(width, height) {
      // optional -- the width and/or height of the button
      $(this).setStyle('width', (width === undefined ? null : width));
      $(this).setStyle('height', (height === undefined ? null : height));
      $(this).setStyle('border-width', null);

      var size = $(this).getSize();

      // in css, border gets floored
      var borderSize = Math.floor(this.styles.borderSizePercentage * 
       (this.styles.ofHeight ? size.y : size.x));
      borderSize = borderSize === 0 ? 1 : borderSize;

      $(this).setStyle('width', (size.x - borderSize * 2) + 'px');
      $(this).setStyle('height', (size.y - borderSize * 2) + 'px');
      $(this).setStyle('border-width', borderSize + 'px');
   }
});
