/** * @author  */imports("Controls.Form.UpDown");using("Controls.Form.CombinedTextBox");var UpDown = CombinedTextBox.extend({		_bindEvent: function(d, fn){		var me = this;		d = this.menuButton.find('.x-combinedtextbox-menu-updown-' + d).dom;				d.onmousedown = function(){			if(me.getDisabled())				return;			me[fn]();			if(me.timer)				clearInterval(me.timer);			me.timer = setTimeout(function(){				me.timer = setInterval(function(){me[fn]();}, me.speed);			}, me.duration);		};				d.onmouseout = d.onmouseup = function(){			clearTimeout(me.timer);			clearInterval(me.timer);			me.timer = 0;		};	},		init: function(options){		this.base('init');		this.menuButton = Dom.parse('<span class="x-combinedtextbox-menu x-combinedtextbox-menu-updown"><a href="javascript://��;" class="x-combinedtextbox-menu-updown-up"></a><a href="javascript://��;" class="x-combinedtextbox-menu-updown-down"></a></span>');		this._bindEvent('up', 'onUp');		this._bindEvent('down', 'onDown');	},		speed: 90,		duration: 600,		onUp: Function.empty,		onDown: Function.empty	});