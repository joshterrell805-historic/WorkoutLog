var Button = new Class({
   Extends: BorderedPanel,

   initialize: function(options) {
      options['class'] = Utils.returnMember(options, 'class', 'buttonBorder');
      options['borderSize'] = Utils.returnMember(options, 'borderSize', 0.11);
      this.parent(options);

      this.innerDiv = new ClickablePanel({
         class: Utils.returnMember(options, 'innerClass', 'innerButton'),
         onClick: Utils.returnMember(options, 'onClick', null)
      });

      $(this).grab(this.innerDiv);

      this.setText(Utils.returnMember(options, 'text', 'Button'));

      ButtonManager.addButton(this);
   },

   setText: function(text) {
      $(this.innerDiv).set('text', text);
   }
});
