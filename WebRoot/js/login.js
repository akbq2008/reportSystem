$(function() {
	$('#drag').drag();
	var base = new Base();
	base.browserVersion();
	var forget = base.getDom("forget"),
		register = base.getDom("register"),
		login_btn = base.getDom("login_btn"),
		errorInfo = $("#errorInfo"),
		flag = 0;
	/**
	 *注册按钮跳转
	 */
	if(register != null) {
		register.onclick = function() {
			location.href = "register.html";
		};
	}
	/**
	 *
	 * @param {Object} event
	 */
	var fn = function(event) {
		var event = base.getEvent(event),
			userNameVal = $("#userName").val(),
			secreateVal = $("#secreate").val();
		base.preventDefault(event);
		if(!userNameVal) {
			errorInfo.css("display", "block");
			errorInfo.text("请输入用户名！");
			return;
		} else if(!secreateVal) {
			errorInfo.css("display", "block");
			errorInfo.text("请输入密码！");
			return;
		} else {
			var userNamehash = hex_md5(userNameVal),
				secreatehash = hex_md5(secreateVal);
			var data_status = $(".drag_text").attr("data-status");
			flag++;
			if(flag == 3) {
				$(".toggle_yzm").css("display", "block");
			}
			$.ajaxSetup({
				cache: false
			});
			if(flag < 3 || data_status == "true") {
				$.ajax({
					type: "get",
					url: "HandleLogin",
					async: true,
					data: {
						userNamehash: userNamehash
					},
					success: function(data) {
						data = JSON.parse(data);
						if(secreatehash == data.secreate) {
							errorInfo.css("display", "none");
							errorInfo.text("");
							$(".toggle_yzm").css("display", "none");
							$.cookie("token", 7897235480609436 * Math.random());
							location.href = "index.html";
						} else {
							$(".login_box input").val("");
							errorInfo.css("display", "block");
							errorInfo.text("用户名或者密码不正确！");
							//验证框重置
							$('#drag').drag();
							$(".drag_text").attr("data-status", "false");
							$(".handler").css({
								"left": 0
							});
							$(".drag_bg").css({
								"width": 0
							});
							$(".drag_text").text("请按住滑块，拖动到最右边").addClass("slidetounlock");
							var handler = document.querySelector(".handler");
							handler.className = "handler handler_bg";
						}
					},
					error: function() {
						alert("error!");
					}
				});
			} else if(flag > 3 && data_status == "false") {
				errorInfo.css("display", "block");
				errorInfo.text("请完成验证码校验！");
			}
		}
	};
	//fn end
	base.addHandler(login_btn, "click", function() {
		fn();
	});
	//上面为登录，下面为修改密码
	/***********************************************************************/
	var modify = base.getDom("modify"),
		back = base.getDom("back"),
		errorInfo_second = $("#errorInfo_second"),
		newUserName = $("#newUserName"),
		newSecreate = $("#newSecreate"),
		againSecreate = $("#againSecreate"),
		tel_yzm = $("#tel_yzm"),
		telephone = $("#telephone"),
		Num = "";

	/**
	 * 点击获取验证码
	 */
	var a = 120;
	var timeId = ""; //多次点击的时候直接给同一个赋值
	$(".btn_yzm").on("click", function() {
		var telephoneVal = $("#telephone").val();
		Num = "";
		for(var i = 0; i < 6; i++) {
			Num += Math.floor(Math.random() * 10);
		}
		if(telephoneVal != "") {
			$.ajax({
				type: "POST",
				url: "//dingxin.market.alicloudapi.com/dx/sendSms",
				dataType: "json",
				async: true,
				headers: {
					"Authorization": "APPCODE c50527fb3dc54bf5a69edaf220701b80"
				},
				data: {
					mobile: telephoneVal,
					param: "code:" + Num,
					tpl_id: "TP1805151"
				},
				success: function(data) {
					//				console.log(data);
				},
				error: function() {
					console.log("error");
				}
			});
			clearTimeout(timeId); //多次点击去掉
			function fn() {
				if(a > 0) {
					$(".btn_yzm").text(a);
					a--;
					clearTimeout(timeId);
					timeId = setTimeout(fn, 1000);
					$(".btn_yzm").attr("disabled", "disabled");
				} else {
					a = 120;
					$(".btn_yzm").text("获取验证码");
					$(".btn_yzm").removeAttr("disabled");
				}
			}
			timeId = setTimeout(fn, 0);
		} else {
			errorInfo_second.css("display", "block");
			errorInfo_second.text("请输入手机号码！");
		}
	});
	/**
	 * 修改密码
	 */
	base.addHandler(modify, "click", function() {
		var newUserNameVal = newUserName.val(),
			newSecreateVal = newSecreate.val(),
			againSecreateVal = againSecreate.val(),
			telephoneVal = telephone.val(),
			tel_yzmVal = tel_yzm.val();
		if(!newUserNameVal) {
			errorInfo_second.css("display", "block");
			errorInfo_second.text("请输入用户名！");
			return;
		} else if(!newSecreateVal) {
			errorInfo_second.css("display", "block");
			errorInfo_second.text("请输入新的密码！");
			return;
		} else if(!againSecreateVal) {
			errorInfo_second.css("display", "block");
			errorInfo_second.text("请再次确认密码！");
			return;
		} else
		if(!telephoneVal) {
			errorInfo_second.css("display", "block");
			errorInfo_second.text("请输入手机号码！");
			return;
		} else if(!tel_yzmVal) {
			errorInfo_second.css("display", "block");
			errorInfo_second.text("请输入验证码！");
			return;
		} else {
			if(newSecreateVal == againSecreateVal) {
				var regex = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
				if(!regex.test(telephoneVal)) {
					errorInfo_second.css("display", "block");
					errorInfo_second.text("请输入正确的手机号码！");
				} else {
					if(Num == tel_yzmVal) {
						//修改核心部分
						var newUserNamehash = hex_md5(newUserNameVal),
							newSecreatehash = hex_md5(newSecreateVal),
							againSecreatehash = hex_md5(againSecreateVal);
						$.ajaxSetup({
							cache: false
						});
						$.ajax({
							type: "get",
							url: "HandleLogin",
							async: true,
							data: {
								userNamehash: newUserNamehash
							},
							success: function(data) {
								data = JSON.parse(data);
							},
							error: function() {
								alert("error!");
							}
						}).done(function(data) {
							data = JSON.parse(data);
							if(data.mes == "10001") { //如果用户名存在的话
								if(data.telephone == telephoneVal) { //如果输入的手机号码为注册时所使用的手机号码
									errorInfo_second.css("display", "none");
									errorInfo_second.text("");
									$.ajaxSetup({
										cache: false
									}); //取消ie ajax缓存
									$.ajax({
										type: "post",
										url: "HandleUpdate",
										async: true,
										data: {
											newSecreate: newSecreatehash,
											userNamehash: newUserNamehash
										},
										success: function(msg) {
											msg = JSON.parse(msg);
											if(msg.mes == "10001") {
												alert("密码重置成功！");
												location.href = "login.html";
											}
										},
										error: function() {
											alert("error!");
										}
									});
								} else {
									errorInfo_second.css("display", "block");
									errorInfo_second.text("请输入注册时所使用的手机号码！");
								}
							} else {
								errorInfo_second.css("display", "block");
								errorInfo_second.text("该用户名不存在！");
							}
						}); //done
						//修改核心部分
					} else {
						errorInfo_second.css("display", "block");
						errorInfo_second.text("请输入正确的验证码！");
					}
				}
			} else {
				errorInfo_second.css("display", "block");
				errorInfo_second.text("两次输入的密码不一致！");
			}
		} //else
	}); //click
	/**
	 *返回按钮
	 */
	base.addHandler(back, "click", function(event) {
		var event = base.getEvent(event);
		base.preventDefault(event);
		base.stopPropagation(event);
		location.href = "login.html";
	});
});