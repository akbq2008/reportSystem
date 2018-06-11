$(function() {
	var userName = $.cookie("token");
	var sheetData = [];
	if(userName != null) {
		var base = new Base();
		base.browserVersion();
		$.ajaxSetup({
			cache: false
		});
		$.ajax({
			url: "selectContent",
			type: "get",
			cache: true,
			dataType: "json",
			success: function(data) {
				// 批量定义a的行数
				var emptyA = data[0][0].length - outMethod(data[0][0], "aempty");
				emptyB1 = data[0][1].length - outMethod(data[0][1], "b1empty"),
					emptyB2 = data[0][2].length - outMethod(data[0][2], "b2empty"),
					emptyC1 = data[0][3].length - outMethod(data[0][3], "c1empty"),
					emptyC2 = data[0][4].length - outMethod(data[0][4], "c2empty"),
					emptyD1 = data[0][5].length - outMethod(data[0][5], "d1empty"),
					emptyD2 = data[0][6].length - outMethod(data[0][6], "d2empty");
				//显示供奉信息
				$("#areaA").prev().append("    \u8be5\u533a\u5171\u6709\u4f9b\u5949" + outMethod(data[0][0], "aempty") + "\u6ca1\u6709\u4f9b\u5949" + emptyA);
				$("#areaB1").prev().append("    \u8be5\u533a\u5171\u6709\u4f9b\u5949" + outMethod(data[0][1], "b1empty") + "\u6ca1\u6709\u4f9b\u5949" + emptyB1);
				$("#areaB2").prev().append("    \u8be5\u533a\u5171\u6709\u4f9b\u5949" + outMethod(data[0][2], "b2empty") + "\u6ca1\u6709\u4f9b\u5949" + emptyB2);
				$("#areaC1").prev().append("    \u8be5\u533a\u5171\u6709\u4f9b\u5949" + outMethod(data[0][3], "c1empty") + "\u6ca1\u6709\u4f9b\u5949" + emptyC1);
				$("#areaC2").prev().append("    \u8be5\u533a\u5171\u6709\u4f9b\u5949" + outMethod(data[0][4], "c2empty") + "\u6ca1\u6709\u4f9b\u5949" + emptyC2);
				$("#areaD1").prev().append("    \u8be5\u533a\u5171\u6709\u4f9b\u5949" + (Number(outMethod(data[0][5], "d1empty")) - 24) + "\u6ca1\u6709\u4f9b\u5949" + emptyD1 + "\u57fa\u7840\u8bbe\u65bd" + 24);
				$("#areaD2").prev().append("    \u8be5\u533a\u5171\u6709\u4f9b\u5949" + (Number(outMethod(data[0][6], "d2empty")) - 24) + "\u6ca1\u6709\u4f9b\u5949" + emptyD2 + "\u57fa\u7840\u8bbe\u65bd" + 24);
				//显示已经供奉数量
				function outMethod(area, name) {
					window[name] = 0;
					var leng = area.length;
					for(var i = 0; i < leng; i++) {
						if(area[i].dataName != "") {
							window[name]++;
						}
					}
					return window[name];
				}

				getAreaCount("aCount", data[0][0]); //获取A区的列数
				getAreaCount("b1Count", data[0][1]); //获取B1区的列数
				getAreaCount("b2Count", data[0][2]);
				getAreaCount("c1Count", data[0][3]);
				getAreaCount("c2Count", data[0][4]); //c2
				getAreaCount("d1Count", data[0][5]);
				getAreaCount("d2Count", data[0][6]); //d2
				createArea(aCount, "areaA", data[0][0]); //创建A区
				createArea(b1Count, "areaB1", data[0][1]); //创建B1区
				createArea(b2Count, "areaB2", data[0][2]); //创建B2区
				createArea(c1Count, "areaC1", data[0][3]); //创建C1区
				createArea(c2Count, "areaC2", data[0][4]); //创建C2区
				createArea(d1Count, "areaD1", data[0][5]); //创建D1区
				createArea(d2Count, "areaD2", data[0][6]); //创建D2区
				function createArea(column, rowName, area) {
					//@column 列数   , @rowName为要插入的容器 ,@area为区 	
					var a = "",
						b = "";
					for(var j = 12; j >= 0; j--) {
						var c = column * (12 - j);
						d = column + column * (12 - j);
						for(var i = c; i < d; i++) {
							if(i < 9 + column * (12 - j) && i >= 0 + column * (12 - j)) {
								if(area[i].dataName != "\u6d88\u9632\u67dc" && area[i].dataName != "\u6276\u624b") {
									$("." + rowName + (j + 1)).get(0).insertAdjacentHTML("beforeend", "<div class='item'> <p style='border-bottom: 1px solid black;text-align: center;background:#ccc;'>\u7b2c" + area[i].rowOwn.trim() + "\u6392\u0030\u0030" + area[i].columnOwn.trim() + "</p><div><div class='people-wrap'><input class='people' type='text'  value='" + area[i].dataName + "'/></div> <div class='tel-wrap'><input class='tel' type='text'  value='" + area[i].tel + "'/> </div></div></div>");
								} else if(area[i].dataName == "\u6d88\u9632\u67dc" || area[i].dataName == "\u6276\u624b") {
									$("." + rowName + (j + 1)).get(0).insertAdjacentHTML("beforeend", "<div class='item'> <p style='border-bottom: 1px solid black;text-align: center;background:#ccc;'>\u7b2c" + area[i].rowOwn.trim() + "\u6392\u0030\u0030" + area[i].columnOwn.trim() + "</p><div><div class='people-wrap'><input class='people' disabled type='text'   value='" + area[i].dataName + "'/></div> <div class='tel-wrap'><input class='tel' type='text'   disabled value='" + area[i].tel + "'/> </div></div></div>");
								}
							} else {
								if(area[i].dataName != "\u6d88\u9632\u67dc" && area[i].dataName != "\u6276\u624b") {
									$("." + rowName + (j + 1)).get(0).insertAdjacentHTML("beforeend", "<div class='item'> <p style='border-bottom: 1px solid black;text-align: center;background:#ccc;'>\u7b2c" + area[i].rowOwn.trim() + "\u6392\u0030" + area[i].columnOwn.trim() + "</p><div><div class='people-wrap'><input class='people'  type='text'  value='" + area[i].dataName + "'/></div> <div class='tel-wrap'><input class='tel' type='text'   value='" + area[i].tel + "'/> </div></div></div>");
								} else if(area[i].dataName == "\u6d88\u9632\u67dc" || area[i].dataName == "\u6276\u624b") {
									$("." + rowName + (j + 1)).get(0).insertAdjacentHTML("beforeend", "<div class='item'> <p style='border-bottom: 1px solid black;text-align: center;background:#ccc;'>\u7b2c" + area[i].rowOwn.trim() + "\u6392\u0030" + area[i].columnOwn.trim() + "</p><div><div class='people-wrap'><input class='people' disabled type='text'  value='" + area[i].dataName + "'/></div> <div class='tel-wrap'><input class='tel' type='text'   disabled value='" + area[i].tel + "'/> </div></div></div>");
								}
							}
						} //inner					
					} //outer			
				}
				/*excel out start*/
				//				var sheetData = [];
				outPutdata(data[0][0], data[0][0].length, "aCount");
				outPutdata(data[0][1], data[0][1].length, "b1Count");
				outPutdata(data[0][2], data[0][2].length, "b2Count");
				outPutdata(data[0][3], data[0][3].length, "c1Count");
				outPutdata(data[0][4], data[0][4].length, "c2Count");
				outPutdata(data[0][5], data[0][5].length, "d1Count");
				outPutdata(data[0][6], data[0][6].length, "d2Count");
				//将每个区的数据进行组装
				function outPutdata(areA, column, columnName) {
					for(var i = 0; i < column; i++) {
						window[columnName + i] = {
							one: areA[i].areaName,
							two: areA[i].rowOwn,
							three: areA[i].columnOwn,
							four: areA[i].tel,
							five: areA[i].dataName
						};
						sheetData.push(window[columnName + i]);
					}

				}
				//导出excel核心
				var option = {};
				option.fileName = 'excel';
				option.datas = [{
					sheetData: sheetData,
					sheetName: 'sheet',
					sheetHeader: ['areaName', 'rowOwn', "columnOwn", "tel", "dataName"]
				}];

				var but = document.getElementById("but");
				but.onclick = function() {
					var toExcel = new ExportJsonExcel(option);
					toExcel.saveExcel();
				};

				/*excel out end*/
				/*excel in start*/
				/*
				            FileReader共有4种读取方法：
				            1.readAsArrayBuffer(file)：将文件读取为ArrayBuffer。
				            2.readAsBinaryString(file)：将文件读取为二进制字符串
				            3.readAsDataURL(file)：将文件读取为Data URL
				            4.readAsText(file, [encoding])：将文件读取为文本，encoding缺省值为'UTF-8'
				                         */
				var wb; //读取完成的数据
				var rABS = false; //是否将文件读取为二进制字符串
				var uploadFiles = document.getElementById("uploadFiles");
				var fn = function(event) {
					event = base.getEvent(event);
					base.stopPropagation(event);
					var _this = event.target || event.srcElement;
					importf(_this);

					function importf(obj) { //导入
						if(!obj.files) {
							return;
						}
						var f = obj.files[0];
						var reader = new FileReader();
						reader.onload = function(e) {
							var data = e.target.result;
							if(rABS) {
								wb = XLSX.read(btoa(fixdata(data)), { //手动转化
									type: 'base64'
								});
							} else {
								wb = XLSX.read(data, {
									type: 'binary'
								});
							}
							var ar = JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
							$.ajax({
								url: "selectContent",
								type: "post",
								dataType: "json",
								data: {
									indata: ar
								},
								beforeSend: function() {
									$("body").append("<progress class='progress'></progress>");
								}, //在success函数执行之前执行
								success: function(msg) {
									$(".progress").remove();
									alert("\u5bfc\u5165\u6210\u529f");
									location.reload();
									$("#uploadFiles").val(""); //解决onchange事件只能触发一次
								},
								error: function() {
									alert("error!");
								}
							});
						};

						if(rABS) {
							reader.readAsArrayBuffer(f);
						} else {
							reader.readAsBinaryString(f);
						}
					}

					function fixdata(data) { //文件流转BinaryString
						var o = "",
							l = 0,
							w = 10240;
						for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
						o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
						return o;
					}
				};
				base.addHandler(uploadFiles, "change", fn);
				/*excel in end*/
				$(".people").each(function() {
					if($(this).val().trim() != "") {
						$(this).css("color", "red");
					}
					$(this).on("change", function(event) {
						if($(this).val().trim() != "") {
							$(this).css("color", "red");
						} else {
							$(this).css("color", "black");
						}
						var value = $(this).val(),
							str = $(this).closest(".item").text(),
							areaN = $(this).parent().parent().parent().parent().parent().prev().text();
						var areaNameOwn = []; //当前的区
						var rowOwn = []; //当前的行号
						var columnOwn = []; //当前的号
						//---
						$(this).val(value.trim());
						value = $(this).val().trim();
						//----
						str = str.trim();
						var arr = [];
						for(var i = 0; i < str.length; i++) {
							if(str[i] != "" && str[i] != undefined) {
								arr.push(str[i]);
							}
						}
						//行列截取
						if(arr.length == 7) {
							rowOwn.push(arr[1] + arr[2]);
							if(arr[5] != 0) {
								columnOwn.push(arr[5] + arr[6]);
							} else {
								columnOwn.push(arr[6]);
							}
						} else {
							rowOwn.push(arr[1]);
							if(arr[4] != 0) {
								columnOwn.push(arr[4] + arr[5]);
							} else {
								columnOwn.push(arr[5]);
							}
						}
						if(areaN[2] == "\u533a") {
							areaNameOwn.push(areaN[1]);
						} else {
							areaNameOwn.push(areaN[1] + areaN[2]);
						}
						var regexp = /^[\u4e00-\u9fa5]{1,6}(·[\u4e00-\u9fa5]{1,6}){0,2}([,，][\u4e00-\u9fa5]{1,6}(·[\u4e00-\u9fa5]{1,6}){0,2})*$/;
						if(!regexp.test(value) && value != "") {
							alert("\u4f60\u8f93\u5165\u7684\u59d3\u540d\u6709\u8bef\u6216\u59d3\u540d\u957f\u5ea6\u5927\u4e8e\u0036\u0021");
							var preValue = this.getAttribute("value");
							$(this).val(preValue);
						} else {
							var reback = confirm("\u786e\u5b9a\u8981\u4fee\u6539\u6570\u636e\u5417\u003f");
							if(reback) {
								$.ajaxSetup({
									cache: false
								});
								$.ajax({
									type: "post",
									url: "selectContent",
									async: true,
									dataType: "json",
									data: {
										people: value,
										rowOwn: rowOwn.toString(),
										columnOwn: columnOwn.toString(),
										areaNameOwn: areaNameOwn.toString().toLocaleLowerCase()
									},
									success: function(msg) {
										sheetData = [];
										outPutdata(msg[0][0], msg[0][0].length, "aCount");
										outPutdata(msg[0][1], msg[0][1].length, "b1Count");
										outPutdata(msg[0][2], msg[0][2].length, "b2Count");
										outPutdata(msg[0][3], msg[0][3].length, "c1Count");
										outPutdata(msg[0][4], msg[0][4].length, "c2Count");
										outPutdata(msg[0][5], msg[0][5].length, "d1Count");
										outPutdata(msg[0][6], msg[0][6].length, "d2Count");
										var option = {};
										option.fileName = 'excel';
										option.datas = [{
											sheetData: sheetData,
											sheetName: 'sheet',
											sheetHeader: ['areaName', 'rowOwn', "columnOwn", "tel", "dataName"]
										}];

										var but = document.getElementById("but");
										but.onclick = function() {
											var toExcel = new ExportJsonExcel(option);
											toExcel.saveExcel();
										};
										//									console.log(columnOwn + ":" + columnOwn.toString());
									},
									error: function() {
										alert("error");
									}
								}); //ajax end
							} else {
								var preValue = this.getAttribute("value");
								$(this).val(preValue);
								this.style.color = "red";
							}
						}
						return false;
					});
				});
				$(".tel").each(function() {
					if($(this).val().trim() != "") {
						$(this).css("color", "red");
					}
					$(this).on("change", function() {
						if($(this).val().trim() != "") {
							$(this).css("color", "red");
						} else {
							$(this).css("color", "black");
						}
						var value1 = $(this).val(),
							str = $(this).closest(".item").text(),
							areaN = $(this).parent().parent().parent().parent().parent().prev().text();
						var areaNameOwn = []; //当前的区
						var rowOwn = []; //当前的行号
						var columnOwn = []; //当前的号
						$(this).val(value1.trim());
						value1 = $(this).val().trim();

						str = str.trim();
						var arr = [];
						for(var i = 0; i < str.length; i++) {
							if(str[i] != "" && str[i] != undefined) {
								arr.push(str[i]);
							}
						}
						//行列截取
						if(arr.length == 7) {
							rowOwn.push(arr[1] + arr[2]);
							if(arr[5] != 0) {
								columnOwn.push(arr[5] + arr[6]);
							} else {
								columnOwn.push(arr[6]);
							}
						} else {
							rowOwn.push(arr[1]);
							if(arr[4] != 0) {
								columnOwn.push(arr[4] + arr[5]);
							} else {
								columnOwn.push(arr[5]);
							}
						}
						if(areaN[2] == "\u533a") {
							areaNameOwn.push(areaN[1]);
						} else {
							areaNameOwn.push(areaN[1] + areaN[2]);
						}
						var reg = /^\d*$/;
						if(reg.test(value1)) {
							if(value1.length == 0 || value1.length == 7 || value1.length == 11) {
								var reback = confirm("\u786e\u5b9a\u8981\u4fee\u6539\u6570\u636e\u5417\u003f");
								if(reback) {
									$.ajaxSetup({
										cache: false
									});
									$.ajax({
										type: "post",
										url: "selectContent",
										async: true,
										dataType: 'json',
										data: {
											tel: value1,
											rowOwn: rowOwn.toString(),
											columnOwn: columnOwn.toString(),
											areaNameOwn: areaNameOwn.toString().toLocaleLowerCase()
										},
										success: function(msg) {
											sheetData = [];
											outPutdata(msg[0][0], msg[0][0].length, "aCount");
											outPutdata(msg[0][1], msg[0][1].length, "b1Count");
											outPutdata(msg[0][2], msg[0][2].length, "b2Count");
											outPutdata(msg[0][3], msg[0][3].length, "c1Count");
											outPutdata(msg[0][4], msg[0][4].length, "c2Count");
											outPutdata(msg[0][5], msg[0][5].length, "d1Count");
											outPutdata(msg[0][6], msg[0][6].length, "d2Count");
											var option = {};
											option.fileName = 'excel';
											option.datas = [{
												sheetData: sheetData,
												sheetName: 'sheet',
												sheetHeader: ['areaName', 'rowOwn', "columnOwn", "tel", "dataName"]
											}];

											var but = document.getElementById("but");
											but.onclick = function() {
												var toExcel = new ExportJsonExcel(option);
												toExcel.saveExcel();
											};
											//							console.log(value1+" "+rowOwn[0].toString()+" "+columnOwn[0].toString()+" "+areaNameOwn[0].toString().toLocaleLowerCase());
										},
										error: function() {
											alert("error");
										}
									});
								} else {
									var preValue = this.getAttribute("value");
									$(this).val(preValue);
									this.style.color = "red";
								}
							} else {
								alert("\u8bf7\u8f93\u5165\u6709\u6548\u7535\u8bdd\u53f7\u7801");
								var preValue = this.getAttribute("value");
								$(this).val(preValue);
								this.style.color = "red";
							}
						} else {
							alert("\u8bf7\u8f93\u5165\u6709\u6548\u7535\u8bdd\u53f7\u7801");
							var preValue = this.getAttribute("value");
							$(this).val(preValue);
							this.style.color = "red";
						}
						return false;

					});
				});

				function getAreaCount(CountName, area) {
					window[CountName] = 0;
					for(var i = 0; i < area.length; i++) {
						if(area[i].rowOwn == "\u5341\u4e09") {
							window[CountName]++;
						}
					} // 获取数据库中索引排的行数
				}

			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			}
		}); //ajax
		//显示隐藏
		$(".btn").on("click", function() {
			if(!$(".showBox").is(":animated")) {
				if(!$(".btn").hasClass("flag")) {
					$(this).addClass("flag");
					$(".showBox").animate({
						bottom: "200px"
					}, 500);
					$(".btn").text("\u9690\u85cf");
				} else {
					$(this).removeClass("flag");
					$(".showBox").animate({
						bottom: "-152px"
					}, 500);
					$(".btn").text("\u663e\u793a");
				}
			}
			return false;
		});

		//定位
		$(".position").on("click", function(event) {
			var submitRow = $("#submitRow").val(),
				submitColumn = $("#submitColumn").val(),
				optionName = $("select").val(),
				name = optionName.toLocaleLowerCase() + "Count",
				str = /[0-9]/,
				a = !isNaN(submitRow),
				b = !isNaN(submitColumn);
			if(a && b) {
				if(submitRow > 0 && submitRow < 14) {
					var bool = Math.floor(submitRow) == submitRow;
					//当前排的高度
					if(bool) {
						var Top = $(".area" + optionName + submitRow).offset().top;
						$("html,body").animate({
							"scrollTop": Top + "px"
						}, 500);
						$("#submitRow").val("").focus();
					} else {
						alert("\u884c\u4e0d\u80fd\u4e3a\u6d6e\u70b9\u6570");
						$("#submitRow").val("").focus();
					}
				} else if(submitRow < 0) {
					alert("\u8bf7\u8f93\u5165\u6709\u6548\u884c\u002c\u4e0d\u80fd\u4e3a\u8d1f\u6570");
					$("#submitRow").val("").focus();
				} else if(submitRow > 13) {
					alert("\u4e0d\u80fd\u8d85\u8fc7\u5f53\u524d\u7684\u603b\u884c\u6570");
					$("#submitRow").val("").focus();
				} else if(submitRow == 0 && submitColumn != 0) {
					alert("\u8bf7\u8f93\u5165\u6709\u6548\u884c\u002c\u4e0d\u80fd\u4e3a\u0030\u6216\u7a7a");
					$("#submitRow").val("").focus();
				}

				//--------
				if(submitColumn <= window[name] && submitColumn > 0 && submitRow > 0 && submitRow < 14) {
					//当前元素的水平偏移量
					var bool = Math.floor(submitRow) == submitRow,
						bool2 = Math.floor(submitColumn) == submitColumn;
					if(bool && bool2) {
						var items = base.getClass("#area" + optionName, "area" + optionName + submitRow),
							item = items[0].childNodes[submitColumn - 1],
							Left = item.offsetLeft;
						if(item.classList) {
							item.classList.add("current");
							setTimeout(function() {
								item.classList.remove("current");
							}, 2000);
						}
						$("#area" + optionName).animate({
							"scrollLeft": Left + "px"
						});
						$("#submitColumn").val("");
					} else if(bool && bool2 == false) {
						alert("\u5217\u4e0d\u80fd\u4e3a\u6d6e\u70b9\u6570");
						$("#submitColumn").val("").focus();
					} else if(bool == false && bool2 == false) {
						alert("\u8f93\u5165\u5fc5\u987b\u4e3a\u6b63\u6574\u6570");
						$("#submitColumn").val("").focus();
					}
				} else if(submitColumn > window[name] && submitRow > 0 && submitRow < 14) {
					alert("\u4e0d\u80fd\u8d85\u8fc7\u5f53\u524d\u7684\u603b\u5217\u6570");
					$("#submitColumn").val("").focus();
				} else if(submitColumn < 0 && submitRow > 0 && submitRow < 14) {
					alert("\u8bf7\u8f93\u5165\u6709\u6548\u5217\u002c\u4e0d\u80fd\u4e3a\u8d1f\u6570");
					$("#submitColumn").val("").focus();
				} else if(submitRow != 0 && submitColumn == 0) {
					alert("\u8bf7\u8f93\u5165\u6709\u6548\u5217\u002c\u4e0d\u80fd\u4e3a\u0030\u6216\u7a7a");
					$("#submitColumn").val("").focus();
				} else if(submitRow == 0 && submitColumn == 0) {
					alert("\u884c\u548c\u5217\u4e0d\u80fd\u4e3a\u0030");
					$("#submitRow").val("").focus();
					$("#submitColumn").val("");
				}
			} else if(a && b == false) {
				alert("\u8bf7\u8f93\u5165\u6709\u6548\u7684\u5217");
				$("#submitColumn").val("").focus();
			} else if(a == false && b) {
				alert("\u8bf7\u8f93\u5165\u6709\u6548\u7684\u884c");
				$("#submitRow").val("").focus();
			} else {
				alert("\u8bf7\u8f93\u5165\u6709\u6548\u6570\u636e");
				$("#submitRow").val("").focus();
				$("#submitColumn").val("");
			}
			event.preventDefault();
			return false;
		});
	} else {
		alert("\u4f60\u8fd8\u672a\u767b\u5f55");
		location.href = "login.html";
	}
});