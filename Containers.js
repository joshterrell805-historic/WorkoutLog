var Panel = new Class({
   Extends: HasOptions,
   initialize: function(options) {
      this.parent(options);

      this.panel = new Element('div', {
         class: Utils.returnMember(options, 'class', 'panel')
      });

      $(this).handle = this;
   },
   toElement: function() {
      return $(this.panel);
   }
});

var BorderedPanel = new Class({
   Extends: Panel,
   initialize: function(options) {
      this.parent(options);

      var borderThickness = Utils.returnMember(
       options, 'borderThickness', '1px');
      var borderColor = Utils.returnMember(
       options, 'borderColor', '1px');

      this.borderTop = new Border({
         thickness: borderThickness,
         position: POSITION.TOP
      });
      $(this).grab(this.borderTop);
      this.borderLeft = new Border({
         thickness: borderThickness,
         position: POSITION.LEFT
      });
      $(this).grab(this.borderLeft);

      this.contentPanel = new Panel({class: 'BorderedPanel_contentPanel'});
      this.contentPanel = $(this.contentPanel);
      $(this).grab(this.contentPanel);

      this.borderRight = new Border({
         thickness: borderThickness,
         position: POSITION.RIGHT
      });
      $(this).grab(this.borderRight);
      this.borderBottom = new Border({
         thickness: borderThickness,
         position: POSITION.BOTTOM
      });
      //$(this).grab(this.borderBottom);
   },
   getContentPanel: function(){
      return this.contentPanel;
   }
});

var Border = new Class({
   Extends: Panel,
   initialize: function(options) {
      switch (options['position']) {
         case POSITION.LEFT:
            options['class'] = 'borderLeft';
            this.parent(options);
            $(this).setStyle('width', options['thickness']);
            break;
         case POSITION.RIGHT:
            options['class'] = 'borderRight';
            this.parent(options);
            $(this).setStyle('width', options['thickness']);
            break;
         case POSITION.TOP:
            options['class'] = 'borderTop';
            this.parent(options);
            $(this).setStyle('height', options['thickness']);
            break;
         case POSITION.BOTTOM:
            options['class'] = 'borderBottom';
            this.parent(options);
            $(this).setStyle('height', options['thickness']);
            break;
         default:
            throw new Error('Invalid border position');
      }
   }
});

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
      var td = new Element('td', {class: 'td'});
      td.grab(element);
      tr.grab(td);
      tr.element = element;
      $(this).grab(tr);
   },
   getRow: function(element) {
      for (var i in this.rows) {
         var row = this.rows[i];
         if (element === row.element)
            return row;
      }
   },
   setRowHeight: function(heightInPixils) {
      Array.each(this.rows, function(row, index) {
         row.setStyle('height', heightInPixils);
      });
   }
});

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
      this.table = new Table({});
      $(this).grab($(this.table));
      Resizer.addCallback(this.onResize.bind(this));
   },
   _addElement: function(element) {
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

var SessionDivisions = new Class({
   Extends: List,
   initialize: function(options) {
      options['class'] = 'sessionDivisions';
      options['rowPercent'] = 0.20;
      this.parent(options);
      this.setDivision(options.division);
   },
   addElement: function(options) {
      var element = new SessionDivisionsElement(options);
      this._addElement(element);

      this.getRow(element).addEvent(
       SCREEN_EVENT.LIST_ELEMENT_ACTION,
       ScreenManager.handleEvent.pass({
        type: SCREEN_EVENT.LIST_ELEMENT_ACTION, 
        element: $(element)
       })
      );
   },
   setDivision: function(division) {
      if (instanceOf(division, Exercise)) {
         this.addElement({division: division});
      } else if (instanceOf(division, DivisionSuite)) {

      } else
         throw new Error('Cannot set this division.');
   }

});

var ListElement = new Class({
   Extends: Panel, 
   initialize: function(options) {
      options['class'] = Utils.returnMember(options, 'class', 'listElement');
      this.parent(options);
   }
});

var SessionDivisionsElement = new Class({
   Extends: ListElement,
   initialize: function(options) {
      options['class'] = 'sessionDivisionsElement';
      this.parent(options);
      $(this).set('text', options.division.name);
   }
});
