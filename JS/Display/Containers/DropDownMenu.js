var DropDownMenu = new Class({
   Extends: BorderedPanel,

   initialize: function(options) {
      options['class'] = Utils.returnMember(options, 'class', 
       'dropDownMenu_folded');
       options['borderSize'] = 0.06;
      this.parent(options);
      this.disabled = false;
      
      this.styles.fontHeight = 0.7;
      this.styles.arrowHeight = 0.6;
      this.styles.paddingOutside = 0.01;
      this.styles.paddingInside = 0.05;

      this.innerDivEnabled = this.innerDiv = new ClickablePanel({
          class: Utils.returnMember(options, 'innerClass', 'dropDownMenu_inner'),
          onClick: this.clickUnfolded.bind(this)
      });
      this.innerDivDisabled = this.innerDiv = new Panel({
          class: Utils.returnMember(options, 'innerClassDisabled',
           'dropDownMenu_inner_disabled'),
      });

      this.arrowDiv = new Panel({class: 'dropDown_innerArrow'});
      this.textDiv = new Panel({class: 'dropDown_innerText'});

   },

   setItems: function(items) {
      this.items = items == null ? [] : items;

      if (this.disabled ^ (this.items.length == 0)) {
         if(this.disabled) {
            this.disabled = false;
            $(this).removeClass('disabled');
         }
         else {
            this.disabled = true;
            $(this).addClass('disabled');
         }
      }

      if (this.unfolded)
         this.clickUnfolded();

      if (this.innerDiv)
         $(this.innerDiv).dispose();

      this.innerDiv = this.disabled ? this.innerDivDisabled :
       this.innerDivEnabled;

      $(this).grab($(this.innerDiv));
      $(this.innerDiv).grab($(this.textDiv));
      $(this.innerDiv).grab($(this.arrowDiv));
      console.log(this.innerDiv);
      this.setArrow('up');
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
