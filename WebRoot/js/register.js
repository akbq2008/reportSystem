$(function() {
	$("#back").on("click", function() {
		window.location.href = "login.html";
	});
	var errorInfo_third = $("#errorInfo_third"), //错误信息
		newUserName = $("#newUserName"), //用户名
		newSecreate = $("#newSecreate"), //密码
		againSecreate = $("#againSecreate"), //再次确认密码
		telephone = $("#telephone"); //手机号码
	newUserName.on("keyup", function() {
		var newUserNameVal = hex_md5(newUserName.val().trim());
		$.ajax({
			type: "post",
			url: "HandleRegister",
			async: true,
			data: {
				newUserNameVal: newUserNameVal
			},
			success: function(data) {
				if(data == "10000") {
					errorInfo_third.css("display", "block");
					errorInfo_third.text("当前用户名已经被注册！");
				} else {
					errorInfo_third.css("display", "none");
					errorInfo_third.text("");
				}
			},
			error: function() {
				console.log("error!");
			}
		});
	});

	$("#register").on("click", function() {
		var newUserNameVal = newUserName.val(), //用户名
			newSecreateVal = newSecreate.val(), //密码
			againSecreateVal = againSecreate.val(), //再次确认密码
			telephoneVal = telephone.val(); //手机号码

		if(!newUserNameVal) {
			errorInfo_third.css("display", "block");
			errorInfo_third.text("请输入用户名！");
			return;
		} else if(!newSecreateVal) {
			errorInfo_third.css("display", "block");
			errorInfo_third.text("请输入密码！");
			return;
		} else if(!againSecreateVal) {
			errorInfo_third.css("display", "block");
			errorInfo_third.text("请再次输入你的密码！");
			return;
		} else if(!telephoneVal) {
			errorInfo_third.css("display", "block");
			errorInfo_third.text("请输入手机号码！");
			return;
		} else {
			if(newSecreateVal == againSecreateVal) {
				errorInfo_third.css("display", "none");
				errorInfo_third.text("");
				newUserNameVal = hex_md5(newUserNameVal.trim());
				newSecreateVal = hex_md5(newSecreateVal);
				var regex = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|16[0|1|2|3|5|6|7|8|9])\d{8}$/;
				if(!regex.test(telephoneVal)) {
					errorInfo_third.css("display", "block");
					errorInfo_third.text("请输入正确的手机号码！");
				} else {
					$.ajax({
						type: "post",
						url: "HandleRegister",
						async: true,
						data: {
							newUserNameVal: newUserNameVal,
							newSecreateVal: newSecreateVal,
							telephone: telephoneVal
						},
						success: function(data) {
							if(data == "10001") {
								errorInfo_third.css("display", "none");
								errorInfo_third.text("");
								alert("注册成功！");
								window.location.href = "login.html";
							} else if(data == "10000") {
								errorInfo_third.css("display", "block");
								errorInfo_third.text("当前用户名已经被注册！");
							}
						},
						error: function() {
							console.log("error!");
						}
					});
				}
			} else {
				errorInfo_third.css("display", "block");
				errorInfo_third.text("两次输入的密码不一致！");
			}
		}

	});

});