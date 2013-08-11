var Table = new Class({
   Extends: HasOptions,

   initialize: function(options){
      this.parent(options);

      options['class'] = Utils.returnMember(options, 'class', 'table');

      this.table = new Element('table', {
         class: options['class']
      });

      this.rows = [];
   },

   toElement: function() {
      return this.table;
   },

   addRow: function(element) {
      var tr = new Element('tr', {class: 'tr'});
      this.rows.push(tr);

      var td = new Element('td', {
       class: this.options.tdClass === undefined ? 'td' : this.options.tdClass
      });

      td.grab(element);
      tr.grab(td);
      tr.element = element;
      $(this).grab(tr);
   },

   getRow: function(element) {
      for (var i = 0; i < this.rows.length; i++) {
         var row = this.rows[i];
         if (element === row.element)
            return row;
      }
   },

   // including border
   setRowHeight: function(heightInPixils) {

      heightInPixils -= $(this).getStyle('border-spacing').toInt() *
       (this.rows.length + 1) / (this.rows.length);

      Array.each(this.rows, function(row, index) {
         row.setStyle('height', heightInPixils);
      });
   }
});
