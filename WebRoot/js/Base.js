/*!
 * Base.js v1.0
 * Site:http://www.suanliutudousi.com
 * Author:wyc
 * Email:673161921@qq.com
 * Date: 2017-01-14
 * 
 */
;
!(function(window, document) {
	function Base() {}
	/*去除字符串的前后空格*/
	if(!String.prototype.trim) {
		String.prototype.trim = function() {
			return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
			//\uFEFF为es5新增的空白符，\XA0是不间断空白符 &nbsp;
		};
	}
	Base.prototype = {
		/**
		 * 获取Id
		 * @param {Object} id
		 */
		getDom: function(id) {
			return document.getElementById(id);
		},
		/**
		 * 跨浏览器获取类名
		 * @param {Object} id
		 * @param {Object} clsName类名
		 */
		getClass: function(id, clsName) {
			var dom = Base.prototype.getDom(id),
				ele = dom ? dom : document;
			if(ele.querySelectorAll) {
				return ele.querySelectorAll("." + clsName);
			} else {
				var nodes = ele.getElementsByTagName("*"),
					arr = [];
				for(var i = 0, len = nodes.length; i < len; i++) {
					if(nodes[i].nodeType == 1) {
						cls = nodes[i].className.split(" "); //存放分割后的类名
						if(cls.length > 1) {
							for(var j = 0, clsL = cls.length; j < clsL; j++) {
								if(cls[j] == clsName) {
									arr.push(nodes[j]);
								}
							}
						} else if(cls.length == 1 && cls[0] == clsName) {
							arr.push(nodes[i]);
						} else {
							arr.push("\u5f53\u524d\u6ca1\u6709\u5339\u914d\u7684\u7c7b\u540d");
						}

					}
				}
				return arr;
			}

		},
		/**
		 * 跨浏览器添加事件处理程序
		 * @param {Object} ele元素
		 * @param {Object} type类型
		 * @param {Object} fn回调函数
		 */
		addHandler: function(ele, type, fn) { //handler什么操作
			if(ele != null) {
				if(ele.addEventListener) {
					ele.addEventListener(type, fn, false); //DOM2级事件处理程序
				} else if(ele.attachEvent) {
					ele.attachEvent('on' + type, fn); //IE事件处理程序
					// 具体问题和解决方法在我的博客http://www.suanliutudousi.com/2017/11/28/%e5%85%b3%e4%ba%8e%e5%8e%9f%e7%94%9fjs%e4%b8%adie%e7%9a%84attacheevent%e4%ba%8b%e4%bb%b6%e7%94%a8%e5%8c%bf%e5%90%8d%e5%87%bd%e6%95%b0%e6%94%b9%e5%8f%98this%e6%8c%87%e5%90%91%e5%90%8e%e4%b8%8d/
				} else {
					ele['on' + type] = fn;
				}
			}
		},
		/**
		 * 跨浏览器删除事件处理程序,fn 匿名函数不能删除
		 * @param {Object} ele元素
		 * @param {Object} type类型
		 * @param {Object} fn回调函数
		 */
		removeHandler: function(ele, type, fn) { //handler什么操作
			if(ele != null) {
				if(ele.removeEventListener) {
					ele.removeEventListener(type, fn, false); //DOM2级判断
				} else if(ele.detachEvent) {
					ele.detachEvent('on' + type, fn);
				} else {
					ele['on' + type] = null;
				}
			}
		},
		/**
		 * 跨浏览器获取事件对象
		 * @param {Object} event事件对象
		 */
		getEvent: function(event) { //怎么来获取兼容所有浏览器的事件对象
			return event ? event : window.event;
			//IE8以前的要用window.event
		},
		/**
		 * 获取事件类型
		 * @param {Object} event事件对象
		 */
		getType: function(event) { //获取事件的类型
			return event.type;
		},
		/**
		 * 跨浏览器用于获取事件的目标（即来自于那个元素）,2者都为属性,常用的有1绑定事件处理承租中改变ie的作用域,2mouseout和mouseover会用到
		 * @param {Object} event事件对象
		 */
		getTarget: function(event) {
			return event.target || event.srcElement;
		},

		/**
		 * 跨浏览器阻止默认事件，js中return false只能阻止默认事件,jq都可以阻止
		 * @param {Object} event事件对象
		 */
		preventDefault: function(event) { //阻止事件的默认行为
			var event = Base.prototype.getEvent(event);
			//			console.log("event"+event);
			if(event.preventDefault) {
				event.preventDefault(); //为DOM阻止
			} else {
				event.returnValue = false; //为IE阻止事件的默认行为，为false时阻止，true时不阻止
			}
		},
		/**
		 * 跨浏览器阻止冒泡
		 * @param {Object} event事件对象
		 */
		stopPropagation: function(event) { //阻止事件的冒泡
			var event = Base.prototype.getEvent(event);
			if(event.stopPropagation) { //为DOM阻止事件的冒泡
				event.stopPropagation();
			} else {
				event.cancelBubble = true; //为IE阻止事件的冒泡，为true时阻止，FALSE不阻止
			}
		},
		/**
		 * 获取元素相对于视口的水平左偏移量
		 * @param {Object} ele元素
		 */
		getOffsetLeft: function(ele) {
			if(ele != null) {
				var actualLeft = ele.offsetLeft; //距离父元素左边的距离
				var current = ele.offsetParent; //当前对象的父元素
				while(current !== null) {
					actualLeft += current.offsetLeft;
					current = current.offsetParent;
				}
			}
			return actualLeft;
			//查找当前元素的所有父元素,算出边距
		},
		/**
		 * 获取元素相对所有父元素的水平偏移量
		 * @param {Object} ele元素
		 */
		getOffsetTop: function(ele) {
			if(ele != null) {
				var actualTop = ele.offsetTop; //距离父元素上边的距离
				var current = ele.offsetParent; //当前对象的父元素
				while(current !== null) {
					actualTop += current.offsetTop;
					current = current.offsetParent;
				}
			}
			return actualTop;
			//查找当前元素的所有父元素,算出边距
		},
		/**
		 * 事件委托
		 * @param {Object} target接收事件的目标元素
		 * @param {Object} event事件对象
		 * @param {Object} fn回调函数
		 */
		delegateEvent: function(target, event, fn) {
			addEvent(document, event, function(e) {
				if(e.target.nodeName == target.toUpperCase()) {
					fn.call(e.target);
				}
			});
		},
		/**
		 * 跨浏览器获取视口大小，返回视口的宽度pageWidth和高度pageHeight
		 */
		getViewPort: function() {
			var pageWidth = window.innerWidth,
				pageHeight = window.innerHeight;
			if(typeof pageWidth != "number") {
				if(document.compatMode == "CSS1Compat") {
					pageWidth = document.documentElement.clientWidth;
					pageHeight = document.documentElement.clientHeight;
				} else {
					pageWidth = document.body.clientWidth;
					pageHeight = document.body.clientHeight;
				}
			}
			return {
				pageWidth: pageWidth,
				pageHeight: pageHeight
			};
		},
		/*返回文档高度*/
		/**
		 * 跨浏览器返回文档高度 ，返回文档宽度docWidth，文档高度docHeight
		 */
		getDocumentHeight: function() {
			var docHeight = null,
				docWidth = null;
			if(document.compatMode == "CSS1Compat") {
				docHeight = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight);
				docWidth = Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth);
			} else {
				docHeight = Math.max(document.body.scrollHeight, document.body.clientHeight);
				docWidth = Math.max(document.body.scrollWidth, document.body.clientWidth);

			}
			return {
				docWidth: docWidth,
				docHeight: docHeight
			};
		},
		/**
		 * 跨浏览器获取元素相当于视口的信息,若要相对于左边的。则为getBoundingClientRect().left
		 * @param {Object} ele元素
		 */
		getBoundingClientRect: function(ele) {
			if(ele != null) {
				var scrollTop = document.documentElement.scrollTop;
				var scrollLeft = document.documentElement.scrollLeft;
				if(ele.getBoundingClientRect) {
					if(typeof arguments.callee.offset != "number") {
						var scrollTop = document.documentElement.scrollTop;
						var temp = document.createElement("div");
						temp.style.cssText = "position:absolute;left: 0;top: 0;"
						document.body.appendChild(temp);
						arguments.callee.offset = -temp.getBoundingClientRect().top - scrollTop;
						document.body.removeChild(temp);
						temp = null;
					}
					var rect = ele.getBoundingClientRect();
					var offset = arguments.callee.offset;
					return {
						left: rect.left + offset,
						right: rect.right + offset,
						top: rect.top + offset,
						bottom: rect.bottom + offset
					};
				} else {
					var actualLeft = Base.prototype.getElementLeft(ele);
					var actualTop = Base.prototype.getElementTop(ele);
					return {
						left: actualLeft - scrollLeft,
						right: actualLeft + ele.offsetWidth - scrollLeft,
						top: actualTop - scrollTop,
						bottom: actualTop + ele.offsetHeight - scrollTop
					}
				}
			}
		},
		/**
		 * 获取style特性中的样式信息
		 * @param {Object} ele元素
		 * @param {Object} name样式名称
		 */
		getStyle: function(ele, name) {
			//如果先检测window.getComputedStyle  ie9+会先使用这个，但是返回的值有问题，偏小
			if(ele != null) {
				if(ele.currentStyle) {
					return ele.currentStyle[name];
				} else {
					//变量没有定义的话就会报错了 ，如果是对象的属性没有找到，则会返回undefined;
					var ua = navigator.userAgent;
					if(ua.indexOf("Firefox") == -1) { //说明不是ff
						return getComputedStyle(ele, null)[name];
						//如果没有设置值，获取的话会显示为真实值
					} else {
						var a = getComputedStyle(ele, null)[name],
							reg = /[A-z]/;
						return Math.ceil(Number(a.split(reg)[0])) + "px";
					}
				}
			}
		},
		/**
		 * 动态加载脚本
		 * @param {Object} code脚本代码
		 */
		loadScriptString: function(code) {
			var script = document.createElement("script");
			script.type = "text/javascript";
			try {
				script.appendChild(document.createTextNode(code));
			} catch(ex) {
				script.text = code;
				//兼容ie，ie将<script>视为一个特殊的元素，不允许DOM访问其子节点
			}
			document.body.appendChild(script);
		},
		/**
		 * 动态加载样式
		 * @param {Object} css代码
		 */
		loadStyleString: function(css) {
			var Style = document.createElement("style");
			Style.type = "text/css"; //如果未定义，ie9以下会报错
			try {
				Style.appendChild(document.createTextNode(css));
			} catch(ex) {
				Style.styleSheet.cssText = css; //ie

			}
			var head = document.getElementsByTagName("head")[0];
			head.appendChild(Style);
		},
		/**
		 * 跨浏览器兼容鼠标滚轮事件
		 * @param {Object} ele元素
		 */
		getMouseWheel: function(ele) {
			if(ele != null) {
				ele.onmousewheel = function(event) {
					var event = Base.prototype.getEvent(event);
					//火狐不支持,wheelData,wheelData向上为120,向下为-120
					//火狐的detail向上为-3,向下为3
					if(event.wheelDelta > 0 || event.detail < 0) {
						ele.style.height = ele.clientHeight - 10 + "px";
						console.log(ele.style.height);
					} else {
						ele.style.height = ele.clientHeight + 10 + "px";
						console.log(ele.style.height);
					}
					/*滚动条滚动时，如果浏览器有滚动条,则会滚动.这是浏览器的默认行为*/
					//当是在ff中还会出现问题，因为它是通过addEventListener添加的事件，不能通过return false取消默认事件
					event.preventDefault && event.preventDefault();
					//如果支持属性的话，就使用。取消狐火浏览器的默认事件

				};
				//ff需要榜单事件的话得用addEventListener;添加DOMMouseScroll
				Base.prototype.addHandler(ele, "DOMMouseScroll", ele.onmousewheel);
			}
		},
		/**
		 * 检测ie的版本，ie10以下提示升级
		 */
		browserVersion: function() {
			if(!("WebSocket" in window && 2 === window.WebSocket.CLOSING)) {
				var d = document.createElement("div");
				d.className = "browsehappy";
				d.innerHTML = '<div style="width:100%;height:50px;font-size:20px;line-height:50px;text-align:center;background-color:#E90D24;color:#fff;margin-bottom:40px;">\u7ecf\u68c0\u6d4b\u002c\u4f60\u7684\u6d4f\u89c8\u5668\u7248\u672c\u592a\u4f4e\uff01\u4e3a\u4e86\u4fdd\u8bc1\u826f\u597d\u7684\u4f53\u9a8c\u002c\u8bf7\u4f7f\u7528\u6700\u65b0\u7248\u672c\u7684\u8c37\u6b4c\u6d4f\u89c8\u5668 <a target="_blank" href="http://rj.baidu.com/soft/detail/14744.html?ald" style="background-color:#31b0d5;border-color: #269abc;text-decoration: none;padding: 6px 12px;background-image: none;border: 1px solid transparent;border-radius: 4px;color:#FFEB3B;">\u7acb\u5373\u5347\u7ea7</a></div>';
				var f = function() {
					var s = document.getElementsByTagName("body")[0];
					if("undefined" == typeof(s)) {
						setTimeout(f, 10);
					} else {
						s.insertBefore(d, s.firstChild);
					}
				};
				f();
			}
		},
		/**
		 * 获取客户区坐标位置，返会clientX，clientY
		 * @param {Object} event事件对象
		 */
		getClientCoordinates: function(event) {
			return {
				clientX: event.clientX,
				clientY: event.clientY
			}
		},
		/**
		 *跨浏览器获取事件发生时鼠标在页面上的坐标位置，返回pageX,pageY
		 * @param {Object} event
		 */
		getPageCoordinates: function(event) {
			/*获取事件是在页面中的什么位置发生的，包括滚动*/
			var pageX = event.pageX,
				pageY = event.pageY;
			if(pageX === undefined) {
				pageX = event.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft);
			}
			if(pageY === undefined) {
				pageY = event.clientY + (document.body.scrollLeft || document.documentElement.scrollLeft);
			}
			return {
				pageX: pageX,
				pageY: pageY
			}
		},
		/**
		 * 跨浏览器获取相对于电脑屏幕坐标位置，返回leftPos，topPos
		 */
		getScreenCoordinate: function() {
			var leftPos = (typeof window.screenLeft == "number") ? window.screenLeft : window.screenX;
			var topPos = (typeof window.screenTop == "number") ? window.screenTop : window.screenY
			return {
				leftPos: leftPos,
				topPos: topPos
			}
		},
		/**
		 * 批量创建全局变量
		 * @param {Object} name变量名
		 * @param {Object} len长度
		 * @param {Object} data变量值
		 */
		createVariables: function(name, len, data) {
			for(var i = 1; i <= len; i++) {
				window[name + i] = data;
			}
		},
		/**
		 * 跨浏览器获取相关元素信息，这个属性值对于mouseover和mouseout事件才包含值，对于其他事件,值为Null
		 * @param {Object} event事件对象
		 */
		getRelatedTarget: function(event) {
			if(event.relatedTarget) {
				return event.relatedTarget; //ie9以下不支持
			} else if(event.toElement) {
				return event.toElement;
			} else if(event.fromElement) {
				return event.fromElement;
			} else {
				return null; //其他事件
			}
		},
		/**
		 * 跨浏览器获取鼠标按钮信息，只有在mousedon和mouseup事件中会包含具体值,0表示鼠标主按钮,1表示鼠标滚轮,2表示次鼠标按钮
		 * @param {Object} event事件对象
		 */
		getMouseMethod: function(event) {
			if(document.implementation.hasFeature("MouseEvents", "2.0")) {
				return event.button;
			} else {
				switch(event.button) {
					case 0:
					case 1:
					case 3:
					case 5:
					case 7:
						return 0;
					case 2:
					case 6:
						return 2;
					case 4:
						return 1;
				}
			}
		},
		/**
		 * 跨浏览器获取键盘的输入的字符键，只有keypress事件才包含值
		 * @param {Object} event事件对象
		 */
		getCharCode: function(event) {
			if(typeof event.charCode == "number") {
				return event.charCode;
			} else {
				return event.keyCode;
			}
		},
		/**
		 * 自定义鼠标右击信息栏，如果内容为li列表的话,需要自定义css样式
		 * @param {Object} areaName名字
		 * @param {Object} content具体内容
		 */
		contextMenu: function(areaName, content) {
			var ul = document.createElement("ul");
			ul.id = areaName;
			document.body.appendChild(ul);
			ul.style.cssText = "position: absolute;visibility: hidden;background:silver;width: 120px;border: 1px solid #CCCCCC;box-shadow: 1px 1px 1px #ccc;margin: 0 auto;text-align: center;";
			ul.innerHTML = content;
			Base.prototype.addHandler(window, "load", function(event) {
				Base.prototype.addHandler(document, "contextmenu", function(event) {
					event = Base.prototype.getEvent(event);
					Base.prototype.preventDefault(event);
					var menu = Base.prototype.getDom(areaName);
					var a = "",
						b = "";
					a = event.clientX + menu.offsetWidth < Base.prototype.getViewPort().pageWidth ? event.clientX : Base.prototype.getViewPort().pageWidth - menu.offsetWidth - 3;
					b = event.clientY + menu.offsetHeight < Base.prototype.getViewPort().pageHeight ? event.clientY : Base.prototype.getViewPort().pageHeight - menu.offsetHeight - 3;
					menu.style.left = a + "px";
					menu.style.top = b + "px";
					menu.style.visibility = "visible";
				});
				Base.prototype.addHandler(document, "click", function(event) {
					Base.prototype.getDom(areaName).style.visibility = "hidden";
				});
			})
		},
		/**
		 * 取得选择的文本,需要mouseup事件来兼容所有浏览器,ie9以下不释放鼠标就会触发select事件，base.addHandler(document, "mouseup", function() {})
		 * @param {Object} textbox文本框
		 */
		getSelectedText: function(textbox) {
			if(typeof textbox.selectionStart == "number") {
				return textbox.value.substring(textbox.selectionStart, textbox.selectionEnd);
			} else if(document.selection) {
				return document.selection.createRange().text; //ie9以下
			}
		},
		/**
		 * 跨浏览器兼容选择部分文本
		 * @param {Object} textbox要操作的文本框
		 * @param {Object} startIndex文本中第一个字符的索引
		 * @param {Object} stopIndex选择文本最后一个字符之后的索引
		 */
		selectText: function(textbox, startIndex, stopIndex) {
			if(textbox.setSelectionRange) {
				textbox.setSelectionRange(startIndex, stopIndex);
			} else if(textbox.createTextRange) {
				var rang = textbox.createTextRange();
				rang.collapse(true);
				rang.moveStart("character", startIndex);
				rang.moveEnd("character", stopIndex - startIndex);
				rang.select();
			}
		},
		/**
		 * 缓冲运动框架,例如 ele,{width:200}
		 * @param {Object} obj元素
		 * @param {Object} json对象属性
		 * @param {Object} fn回调函数,可选
		 */
		startMove: function(obj, json, fn) { //iTarget是具体的数字，attr是宽或高或透明度之类的。
			clearInterval(obj.timer); //清除计时器
			obj.timer = setInterval(function() {
				var flag = true; //假设所有都到达了目标值
				for(var attr in json) { //用json，这样的话，可以2个函数同时运行。
					var icur = 0;
					var speed = 0;
					if(attr == 'opacity') {
						icur = Math.round(parseFloat(Base.prototype.getStyle(obj, attr)) * 100); //这里获取到的是透明度
					} else {
						icur = parseInt(Base.prototype.getStyle(obj, attr)); //因为获取到的宽或者高是小数，所以需要强制转换下,这里获取到的是宽高之类的
					} /*上面部分是获取具体的值，及是否是透明度*/
					speed = (json[attr] - icur) / 8; //因为这里的attr不能直接代表obj.offsetLeft,要用样式去获取.
					//json[attr]代替iTarget
					speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
					if(json[attr] != icur) {
						if(attr == 'opacity') {
							obj.style[attr] = (icur + speed) / 100; //icur+speed是当前的透明度加上变化的速度
							obj.style.filter = 'alpha(opacity' + (icur + speed) + ')';
						} else {
							obj.style[attr] = icur + speed + 'px';
						}
					} else {
						clearInterval(obj.timer);
						if(fn) {
							fn(); //如果有回调函数就执行回调函数。
						}
					}
				}
			}, 0);
		},
		/**
		 * 获取剪贴板的内容
		 *  要访问剪贴板中的数据，可以使用clipboardTetx对象:ie中,这个对象是window对象的属性，
		 * 其它浏览器这个对象是相应event对象的属性。为了确保浏览器兼容性,最后只在剪贴板事件期间使用这个对象
		 * 剪贴板对象包括6个  beforecopy:在发生复制操作前出发  copy,
		 * beforecut:在发生剪贴操作前触发,cut,beforepaste在黏贴操作前触发,paste
		 *  getData接收一个参数,要取得的数据的格式,ie中有2种 text/url,其他mime类型，可以用text/plain
		 * 必须是剪贴板事件
		 * @param {Object} event
		 */
		getClipboardText: function(event) {
			var clipboardData = (event.clipboardData || window.clipboardData);
			if(typeof clipboardData ===undefined){
			return clipboardData.getData("text");}
		},
		/**
		 * 禁止黏贴(paste)数值或非数值，true 禁止复制非数值
		 * @param {Object} event事件对象
		 * @param {Object} bool布尔值
		 */
		forBiddenPaste: function(event, bool) {
			var ClipboardTxt = Base.prototype.getClipboardText(event);
			if(bool) {
				if(!/^\d*$/.test(ClipboardTxt)) {
					Base.prototype.preventDefault(event);
				}
			} else {
				if(!/^\D*$/.test(ClipboardTxt)) {
					Base.prototype.preventDefault(event);
				}
			}
		},
		/**
		 * 过滤文本框的输入,为true时只允许输入字符,false相反
		 * @param {Object} textbox文本框
		 * @param {Object} event事件对象
		 * @param {Object} boolean布尔值
		 */
		forBiddenInput: function(textbox, event, bool) {
			var charCode = Base.prototype.getCharCode(event);
			if(bool) {
				if(!/\d/.test(String.fromCharCode(charCode)) && charCode > 9 && !event.ctrlKey) {
					/*charCode > 9 是因为ff和之前的safari会对上下方向键,退格键和删除键触发keypress事件。ff返回键码0,safari为8,所以>9即可
					ctrl键也会触发。也需要屏蔽
					屏蔽非数值,若要屏蔽数值，则将\d改成\D即可*/
					Base.prototype.preventDefault(event);
				}
			} else {
				if(!/\D/.test(String.fromCharCode(charCode)) && charCode > 9 && !event.ctrlKey) {
					Base.prototype.preventDefault(event);
				}
			}

		},
		/**
		 * 设置剪贴板文本
		 * @param {Object} event事件对象
		 * @param {Object} value值
		 */
		setClipboardText: function(event, value) {
			if(event.clipboardData) {
				return event.clipboardData.setData("text/plain", value);
			} else if(window.clipboardData) {
				return window.clipboardData.setData("text", value);
			}
		},
		/**
		 * 多个input框自动切换焦点,input框需要设置maxlength属性
		 * @param {Object} event事件对象
		 */
		tabForward: function(event) {
			event = Base.prototype.getEvent(event);
			var target = Base.prototype.getTarget(event);
			if(target.value.length == target.maxLength) {
				var form = target.form;
				for(var i = 0, len = form.elements.length; i < len; i++) {
					if(form.elements[i] == target) {
						if(form.elements[i + 1]) {
							form.elements[i + 1].focus();
						}
						return;
					}
				}
			}
		},
		/**
		 * 判断属性是在原型上还是实例上。为true时,属性在原型上
		 * @param {Object} obj对象
		 * @param {Object} name属性
		 */
		InstanceOrProperty: function(obj, name) {
			return !obj.hasOwnProperty(name) && (name in obj);

		},
		/**
		 * 获取select中多项选中的值,单项可以用selectbox.options[selectbox.selectedIndex]
		 * @param {Object} selectbox选择框对象
		 */
		getSelectedOptions: function(selectbox) {
			var result = [];
			var option = null;
			for(var i = 0, len = selectbox.options.length; i < len; i++) {
				option = selectbox.options[i];
				if(option.selected) {
					result.push(option);
				}
			}
			return result; //返回包含选中项的数组
		},
		/**
		 * 表单序列化
		 * @param {Object} form表单对象
		 */
		serialize: function(form) {
			var parts = [],
				field = null,
				i, len, j, optLen, option, optValue;
			for(i = 0, len = form.elements.length; i < len; i++) {
				field = form.elements[i];
				switch(field.type) {
					case "select-one":
					case "select-multiple":
						if(field.name.length) {
							for(j = 0, optLen = field.options.length; j < optLen; j++) {
								option = field.options[j];
								if(option.selected) {
									optValue = "";
									if(option.hasAttribute) {
										optValue = (option.hasAttribute("value") ? option.value : option.text)
									} else {
										optValue = (option.attributes["value"].specified ? option.value : option.text);
									}
									parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(optValue));
								}
							}
						}
						break;
					case undefined: //字段集
					case "file": //文件输入
					case "submit": //提交按钮
					case "reset": //重置按钮
					case "button": //自定义按钮
						break;
					case "radio": //单选按钮
					case "checkbox": //复选框
						if(!field.checked) {
							break;
						}
					default:
						if(field.name.length) {
							parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
						}
				}
			}
			return parts.join("&");
		},
		/**
		 * 删除选择框中所有项
		 * @param {Object} selectbox选择框对象
		 */
		clearSelectbox: function(selectbox) {
			for(var i = 0, len = selectbox.options.length; i < len; i++) {
				selectbox.remove(0);
			}
		},
		/**
		 * 跨浏览器兼容盒子拖动
		 * @param {Object} target要移动的盒子
		 * @param {Object} ele为拖动面板
		 */
		moveBox: function(target, ele) {
			ele.onmousedown = function(event) {
				target.style.position = "absolute"; //前提是脱离文档流，后面才能设置偏移量
				ele.style.cursor = "move";
				var event = base.getEvent(event);
				var oX = event.clientX - target.offsetLeft, //鼠标点击的位置距离面板左边的距离
					oY = event.clientY - target.offsetTop;
				document.onmousemove = function(event) { //因为这里是在document上移动的，所以需要在document上监听
					var event = base.getEvent(event);
					base.preventDefault(event); //取消图片的默认拖动事件
					var cX = event.clientX - oX, //移动后的坐标值
						cY = event.clientY - oY;
					var maxW = base.getViewPort().pageWidth - target.offsetWidth, //盒子在视口右移的最大距离
						maxH = base.getViewPort().pageHeight - target.offsetHeight;
					cX > maxW ? cX = maxW : cX; //right
					cY > maxH ? cY = maxH : cY; //bottom
					cY < 0 ? cY = 0 : cY; //top
					cX < 0 ? cX = 0 : cX; //left
					target.style.left = cX + "px";
					target.style.top = cY + "px";
				};
				document.onmouseup = function() {
					document.onmousemove = null; //删除移动事件
					document.onmouseup = null; //删除鼠标释放事件
				}
				return false;
			}
		},
		/**
		 * 返回兄弟节点
		 * @param {Object} ele元素 
		 */
		siblingNodes: function(ele) {
			a = [];
			var prev = ele.previousSibling; //得先往前搜索  
			//这里外面得先去前一个节点，不然到时候节点的位置就不会变化了
			while(prev != null) {
				if(prev.nodeType == 1) {
					a.unshift(prev); //在数组的前端添加保证顺序
				}
				prev = prev.previousSibling;
			}

			var next = ele.nextSibling; //后往后搜索
			while(next != null) {
				if(next.nodeType == 1) {
					a.push(next);
				}
				next = next.nextSibling;
			};

			return a;
		},
		/**
		 * 返回浏览器的名称和版本号
		 */
		browserName: function() {
			var os = navigator.platform;
			var userAgent = navigator.userAgent;
			var info = "";
			var tempArray = "";
			//判断操作系统  
			if(os.indexOf("Win") > -1) {
				if(userAgent.indexOf("Windows NT 5.0") > -1) {
					info += "Win2000";
				} else if(userAgent.indexOf("Windows NT 5.1") > -1) {
					info += "WinXP";
				} else if(userAgent.indexOf("Windows NT 5.2") > -1) {
					info += "Win2003";
				} else if(userAgent.indexOf("Windows NT 6.0") > -1) {
					info += "WindowsVista";
				} else if(userAgent.indexOf("Windows NT 6.1") > -1 || userAgent.indexOf("Windows 7") > -1) {
					info += "Win7";
				} else if(userAgent.indexOf("Windows NT 6.2") > -1 || userAgent.indexOf("Windows 8") > -1) {
					info += "Win8";
				} else if(userAgent.indexOf("Windows NT 6.3") > -1 || userAgent.indexOf("Windows 8.1") > -1) {
					info += "Win8.1";
				} else if(userAgent.indexOf("Windows NT 10.0") > -1 || userAgent.indexOf("Windows 10") > -1) {
					info += "Win10";
				} else {
					info += "Other";
				}
			} else if(os.indexOf("Mac") > -1) {
				info += "Mac";
			} else if(os.indexOf("X11") > -1) {
				info += "Unix";
			} else if(os.indexOf("Linux") > -1) {
				info += "Linux";
			} else {
				info += "Other";
			}
			info += "/";

			//判断浏览器版本  
			var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器  
			var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器  
			var isEdge = userAgent.toLowerCase().indexOf("edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
			var isIE11 = (userAgent.toLowerCase().indexOf("trident") > -1 && userAgent.indexOf("rv") > -1);

			if(/[Ff]irefox(\/\d+\.\d+)/.test(userAgent)) {
				tempArray = /([Ff]irefox)\/(\d+\.\d+)/.exec(userAgent);
				info += tempArray[1] + tempArray[2];
			} else if(isIE) {

				var version = "";
				var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
				reIE.test(userAgent);
				var fIEVersion = parseFloat(RegExp["$1"]);
				if(fIEVersion == 7) {
					version = "IE7";
				} else if(fIEVersion == 8) {
					version = "IE8";
				} else if(fIEVersion == 9) {
					version = "IE9";
				} else if(fIEVersion == 10) {
					version = "IE10";
				} else {
					version = "0"
				}

				info += version;

			} else if(isEdge) {
				info += "Edge";
			} else if(isIE11) {
				info += "IE11";
			} else if(/[Cc]hrome\/\d+/.test(userAgent)) {
				tempArray = /([Cc]hrome)\/(\d+)/.exec(userAgent);
				info += tempArray[1] + tempArray[2];
			} else if(/[Vv]ersion\/\d+\.\d+\.\d+(\.\d)* *[Ss]afari/.test(userAgent)) {
				tempArray = /[Vv]ersion\/(\d+\.\d+\.\d+)(\.\d)* *([Ss]afari)/.exec(userAgent);
				info += tempArray[3] + tempArray[1];
			} else if(/[Oo]pera.+[Vv]ersion\/\d+\.\d+/.test(userAgent)) {
				tempArray = /([Oo]pera).+[Vv]ersion\/(\d+)\.\d+/.exec(userAgent);
				info += tempArray[1] + tempArray[2];
			} else {
				info += "unknown";
			}
			return info;
		},
		/**
		 * 输入时间秒，转换为时:分:秒
		 * @param {Object} value秒
		 */
		formatTime: function(value) {
			var seconds = parseInt(value), // 秒
				minutes = 0, // 分
				hours = 0, // 小时
				result;
			hours = parseInt(value / 3600); //转换小时
			hours = hours > 9 ? hours : "0" + hours;
			minutes = parseInt(value / 60) - hours * 60; //转换分钟
			minutes = minutes > 9 ? minutes : "0" + minutes;
			seconds = value % 60;
			seconds = seconds > 9 ? seconds : "0" + seconds;
			result = hours + ":" + minutes + ":" + seconds;
			return result;
		},
		/**
		 * jsonp跨域
		 * @param {Object} url请求的地址
		 */
		jsonp: function(url) {
			var script = document.createElement("script");
			script.src = url;
			document.body.insertBefore(script, document.body.lastChild);
		},
		/**
		 *提取URL的搜索字符串中的参数,返回对象
		 */
		urlArgs: function() {
			var args = {},
				query = location.search.substring(1), //去掉?
				pairs = query.split("&"); //根据&符号将查询字符串分隔开
			for(var i = 0; i < pairs.length; i++) {
				var pos = pairs[i].indexOf("="); //查找name=value
				if(pos == -1) continue; //没有找到就跳过
				var name = pairs[i].substring(0, pos), //提取name
					value = pairs[i].substring(pos + 1), //提取value
					value = decodeURIComponent(value); //对value进行解码
				args[name] = value; //存储为属性
			}
			return args;
		}

		/*		--------------------------*/
		//		2018/1/26
	}
	window.Base = Base;
})(window, document);