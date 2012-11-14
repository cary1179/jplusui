/** * @author xuld */imports("Controls.Form.ListBox");using("Controls.Core.ListControl");/** * 表示一个下拉菜单。用于 Suggest 和 ComboBox 组件。 * @extends ListControl */var DropDownMenu = ListControl.extend({    xtype: "listbox",    /**     * 当选中一个值时执行。     * @param {Dom} item 即将选中的项。     * @protected virtual     */    onSelect: function (item) {        return this.trigger('select', item);    },    /**     * 获取当前高亮项。     */    getHovering: function () {        return this._hovering;    },    /**     * 重新设置当前高亮项。     */    setHovering: function (item) {        var clazz = 'x-' + this.xtype + '-hover';        if (this._hovering) {            this._hovering.removeClass(clazz);        }        this._hovering = item ? item.addClass(clazz) : null;        return this;    },    /**	 * 处理上下按键。	 */    handlerUpDown: function (next) {        var item = this._hovering;        if (item) {            item = item[next ? 'next' : 'prev']();        }        if (!item) {            item = this[next ? 'first' : 'last']();        }        return this.setHovering(item);    },    /**	 * 处理回车键。	 */	handlerEnter: function(){		this.onSelect(this.getHovering());	},    /**     * 设置当前下拉菜单的所有者。绑定所有者的相关事件。     */    init: function(){    	    	// 执行父类的构造函数。    	ListControl.prototype.init.apply(this, arguments);    	    	// 设置鼠标移到某项后高亮某项。        this.itemOn('mouseover', this.setHovering);                // 绑定下拉菜单的点击事件        this.itemOn('mousedown', this.onSelect);		    }}).addEvents('select');