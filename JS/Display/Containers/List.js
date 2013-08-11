var List = new Class({
   Extends: Panel, 
   
   initialize: function(options) {
      options['class'] = Utils.returnMember(options, 'class', 'list');

      // what percentage of this panel's height is each row?
      this.rowPercent = options['rowPercent'] = 
       Utils.returnMember(options, 'rowPercent', 0.20);
      this.textPercent = options['textPercent'] =
       Utils.returnMember(options, 'textPercent', 0.5);

      this.parent(options);

      this.elements = [];

      this.table = new Table(
       Utils.returnMember(options, 'tableOptions', {})
      );

      $(this).grab($(this.table));

      Resizer.addCallback(this.onResize.bind(this));
   },

   addElement: function(element) {
      this.elements.push(element);
      this.table.addRow(element);
   },

   onResize: function() {
      var rowHeightPx = $(this).getSize().y * this.rowPercent;

      this.table.setRowHeight(rowHeightPx);

      $(this.table).setStyle('font-size', 
       (rowHeightPx * this.textPercent) + 'px');
   },

   getRow: function(element) {
      return this.table.getRow(element);
   }
});
