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
      this.parent(element);

      this.getRow(element).addEvent(
       SCREEN_EVENT.LIST_ELEMENT_ACTION.action,
       ScreenManager.handleEvent.pass({
        type: SCREEN_EVENT.LIST_ELEMENT_ACTION, 
        element: $(element)
       })
      );
   },
   setDivision: function(division) {
      if (instanceOf(division, Exercise)) {
         this.addElement({division: division});
         this.addElement({division: division});
         this.addElement({division: division});
         this.addElement({division: division});
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

var ClickablePanel = new Class({
   Extends: Panel,
   // set options.onClick to the method to be called on click
   initialize: function(options) {
      this.parent(options);

      $(this).addEvent(
       SCREEN_EVENT.CLICK.action,
       ScreenManager.handleEvent.pass({
        type: SCREEN_EVENT.CLICK,
        element: $(this)
       })
      );
   }
});

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

var Button = new Class({
   Extends: BorderedPanel,
   initialize: function(options) {
      options['class'] = Utils.returnMember(options, 'class', 'buttonBorder');
      options['borderSize'] = Utils.returnMember(options, 'borderSize', 0.11);
      this.parent(options);

      this.innerDiv = new ClickablePanel(
       Utils.returnMember(options, 'innnerOptions', {class: 'innerButton'}));
      $(this).grab(this.innerDiv);

      this.setText(Utils.returnMember(options, 'text', 'Button'));

      ButtonManager.addButton(this);
   },
   setText: function(text) {
      $(this.innerDiv).set('text', text);
   }
});

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

var DropDownMenu = new Class({
   Extends: BorderedPanel,
   initialize: function(options) {
      options['class'] = Utils.returnMember(options, 'class', 
       'dropDownMenu_folded');
       options['borderSize'] = 0.06;
      this.parent(options);

      this.items = options.items;
      
      this.styles.fontHeight = 0.7;
      this.styles.arrowHeight = 0.6;
      this.styles.paddingOutside = 0.01;
      this.styles.paddingInside = 0.05;

      this.innerDiv = new ClickablePanel({
       class: Utils.returnMember(options, 'innerClass', 'dropDownMenu_inner'),
       onClick: this.clickUnfolded.bind(this)
      });

      $(this).grab($(this.innerDiv));

      this.arrowDiv = new Panel({class: 'dropDown_innerArrow'});
      this.setArrow('up');

      this.textDiv = new Panel({class: 'dropDown_innerText'});

      $(this.innerDiv).grab($(this.textDiv));
      $(this.innerDiv).grab($(this.arrowDiv));

   },
   setText: function(text) {
      $(this.textDiv).set('text', text);
   },
   setArrow: function(upOrDown) {
      switch (upOrDown) {
         case 'up':
            $(this.arrowDiv).set('text', '\u25BC');
            break;
         case 'down':
            $(this.arrowDiv).set('text', '\u25B2');
            break;
         default:
            throw new Error('Unable to set arrow direction');
      }
   },
   resize: function() {
      this.parent();
      var size = $(this).getSize();
      var borderWidth = $(this).getStyle('border-width').toInt();
      var innerSize = {
         x: size.x - 2 * borderWidth,
         y: size.y - 2 * borderWidth
      };

      $(this.textDiv).setStyle('font-size',
       (innerSize.y * this.styles.fontHeight) + 'px');
      $(this.innerDiv).setStyle('line-height', innerSize.y + 'px');
      $(this.arrowDiv).setStyle('font-size',
       (innerSize.y * this.styles.arrowHeight) + 'px');

      var paddingOutside = innerSize.x * this.styles.paddingOutside;
      var paddingInside = innerSize.x * this.styles.paddingInside;
      var arrowWidth = $(this.arrowDiv).getSize().x;

      $(this.textDiv).setStyle('padding-left', paddingOutside + 'px');
      $(this.arrowDiv).setStyle('padding-right', paddingOutside + 'px');

      $(this.textDiv).setStyle('width', (innerSize.x -
       (arrowWidth + 2 * paddingOutside + paddingInside)) + 'px');

      if(this.unfolded) {
         $(this.unfolded).setStyle('width', size.x + 'px');
         $(this.unfolded).setStyle('height',
          (size.y * this.items.length) + 'px');
         var pos = $(this).getPosition();
         pos.y += size.y;
         $(this.unfolded).setPosition(pos);

         var fontSize = $(this.textDiv).getStyle('font-size');
         for (var i = 0; i < this.unfolded.elements.length; i++)
            $(this.unfolded.elements[i]).setStyle('font-size', fontSize);
      }
   },
   clickUnfolded: function() {
      if (this.unfolded) {
         $(this.unfolded).dispose();
         this.unfolded = null;
         this.setArrow('up');
      }
      else {
         this.unfolded = new DropDownMenuUnfolded({items: this.items});
         ScreenManager.grab($(this.unfolded));
         this.setArrow('down');
         Resizer.resize();
      }
   },
   clickUnfoldedElement: function(element) {
      var dropDownElement = element.handle;
      this.options.setRecord(dropDownElement.options.item);
      this.clickUnfolded();
   }
});

var DropDownMenuUnfolded = new Class({
   Extends: List,
   initialize: function(options) {
      options['class'] = 'dropDownMenu_unfolded';
      options['rowPercent'] = 1 / options.items.length;
      options['tableOptions'] = {
         tdClass: 'dropDownMenu_td'
      };
      this.parent(options);
      this.elements = [];

      for (var i = 0; i < options.items.length; i++)
         this.addElement(options.items[i]);
   },
   addElement: function(item) {
      var element = new DropDownElement({item: item});
      this.elements.push(element);
      this.parent(element);

      this.getRow(element).addEvent(
       SCREEN_EVENT.LIST_ELEMENT_ACTION.action,
       ScreenManager.handleEvent.pass({
        type: SCREEN_EVENT.LIST_ELEMENT_ACTION, 
        element: $(element)
       })
      );
   }

});

var DropDownElement = new Class({
   Extends: ListElement,
   initialize: function(options) {
      options['class'] = 'dropDownElement';
      this.parent(options);
      $(this).set('text', options.item.name);
   }
});

var DropDownMenuItem = function(name, field) {
   this.name = name;
   this.inputField = field;
}

var SetRecords = new Class({
   Extends: Panel,
   initialize: function(options) {
      options['class'] = 'setRecords';
      this.parent(options);
      this.exercise = options.exercise;

      var dropDownItems = [];
      for (var i = 0; i < this.exercise.inputFields.length; i++) {
         var field = this.exercise.inputFields[i];
         dropDownItems.push(new DropDownMenuItem(field.name, field));
      }

      this.dropDownMenu = new DropDownMenu({
         items: dropDownItems,
         setRecord: this.setRecord.bind(this)
      });
      this.setRecord(dropDownItems[0]);
      $(this).grab($(this.dropDownMenu));

   },
   resize: function() {
      this.dropDownMenu.resize();
   },
   setRecord: function(dropDownItem) {
      this.dropDownMenu.setText(dropDownItem.name);
   }
   

});
