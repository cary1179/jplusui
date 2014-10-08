/**
 * @author xuld
 * @fileOverview 提供 DOM 操作的辅助函数。
 */

//#include core/core.js
//#include core/class.js

/**
 * 提供操作 DOM 的静态高效方法。
 */
var Dom = {

    // #region Dom Ready

    /**
     * 设置在 DOM 解析完成后的回调函数。
     * @param {Function} callback 当 DOM 解析完成后的回调函数。
     */
    ready: function ( /*Function*/callback) {
        if (/complete|loaded|interactive/.test(document.readyState) && document.body) {
            callback.call(document);
        } else {
            document.addEventListener('DOMContentLoaded', callback, false);
        }
    },

    // #endregion

    // #region 选择器

    /**
	 * 执行一个 CSS 选择器，返回所有匹配的节点列表。
	 * @param {String} selector 要执行的 CSS 选择器。
	 * @param {Document} context 执行的上下文文档。
	 * @return {NodeList} 返回匹配的节点列表。
	 * @static
	 * @example
	 * 找到所有 p 元素。
	 * #####HTML:
	 * <pre lang="htm" format="none">
	 * &lt;p&gt;one&lt;/p&gt; &lt;div&gt;&lt;p&gt;two&lt;/p&gt;&lt;/div&gt; &lt;p&gt;three&lt;/p&gt;
	 * </pre>
	 * 
	 * #####Javascript:
	 * <pre>
	 * Dom.query("p");
	 * </pre>
	 * 
	 * #####结果:
	 * <pre lang="htm" format="none">
	 * [  &lt;p&gt;one&lt;/p&gt; ,&lt;p&gt;two&lt;/p&gt;, &lt;p&gt;three&lt;/p&gt;  ]
	 * </pre>
	 * 
	 * <br>
	 * 找到所有 p 元素，并且这些元素都必须是 div 元素的子元素。
	 * #####HTML:
	 * <pre lang="htm" format="none">
	 * &lt;p&gt;one&lt;/p&gt; &lt;div&gt;&lt;p&gt;two&lt;/p&gt;&lt;/div&gt; &lt;p&gt;three&lt;/p&gt;</pre>
	 * 
	 * #####Javascript:
	 * <pre>
	 * Dom.query("div &gt; p");
	 * </pre>
	 * 
	 * #####结果:
	 * <pre lang="htm" format="none">
	 * [ &lt;p&gt;two&lt;/p&gt; ]
	 * </pre>
	 * 
	 * <br>
	 * 查找所有的单选按钮(即: type 值为 radio 的 input 元素)。
	 * <pre>Dom.query("input[type=radio]");</pre>
	 */
    query: function (selector, context) {
        return (context || document).querySelectorAll(selector);
    },

    /**
	 * 执行一个 CSS 选择器，返回匹配的第一个节点。
	 * @param {String} selector 要执行的 CSS 选择器。
	 * @param {Document} context 执行的上下文文档。
	 * @return {Element} 返回匹配的节点。
	 */
    find: function (selector, context) {
        return (context || document).querySelector(selector);
    },

    /**
	 * 根据 *id* 获取节点。
	 * @param {String} id 要获取元素的 id。
	 * @return {Element} 返回匹配的节点。
	 * @static
	 * @example
	 * 找到 id 为 a 的元素。
	 * #####HTML:
	 * <pre lang="htm" format="none">
	 * &lt;p id="a"&gt;once&lt;/p&gt; &lt;div&gt;&lt;p&gt;two&lt;/p&gt;&lt;/div&gt; &lt;p&gt;three&lt;/p&gt;
	 * </pre>
	 * #####JavaScript:
	 * <pre>Dom.get("a");</pre>
	 * #####结果:
	 * <pre>{&lt;p id="a"&gt;once&lt;/p&gt;}</pre>
	 * 
	 * <br>
	 * 返回 id 为 a1 的 DOM 对象
	 * #####HTML:
	 * <pre lang="htm" format="none">&lt;p id="a1"&gt;&lt;/p&gt; &lt;p id="a2"&gt;&lt;/p&gt; </pre>
	 *
	 * #####JavaScript:
	 * <pre>Dom.get(document.getElecmentById('a1')) // 等效于 Dom.get('a1')</pre>
	 * <pre>Dom.get(['a1', 'a2']); // 等效于 Dom.get('a1')</pre>
	 * <pre>Dom.get(Dom.get('a1')); // 等效于 Dom.get('a1')</pre>
	 * 
	 * #####结果:
	 * <pre>{&lt;p id="a1"&gt;&lt;/p&gt;}</pre>
	 */
    get: function (id) {
        return document.getElementById(id);
    },

    /**
     * 检查当前 Dom 对象是否符合指定的表达式。
     * @param {String} String
     * @return {Boolean} 如果匹配表达式就返回 true，否则返回  false 。
     * @example
     * 由于input元素的父元素是一个表单元素，所以返回true。
     * #####HTML:
     * <pre lang="htm" format="none">&lt;form&gt;&lt;input type="checkbox" /&gt;&lt;/form&gt;</pre>
     * #####JavaScript:
     * <pre>Dom.matches(Dom.find('input'), "input")</pre>
     * #####结果:
     * <pre lang="htm" format="none">true</pre>
     */
    matches: function (elem, selector, context) {

        // 基于原生的判断。
        var nativeMatchesSelector = elem.matchesSelector || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.oMatchesSelector;
        if (nativeMatchesSelector) {
            return nativeMatchesSelector.call(elem, selector);
        }

        // 原生不支持：使用内置的判断。
        var parent = elem.parentNode, tempParent = !parent && (context || document).body;
        tempParent && tempParent.appendChild(elem);
        try {
            return Array.prototype.indexOf.call(Dom.query(selector, parent), elem) >= 0;
        } finally {
            tempParent && tempParent.removeChild(elem);
        }
        
    },

    // #endregion

    // #region 解析

    /**
     * 解析一个 html 字符串，返回相应的 DOM 对象。
     * @param {String} html 要解析的 HTML 字符串。如果解析的字符串是一个 HTML 字符串，则此函数会忽略字符串前后的空格。
     * @return {Element} 返回包含所有已解析的节点的 DOM 对象。
     * @static
     */
    parse: function (/*String*/html, context) {
        context = context && context !== document ? context.createElement('div') : (Dom.parseContainer || (Dom.parseContainer = document.createElement('div')));
        context.innerHTML = html;
        return context.firstChild;
    },

    // #endregion

    // #region 事件

    /**
     * 为指定元素添加一个事件监听器。
     * @param {Element} elem 要处理的元素。
     * @param {String} eventName 要添加的事件名。
     * @param {Function} eventListener 要添加的事件监听器。
     */
    on: function ( /*Element*/elem, eventName, /*Function*/eventListener) {
        elem.addEventListener(eventName, eventListener, false);
    },

    /**
     * 删除指定元素的一个或多个事件监听器。
     * @param {Element} elem 要处理的元素。
     * @param {String} eventName 要删除的事件名。
     * @param {Function} eventListener 要删除的事件处理函数。
     */
    off: function ( /*Element*/elem, eventName, /*Function*/eventListener) {
        elem.removeEventListener(eventName, eventListener, false);
    },

    /**
     * 手动触发一个监听器。
     * @param {Element} elem 要处理的元素。
     * @param {String} eventName 要触发的事件名。
     * @param {Object} eventArgs 传递给监听器的事件对象。
     */
    trigger: function ( /*Element*/elem, eventName, eventArgs) {
        var eventFix = Dom.triggerFix;
        if (!eventFix) {
            Dom.triggerFix = eventFix = {};
            eventFix.click = eventFix.mousedown = eventFix.mouseup = eventFix.mousemove = 'MouseEvents';
        }

        var event = document.createEvent(eventFix[eventName] || 'Events'),
            bubbles = true;
        for (var name in eventArgs) {
            name === 'bubbles' ? (bubbles = !!e[name]) : (event[name] = eventArgs[name]);
        }
        event.initEvent(eventName, bubbles, true);
        elem.dispatchEvent(event);
    },

    // #endregion

    // #region 遍历

    /**
     * 判断指定节点之后有无存在子节点。
     * @param {Element} elem 节点。
     * @param {Element} child 子节点。
     * @return {Boolean} 如果确实存在子节点，则返回 true ， 否则返回 false 。
     * @static
     */
    contains: function (/*Node*/node, /*Node*/child) {
        return node.contains(child);
    },

    /**
     * 获取当前 Dom 对象及父节点对象中第一个满足指定 CSS 选择器或函数的节点。
     * @param {Node} node 节点。
     * @param {String} selector 用于判断的元素的 CSS 选择器。
     * @param {Node} [context=document] 只在指定的节点内搜索此元素。
     * @return {Node} 如果当前节点满足要求，则返回当前节点，否则返回一个匹配的父节点对象。如果不存在，则返回 null 。
     * @remark
     * closest 和 parent 最大区别就是 closest 会测试当前的元素。
     */
    closest: function (/*Node*/node, selector, context) {
        while (node) {

            // 如果 node 到达了指定上下文，则停止查找。
            if (context && node === context) {
                break;
            }

            if (Dom.matches(node, selector)) {
                break;
            }

            node = node.parentNode;
        }
        return node;
    },
    
    /**
     * 获取当前 Dom 对象的父节点对象。
     * @param {Integer/String/Function/Boolean} [filter] 用于查找子元素的 CSS 选择器 或者 元素在 Dom 对象中的索引 或者 用于筛选元素的过滤函数 或者 true 则同时接收包含文本节点的所有节点。
     * @return {Dom} 返回一个节点对象。如果不存在，则返回 null 。
     * @example
     * 找到每个span元素的所有祖先元素。
     * #####HTML:
     * <pre lang="htm" format="none">&lt;html&gt;&lt;body&gt;&lt;div&gt;&lt;p&gt;&lt;span&gt;Hello&lt;/span&gt;&lt;/p&gt;&lt;span&gt;Hello Again&lt;/span&gt;&lt;/div&gt;&lt;/body&gt;&lt;/html&gt;</pre>
     * #####JavaScript:
     * <pre>Dom.find("span").parent()</pre>
     */
    parent: function (elem) {
        return elem.parentElement;
    },
    
    /**
     * 获取当前 Dom 对象的第一个子节点对象。
     * @param {Integer/String/Function/Boolean} [filter] 用于查找子元素的 CSS 选择器 或者 元素在Control对象中的索引 或者 用于筛选元素的过滤函数 或者 true 则同时接收包含文本节点的所有节点。
     * @return {Dom} 返回一个节点对象。如果不存在，则返回 null 。
     * @example
     * 获取匹配的第二个元素
     * #####HTML:
     * <pre lang="htm" format="none">&lt;p&gt; This is just a test.&lt;/p&gt; &lt;p&gt; So is this&lt;/p&gt;</pre>
     * #####JavaScript:
     * <pre>Dom.query("p").first(1)</pre>
     * #####结果:
     * <pre lang="htm" format="none">[ &lt;p&gt; So is this&lt;/p&gt; ]</pre>
     */
    first: function (elem) {
        return elem.firstElementChild;
    },

    /**
     * 获取当前 Dom 对象的最后一个子节点对象。
     * @param {Integer/String/Function/Boolean} [filter] 用于查找子元素的 CSS 选择器 或者 元素在Control对象中的索引 或者 用于筛选元素的过滤函数 或者 true 则同时接收包含文本节点的所有节点。
     * @return {Dom} 返回一个节点对象。如果不存在，则返回 null 。
     * @example
     * 获取匹配的第二个元素
     * #####HTML:
     * <pre lang="htm" format="none">&lt;p&gt; This is just a test.&lt;/p&gt; &lt;p&gt; So is this&lt;/p&gt;</pre>
     * #####JavaScript:
     * <pre>Dom.query("p").getChild(1)</pre>
     * #####结果:
     * <pre lang="htm" format="none">[ &lt;p&gt; So is this&lt;/p&gt; ]</pre>
     */
    last: function (elem) {
        return elem.lastElementChild;
    },

    /**
     * 获取当前 Dom 对象的下一个相邻节点对象。
     * @param {Integer/String/Function/Boolean} [filter] 用于查找子元素的 CSS 选择器 或者 元素在Control对象中的索引 或者 用于筛选元素的过滤函数 或者 true 则同时接收包含文本节点的所有节点。
     * @return {Dom} 返回一个节点对象。如果不存在，则返回 null 。
     * @example
     * 找到每个段落的后面紧邻的同辈元素。
     * #####HTML:
     * <pre lang="htm" format="none">&lt;p&gt;Hello&lt;/p&gt;&lt;p&gt;Hello Again&lt;/p&gt;&lt;div&gt;&lt;span&gt;And Again&lt;/span&gt;&lt;/div&gt;</pre>
     * #####JavaScript:
     * <pre>Dom.query("p").getNext()</pre>
     * #####结果:
     * <pre lang="htm" format="none">[ &lt;p&gt;Hello Again&lt;/p&gt;, &lt;div&gt;&lt;span&gt;And Again&lt;/span&gt;&lt;/div&gt; ]</pre>
     */
    next: function (elem) {
        return elem.nextElementSibling;
    },

    /**
     * 获取当前 Dom 对象的上一个相邻的节点对象。
     * @param {Integer/String/Function/Boolean} [filter] 用于查找子元素的 CSS 选择器 或者 元素在Control对象中的索引 或者 用于筛选元素的过滤函数 或者 true 则同时接收包含文本节点的所有节点。
     * @return {Dom} 返回一个节点对象。如果不存在，则返回 null 。
     * @example
     * 找到每个段落紧邻的前一个同辈元素。
     * #####HTML:
     * <pre lang="htm" format="none">&lt;p&gt;Hello&lt;/p&gt;&lt;div&gt;&lt;span&gt;Hello Again&lt;/span&gt;&lt;/div&gt;&lt;p&gt;And Again&lt;/p&gt;</pre>
     * #####JavaScript:
     * <pre>Dom.query("p").getPrevious()</pre>
     * #####结果:
     * <pre lang="htm" format="none">[ &lt;div&gt;&lt;span&gt;Hello Again&lt;/span&gt;&lt;/div&gt; ]</pre>
     *
     * 找到每个段落紧邻的前一个同辈元素中类名为selected的元素。
     * #####HTML:
     * <pre lang="htm" format="none">&lt;div&gt;&lt;span&gt;Hello&lt;/span&gt;&lt;/div&gt;&lt;p class="selected"&gt;Hello Again&lt;/p&gt;&lt;p&gt;And Again&lt;/p&gt;</pre>
     * #####JavaScript:
     * <pre>Dom.query("p").getPrevious("div")</pre>
     * #####结果:
     * <pre lang="htm" format="none">[ &lt;p class="selected"&gt;Hello Again&lt;/p&gt; ]</pre>
     */
    prev: function (elem) {
        return elem.previousElementSibling;
    },
    
    /**
     * 插入一个HTML 到末尾。
     * @param {String/Node/Dom} html 要插入的内容。
     * @return {Dom} 返回插入的新节点对象。
     */
    append: function (node, html) {
        var c = Dom.parseNode(html, node).firstChild;
        while (c) {
            var next = c.nextSibling;
            node.appendChild(c);
            c = next;
        }
    },

    /**
     * 插入一个HTML 到顶部。
     * @param {String/Node/Dom} html 要插入的内容。
     * @return {Dom} 返回插入的新节点对象。
     */
    prepend: function (node, html) {
        var c = Dom.parseNode(html, node).firstChild, p = node.firstChild;
        while (c) {
            var next = c.nextSibling;
            p = node.insertBefore(c, p);
            c = next;
        }
    },

    /**
     * 插入一个HTML 到前面。
     * @param {String/Node/Dom} html 要插入的内容。
     * @return {Dom} 返回插入的新节点对象。
     */
    before: function (node, html) {
        // #assert node.parentNode, "只有存在父节点的才能插入节点到其前面"
        var c = Dom.parseNode(html, node).firstChild, p = node.parentNode;
        while (c) {
            var next = c.nextSibling;
            p.insertBefore(c, node);
            c = next;
        }
    },

    /**
     * 插入一个HTML 到后面。
     * @param {String/Node/Dom} html 要插入的内容。
     * @return {Dom} 返回插入的新节点对象。
     */
    after: function (node, html) {
        Dom.before(node.nextSibling, html);
    },
    
    /**
     * 移除当前 Dom 对象或其子对象。
     * @param {Dom} [child] 如果指定了子对象，则删除此对象。
     * @return this
     * @see #dispose
     * @remark
     * 这个方法不会彻底移除 Dom 对象，而只是暂时将其从 Dom 树分离。
     * 如果需要彻底删除 Dom 对象，使用 {@link #dispose}方法。
     * @example
     * 从DOM中把所有段落删除。
     * #####HTML:
     * <pre lang="htm" format="none">&lt;p&gt;Hello&lt;/p&gt; how are &lt;p&gt;you?&lt;/p&gt;</pre>
     * #####JavaScript:
     * <pre>Dom.query("p").remove();</pre>
     * #####结果:
     * <pre lang="htm" format="none">how are</pre>
     *
     * 从DOM中把带有hello类的段落删除
     * #####HTML:
     * <pre lang="htm" format="none">&lt;p class="hello"&gt;Hello&lt;/p&gt; how are &lt;p&gt;you?&lt;/p&gt;</pre>
     * #####JavaScript:
     * <pre>Dom.query("p").remove(".hello");</pre>
     * #####结果:
     * <pre lang="htm" format="none">how are &lt;p&gt;you?&lt;/p&gt;</pre>
     */
    remove: function (node) {
        node.parentNode && node.parentNode.removeChild(node);
    },
    
    /**
     * 创建并返回当前 Dom 对象的副本。
     * @param {Boolean} deep=true 是否复制子元素。
     * @param {Boolean} cloneDataAndEvent=false 是否复制数据和事件。
     * @param {Boolean} keepId=false 是否复制 id 。
     * @return {Dom} 新 Dom 对象。
     *
     * @example
     * 克隆所有b元素（并选中这些克隆的副本），然后将它们前置到所有段落中。
     * #####HTML:
     * <pre lang="htm" format="none">&lt;b&gt;Hello&lt;/b&gt;&lt;p&gt;, how are you?&lt;/p&gt;</pre>
     * #####JavaScript:
     * <pre>Dom.query("b").clone().prependTo("p");</pre>
     * #####结果:
     * <pre lang="htm" format="none">&lt;b&gt;Hello&lt;/b&gt;&lt;p&gt;&lt;b&gt;Hello&lt;/b&gt;, how are you?&lt;/p&gt;</pre>
     */
    clone: function (elem, deep) {
        return elem.cloneNode(deep !== false);
    },

    // #endregion
    
    // #region 样式和属性

    /**
     * 读取当前样式为字符串。
     * @param {Element} elem 要获取的元素。
     * @param {String} camelizedCssPropertyName CSS 属性名。格式必须为骆驼格式。
     * @return {String} 字符串。
     */
    styleString: function (/*Element*/elem, camelizedCssPropertyName) {
        return elem.style[camelizedCssPropertyName] || getComputedStyle(elem, '')[camelizedCssPropertyName];
    },

    /**
     * 读取当前样式为数字。
     * @param {Element} elem 要获取的元素。
     * @param {String} camelizedCssPropertyName CSS 属性名。格式必须为骆驼格式。
     * @return {String} 字符串。
     */
    styleNumber: function (/*Element*/elem, camelizedCssPropertyName) {
        var value = elem.style[camelizedCssPropertyName];
        return value && (value = parseFloat(value)) != null ? value : (parseFloat(getComputedStyle(elem, '')[camelizedCssPropertyName]) || 0);
    },
    
    /**
     * 到骆驼模式。
     * @param {String} name 匹配的内容。
     * @return {String} 返回的内容。
     */
    camelCase: function (name) {
        return name.replace(/-+(\w?)/g, function (match, chr) { return chr.toUpperCase() });
    },

    /**
     * 获取指定节点的样式。
     * @param {Element} elem 要获取的元素。
     * @param {String} cssPropertyName CSS 属性名。
     */
    getStyle: function (/*Element*/elem, /*String*/cssPropertyName) {
        return Dom.styleString(elem, Dom.camelCase(cssPropertyName));
    },

    /**
     * 设置一个样式属性的值。
     * @param {String} cssPropertyName CSS 属性名或 CSS 字符串。
     * @param {String/Number} value CSS属性值， 数字如果不加单位，则会自动添加像素单位。
     * @return this
     * @example
     * 将所有段落的字体颜色设为红色并且背景为蓝色。
     * <pre>Dom.query("p").setStyle('color', "#ff0011");</pre>
     */
    setStyle: function (/*Element*/elem, /*String*/cssPropertyName, value) {
    
        // 将属性名转为骆驼形式。
        cssPropertyName = Dom.camelCase(cssPropertyName);

        // 为数字自动添加 px 单位。
        if (value != null && value.constructor === Number) {
            var styleNumbers = Dom.styleNumbers;
            if (!styleNumbers) {
                Dom.styleNumbers = styleNumbers = {};
                'fillOpacity fontWeight lineHeight opacity orphans widows zIndex columnCount zoom'.replace(/\b\w+\b/g, function (value) {
                    styleNumbers[value] = 1;
                });
            }
            if (!(cssPropertyName in styleNumbers)) {
                value += 'px';
            }
        }

        elem.style[cssPropertyName] = value;

    },

    /**
     * 设置一个元素可移动。
     * @param {Element} elem 要设置的节点。
     * @static
     */
    movable: function (elem) {
        if (!/^(?:abs|fix)/.test(Dom.styleString(elem, "position")))
            elem.style.position = "relative";
    },

    /**
     * 判断当前元素是否是隐藏的。
     * @param {Element} elem 要判断的元素。
     * @return {Boolean} 当前元素已经隐藏返回 true，否则返回  false 。
     */
    isHidden: function (/*Element*/elem) {
        return Dom.styleString(elem, 'display') === 'none';
    },

    /**
     * 通过设置 display 属性来显示元素。
     * @param {Element} elem 元素。
     * @static
     */
    show: function (/*Element*/elem) {

        // 普通元素 设置为 空， 因为我们不知道这个元素本来的 display 是 inline 还是 block
        elem.style.display = '';

        // 如果元素的 display 仍然为 none , 说明通过 CSS 实现的隐藏。这里默认将元素恢复为 block。
        if (isHidden(elem)) {
            var defaultDisplay = elem.style.defaultDisplay;
            if (!defaultDisplay) {
                var defaultDisplayCache = Dom.defaultDisplayCache || (Dom.defaultDisplayCache = {});
                defaultDisplay = defaultDisplayCache[elem.nodeName];
                if (!defaultDisplay) {
                    var elem = document.createElement(nodeName);
                    document.body.appendChild(elem);
                    defaultDisplay = Dom.styleString(elem);
                    if (defaultDisplay === 'none') {
                        defaultDisplay = 'block';
                    }
                    defaultDisplayCache[nodeName] = defaultDisplay;
                    document.body.removeChild(elem);
                }
            }
            elem.style.display = defaultDisplay;
        }

    },

    /**
     * 通过设置 display 属性来隐藏元素。
     * @param {Element} elem 元素。
     * @static
     */
    hide: function (/*Element*/elem) {
        var currentDisplay = Dom.styleString(elem, 'display');
        if (currentDisplay !== 'none') {
            elem.style.defaultDisplay = currentDisplay;
            elem.style.display = 'none';
        }
    },

    /**
     * 检查是否含指定类名。
     * @param {Element} elem 要测试的元素。
     * @param {String} className 类名。
     * @return {Boolean} 如果存在返回 true。
     * @static
     */
    hasClass: function (/*Element*/elem, className) {
        // #assert className && (!className.indexOf || !/[\s\r\n]/.test(className)), className 不能为空，且不允许有空格和换行；如果需要判断 2 个 class 同时存在，可以调用两次本函数： if(hasClass('A') && hasClass('B')) ...");
        return elem.classList.contains(className);
    },

    /**
     * 为当前 Dom 对象添加指定的 Css 类名。
     * @param {String} className 一个或多个要添加到元素中的CSS类名，用空格分开。
     * @return this
     * @example
     * 为匹配的元素加上 'selected' 类。
     * #####HTML:
     * <pre lang="htm" format="none">&lt;p&gt;Hello&lt;/p&gt;</pre>
     * #####JavaScript:
     * <pre>Dom.query("p").addClass("selected");</pre>
     * #####结果:
     * <pre lang="htm" format="none">[ &lt;p class="selected"&gt;Hello&lt;/p&gt; ]</pre>
     *
     * 为匹配的元素加上 selected highlight 类。
     * #####HTML:
     * <pre lang="htm" format="none">&lt;p&gt;Hello&lt;/p&gt;</pre>
     * #####JavaScript:
     * <pre>Dom.query("p").addClass("selected highlight");</pre>
     * #####结果:
     * <pre lang="htm" format="none">[ &lt;p class="selected highlight"&gt;Hello&lt;/p&gt; ]</pre>
     */
    addClass: function (/*Element*/elem, className) {
        elem.classList.add(className);
    },

    /**
     * 从当前 Dom 对象中删除全部或者指定的类。
     * @param {String} [className] 一个或多个要删除的CSS类名，用空格分开。如果不提供此参数，将清空 className 。
     * @return this
     * @example
     * 从匹配的元素中删除 'selected' 类
     * #####HTML:
     * <pre lang="htm" format="none">
     * &lt;p class="selected first"&gt;Hello&lt;/p&gt;
     * </pre>
     * #####JavaScript:
     * <pre>Dom.query("p").removeClass("selected");</pre>
     * #####结果:
     * <pre lang="htm" format="none">
     * [ &lt;p class="first"&gt;Hello&lt;/p&gt; ]
     * </pre>
     */
    removeClass: function (/*Element*/elem, className) {
        className ? elem.classList.remove(className) : (elem.className = '');
    },

    /**
     * 如果存在（不存在）就删除（添加）一个类。
     * @param {String} className CSS类名。
     * @param {Boolean} [toggle] 自定义切换的方式。如果为 true， 则加上类名，否则删除。
     * @return this
     * @see #addClass
     * @see #removeClass
     * @example
     * 为匹配的元素切换 'selected' 类
     * #####HTML:
     * <pre lang="htm" format="none">&lt;p&gt;Hello&lt;/p&gt;&lt;p class="selected"&gt;Hello Again&lt;/p&gt;</pre>
     * #####JavaScript:
     * <pre>Dom.query("p").toggleClass("selected");</pre>
     * #####结果:
     * <pre lang="htm" format="none">[ &lt;p class="selected"&gt;Hello&lt;/p&gt;, &lt;p&gt;Hello Again&lt;/p&gt; ]</pre>
     */
    toggleClass: function (elem, className, value) {
        elem.classList.toggle(className, value);
    },

    _fixProp: function (name) {
        var propFix = Dom.propFix || (Dom.propFix = {
            'tabindex': 'tabIndex',
            'readonly': 'readOnly',
            'for': 'htmlFor',
            'class': 'className',
            'maxlength': 'maxLength',
            'cellspacing': 'cellSpacing',
            'cellpadding': 'cellPadding',
            'rowspan': 'rowSpan',
            'colspan': 'colSpan',
            'usemap': 'useMap',
            'frameborder': 'frameBorder',
            'contenteditable': 'contentEditable'
        });
        return propFix[name] || name;
    },

    /**
     * 获取元素的属性值。
     * @param {Element} elem 要获取的元素。
     * @param {String} name 要获取的属性名称。
     * @return {String} 返回属性值。如果元素没有相应属性，则返回 null 。
     * @static
     */
    getAttr: function ( /*Element*/elem, name) {

        // #assert 'readOnly tabIndex defaultChecked defaultSelected accessKey useMap contentEditable maxLength'.toLowerCase().indexOf(name) === -1, "属性 " + name + " 不能为全小写"

        name = Dom._fixProp(name);

        // 如果存在钩子，使用钩子获取属性。
        // 最后使用 defaultHook 获取。
        return name in elem ? elem[name] : elem.getAttribute(name);

    },

    /**
     * 设置或删除一个 HTML 属性值。
     * @param {String} name 要设置的属性名称。
     * @param {String} value 要设置的属性值。当设置为 null 时，删除此属性。
     * @return this
     * @example
     * 为所有图像设置src属性。
     * #####HTML:
     * <pre lang="htm" format="none">
     * &lt;img/&gt;
     * &lt;img/&gt;
     * </pre>
     * #####JavaScript:
     * <pre>Dom.query("img").setAttribute("src","test.jpg");</pre>
     * #####结果:
     * <pre lang="htm" format="none">[ &lt;img src= "test.jpg" /&gt; , &lt;img src= "test.jpg" /&gt; ]</pre>
     *
     * 将文档中图像的src属性删除
     * #####HTML:
     * <pre lang="htm" format="none">&lt;img src="test.jpg"/&gt;</pre>
     * #####JavaScript:
     * <pre>Dom.query("img").setAttribute("src");</pre>
     * #####结果:
     * <pre lang="htm" format="none">[ &lt;img /&gt; ]</pre>
     */
    setAttr: function (elem, name, value) {

        // #assert 'readOnly tabIndex defaultChecked defaultSelected accessKey useMap contentEditable maxLength'.toLowerCase().indexOf(name) === -1, "属性 " + name + " 不能为全小写"

        name = Dom._fixProp(name);

        if (name in elem) {
            elem[name] = value;
        } else if (value === null) {
            elem.removeAttribute(name);
        } else {
            elem.setAttribute(name, value);
        }
    },
    
    _fixText: function (node) {
        var textFix = Dom.textFix || (Dom.textFix = {
            'INPUT': 'value',
            'SELECT': 'value',
            'TEXTAREA': 'value',
            '#text': 'nodeValue',
            '#comment': 'nodeValue'
        });
        return textFix[node.nodeName] || 'textContent';
    },

    /**
     * 获取一个元素对应的文本。
     * @param {Element} node 元素。
     * @return {String} 值。对普通节点返回 text 属性。
     * @static
     */
    getText: function (/*Element*/node) {
        return node[Dom._fixText(node)] || '';
    },

    /**
     * 设置当前 Dom 对象的文本内容。对于输入框则设置其输入的值。
     * @param {String} 用于设置元素内容的文本。
     * @return this
     * @see #setHtml
     * @remark 与 {@link #setHtml} 类似, 但将编码 HTML (将 "&lt;" 和 "&gt;" 替换成相应的HTML实体)。
     * @example
     * 设定文本框的值。
     * #####HTML:
     * <pre lang="htm" format="none">&lt;input type="text"/&gt;</pre>
     * #####JavaScript:
     * <pre>Dom.query("input").setText("hello world!");</pre>
     */
    setText: function (/*Element*/node, value) {
        node[Dom._fixText(node)] = value;
    },

    /**
     * 获取指定节点的 Html。
     * @return {String} HTML 字符串。
     * @example
     * 获取 id="a" 的节点的内部 html。
     * #####HTML:
     * <pre lang="htm" format="none">&lt;div id="a"&gt;&lt;p/&gt;&lt;/div&gt;</pre>
     * #####JavaScript:
     * <pre>Dom.getHtml(document.body);</pre>
     * #####结果:
     * <pre lang="htm" format="none">"&lt;p/&gt;"</pre>
     */
    getHtml: function (/*Element*/elem) {
        return elem.innerHTML;
    },

    /**
     * 设置指定节点的 Html。
     * @param {String} value 要设置的 Html。
     * @example
     * 设置一个节点的内部 html
     * #####HTML:
     * <pre lang="htm" format="none">&lt;div id="a"&gt;&lt;p/&gt;&lt;/div&gt;</pre>
     * #####JavaScript:
     * <pre>Dom.get("a").setHtml("&lt;a/&gt;");</pre>
     * #####结果:
     * <pre lang="htm" format="none">&lt;div id="a"&gt;&lt;a/&gt;&lt;/div&gt;</pre>
     */
    setHtml: function (/*Element*/elem, value) {
        elem.innerHTML = value;
    },

    // #endregion
    
    // #region 节点定位和尺寸

    /**
     * 获取当前 Dom 对象的滚动区域大小。
     * @return {Point} 返回的对象包含两个整型属性：x 和 y。
     * @remark
     * getScrollSize 获取的值总是大于或的关于 getSize 的值。
     * 
     * 此方法对可见和隐藏元素均有效。
     */
    getScrollSize: function (elem) {
        var ret = null, elem, body;

        if (elem.nodeType === 9) {
            body = elem.body;
            elem = elem.documentElement;
            ret = {
                x: Math.max(elem.scrollWidth, body.scrollWidth, elem.clientWidth),
                y: Math.max(elem.scrollHeight, body.scrollHeight, elem.clientHeight)
            };
        } else {
            ret = {
                x: elem.scrollWidth,
                y: elem.scrollHeight
            };
        }

        return ret;
    },

    getDocumentScroll: function (doc) {
        var p, win;
        if ('pageXOffset' in (win = doc.defaultView || doc.parentWindow)) {
            p = {
                x: win.pageXOffset,
                y: win.pageYOffset
            };
        } else {
            elem = doc.documentElement;
            p = {
                x: elem.scrollLeft,
                y: elem.scrollTop
            };
        }

        return p;
    },

    /**
     * 获取当前 Dom 对象的相对位置。
     * @return {Point} 返回的对象包含两个整型属性：x 和 y。
     * @remark
     * 此方法只对可见元素有效。
     * 
     * 获取匹配元素相对父元素的偏移。
     * @example
     * 获取第一段的偏移
     * #####HTML:
     * <pre lang="htm" format="none">&lt;p&gt;Hello&lt;/p&gt;&lt;p&gt;2nd Paragraph&lt;/p&gt;</pre>
     * #####JavaScript:<pre>
     * var p = Dom.query("p").item(0);
     * var offset = p.getOffset();
     * trace( "left: " + offset.x + ", top: " + offset.y );
     * </pre>
     * #####结果:
     * <pre lang="htm" format="none">&lt;p&gt;Hello&lt;/p&gt;&lt;p&gt;left: 15, top: 15&lt;/p&gt;</pre>
     */
    getOffset: function (elem) {

        // 如果设置过 left top ，这是非常轻松的事。
        var left = Dom.styleString(elem, 'left'),
            top = Dom.styleString(elem, 'top');

        // 如果未设置过。
        if ((!left || !top || left === 'auto' || top === 'auto') && Dom.styleString(elem, "position") === 'absolute') {

            // 绝对定位需要返回绝对位置。
            top = Dom.offsetParent(elem);
            left = Dom.getPosition(elem);
            if (!/^(?:BODY|HTML|#document)$/i.test(top.nodeName)) {
                var t = Dom.getPosition(top);
                left.x -= t.x;
                lefy.y -= t.y;
            }
            left.x -= Dom.styleNumber(elem, 'marginLeft') + Dom.styleNumber(top, 'borderLeftWidth');
            left.y -= Dom.styleNumber(elem, 'marginTop') + Dom.styleNumber(top, 'borderTopWidth');

            return left;
        }

        // 碰到 auto ， 空 变为 0 。
        return {
            x: parseFloat(left) || 0,
            y: parseFloat(top) || 0
        };

    },

    /**
     * 设置当前 Dom 对象相对父元素的偏移。
     * @param {Point} value 要设置的 x, y 对象。
     * @return this
     * @remark
     * 此函数仅改变 CSS 中 left 和 top 的值。
     * 如果当前对象的 position 是static，则此函数无效。
     * 可以通过 {@link #setPosition} 强制修改 position, 或先调用 {@link Dom.movable} 来更改 position 。
     *
     * @example
     * 设置第一段的偏移。
     * #####HTML:
     * <pre lang="htm" format="none">&lt;p&gt;Hello&lt;/p&gt;&lt;p&gt;2nd Paragraph&lt;/p&gt;</pre>
     * #####JavaScript:
     * <pre>
     * Dom.query("p:first").setOffset({ x: 10, y: 30 });
     * </pre>
     * #####结果:
     * <pre lang="htm" format="none">&lt;p&gt;Hello&lt;/p&gt;&lt;p&gt;left: 15, top: 15&lt;/p&gt;</pre>
     */
    setOffset: function (elem, value) {

        ////assert(value, "Dom#setOffset(value): {value} 必须有 'x' 和 'y' 属性。", value);

        elem = elem.style;

        if (value.y != null)
            elem.top = value.y + 'px';

        if (value.x != null)
            elem.left = value.x + 'px';
    },

    /**
     * 获取当前 Dom 对象的滚动条的位置。
     * @return {Point} 返回的对象包含两个整型属性：x 和 y。
     * @remark
     * 此方法对可见和隐藏元素均有效。
     *
     * @example
     * 获取第一段相对滚动条顶部的偏移。
     * #####HTML:
     * <pre lang="htm" format="none">&lt;p&gt;Hello&lt;/p&gt;&lt;p&gt;2nd Paragraph&lt;/p&gt;</pre>
     * #####JavaScript:
     * <pre>
     * var p = Dom.query("p").item(0);
     * trace( "scrollTop:" + p.getScroll() );
     * </pre>
     * #####结果:
     * <pre lang="htm" format="none">
     * &lt;p&gt;Hello&lt;/p&gt;&lt;p&gt;scrollTop: 0&lt;/p&gt;
     * </pre>
     */
    getScroll: function (elem) {
        return elem.nodeType === 9 ? Dom.getDocumentScroll(elem) : {
            x: elem.scrollLeft,
            y: elem.scrollTop
        };
    },

    /**
     * 设置当前 Dom 对象的滚动条位置。
     * @param {Number/Point} x 要设置的水平坐标或一个包含 x、y 属性的对象。如果不设置，使用 null 。
     * @param {Number} y 要设置的垂直坐标。如果不设置，使用 null 。
     * @return this
     */
    setScroll: function (elem, value) {
        if (elem.nodeType !== 9) {
            if (value.x != null) elem.scrollLeft = value.x;
            if (value.y != null) elem.scrollTop = value.y;
        } else {
            var scroll = Dom.getDocumentScroll(elem);
            if (value.x == null)
                value.x = scroll.x;
            if (value.y == null)
                value.y = scroll.y;
            (elem.defaultView || elem.parentWindow).scrollTo(value.x, value.y);
        }
    }

    // #endregion

};
