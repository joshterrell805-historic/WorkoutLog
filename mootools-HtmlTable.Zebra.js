// MooTools: the javascript framework.
// Load this file's selection again by visiting: http://mootools.net/more/1729b4648229d1738054be10d2f8c6f7 
// Or build this file again with packager using: packager build More/HtmlTable.Zebra
/*
---
copyrights:
  - [MooTools](http://mootools.net)

licenses:
  - [MIT License](http://mootools.net/license.txt)
...
*/
MooTools.More={version:"1.4.0.1",build:"a4244edf2aa97ac8a196fc96082dd35af1abab87"};Class.Occlude=new Class({occlude:function(c,b){b=document.id(b||this.element);
var a=b.retrieve(c||this.property);if(a&&!this.occluded){return(this.occluded=a);}this.occluded=false;b.store(c||this.property,this);return this.occluded;
}});var HtmlTable=new Class({Implements:[Options,Events,Class.Occlude],options:{properties:{cellpadding:0,cellspacing:0,border:0},rows:[],headers:[],footers:[]},property:"HtmlTable",initialize:function(){var a=Array.link(arguments,{options:Type.isObject,table:Type.isElement,id:Type.isString});
this.setOptions(a.options);if(!a.table&&a.id){a.table=document.id(a.id);}this.element=a.table||new Element("table",this.options.properties);if(this.occlude()){return this.occluded;
}this.build();},build:function(){this.element.store("HtmlTable",this);this.body=document.id(this.element.tBodies[0])||new Element("tbody").inject(this.element);
$$(this.body.rows);if(this.options.headers.length){this.setHeaders(this.options.headers);}else{this.thead=document.id(this.element.tHead);}if(this.thead){this.head=this.getHead();
}if(this.options.footers.length){this.setFooters(this.options.footers);}this.tfoot=document.id(this.element.tFoot);if(this.tfoot){this.foot=document.id(this.tfoot.rows[0]);
}this.options.rows.each(function(a){this.push(a);},this);},toElement:function(){return this.element;},empty:function(){this.body.empty();return this;},set:function(e,a){var d=(e=="headers")?"tHead":"tFoot",b=d.toLowerCase();
this[b]=(document.id(this.element[d])||new Element(b).inject(this.element,"top")).empty();var c=this.push(a,{},this[b],e=="headers"?"th":"td");if(e=="headers"){this.head=this.getHead();
}else{this.foot=this.getHead();}return c;},getHead:function(){var a=this.thead.rows;return a.length>1?$$(a):a.length?document.id(a[0]):false;},setHeaders:function(a){this.set("headers",a);
return this;},setFooters:function(a){this.set("footers",a);return this;},update:function(d,e,a){var b=d.getChildren(a||"td"),c=b.length-1;e.each(function(i,f){var j=b[f]||new Element(a||"td").inject(d),h=(i?i.content:"")||i,g=typeOf(h);
if(i&&i.properties){j.set(i.properties);}if(/(element(s?)|array|collection)/.test(g)){j.empty().adopt(h);}else{j.set("html",h);}if(f>c){b.push(j);}else{b[f]=j;
}});return{tr:d,tds:b};},push:function(e,c,d,a,b){if(typeOf(e)=="element"&&e.get("tag")=="tr"){e.inject(d||this.body,b);return{tr:e,tds:e.getChildren("td")};
}return this.update(new Element("tr",c).inject(d||this.body,b),e,a);},pushMany:function(d,c,e,a,b){return d.map(function(f){return this.push(f,c,e,a,b);
},this);}});["adopt","inject","wraps","grab","replaces","dispose"].each(function(a){HtmlTable.implement(a,function(){this.element[a].apply(this.element,arguments);
return this;});});Element.implement({isDisplayed:function(){return this.getStyle("display")!="none";},isVisible:function(){var a=this.offsetWidth,b=this.offsetHeight;
return(a==0&&b==0)?false:(a>0&&b>0)?true:this.style.display!="none";},toggle:function(){return this[this.isDisplayed()?"hide":"show"]();},hide:function(){var b;
try{b=this.getStyle("display");}catch(a){}if(b=="none"){return this;}return this.store("element:_originalDisplay",b||"").setStyle("display","none");},show:function(a){if(!a&&this.isDisplayed()){return this;
}a=a||this.retrieve("element:_originalDisplay")||"block";return this.setStyle("display",(a=="none")?"block":a);},swapClass:function(a,b){return this.removeClass(a).addClass(b);
}});Document.implement({clearSelection:function(){if(window.getSelection){var a=window.getSelection();if(a&&a.removeAllRanges){a.removeAllRanges();}}else{if(document.selection&&document.selection.empty){try{document.selection.empty();
}catch(b){}}}}});Class.refactor=function(b,a){Object.each(a,function(e,d){var c=b.prototype[d];c=(c&&c.$origin)||c||function(){};b.implement(d,(typeof e=="function")?function(){var f=this.previous;
this.previous=c;var g=e.apply(this,arguments);this.previous=f;return g;}:e);});return b;};HtmlTable=Class.refactor(HtmlTable,{options:{classZebra:"table-tr-odd",zebra:true,zebraOnlyVisibleRows:true},initialize:function(){this.previous.apply(this,arguments);
if(this.occluded){return this.occluded;}if(this.options.zebra){this.updateZebras();}},updateZebras:function(){var a=0;Array.each(this.body.rows,function(b){if(!this.options.zebraOnlyVisibleRows||b.isDisplayed()){this.zebra(b,a++);
}},this);},setRowStyle:function(b,a){if(this.previous){this.previous(b,a);}this.zebra(b,a);},zebra:function(b,a){return b[((a%2)?"remove":"add")+"Class"](this.options.classZebra);
},push:function(){var a=this.previous.apply(this,arguments);if(this.options.zebra){this.updateZebras();}return a;}});