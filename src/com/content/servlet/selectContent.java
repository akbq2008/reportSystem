package com.content.servlet;

import java.io.*;
import java.sql.*;
import java.util.*;

import javax.servlet.*;
import javax.servlet.http.*;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class selectContent extends HttpServlet {
	private static final long serialVersionUID = 1L;
	Connection con;
	Statement sqlA, sqlB1, sqlB2, sqlC1, sqlC2, sqlD1, sqlD2, sqlE1, sqlE2;

	@Override
	public void init(ServletConfig config) throws ServletException {
		// TODO Auto-generated method stub
		super.init(config);
	}

	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (Exception e) {
		}
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		try {
			PrintWriter out = response.getWriter();
			List list = new ArrayList(), listA = new ArrayList(), // 创建列表A
			listB1 = new ArrayList(), // 创建列表B1
			listB2 = new ArrayList(), // 创建列表B2
			listC1 = new ArrayList(), // 创建列表C1
			listC2 = new ArrayList(), // 创建列表C2
			listD1 = new ArrayList(), // 创建列表D1
			listD2 = new ArrayList();// 创建列表D2
			String uri = "jdbc:mysql://127.0.0.1/report?"
					+ "user=root&password=123456&characterEncoding=utf-8";
			con = DriverManager.getConnection(uri);
			sqlA = con.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
					ResultSet.CONCUR_READ_ONLY);
			sqlB1 = con.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
					ResultSet.CONCUR_READ_ONLY);
			sqlB2 = con.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
					ResultSet.CONCUR_READ_ONLY);
			sqlC1 = con.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
					ResultSet.CONCUR_READ_ONLY);
			sqlC2 = con.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
					ResultSet.CONCUR_READ_ONLY);
			sqlD1 = con.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
					ResultSet.CONCUR_READ_ONLY);
			sqlD2 = con.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
					ResultSet.CONCUR_READ_ONLY);
			sqlE1 = con.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
					ResultSet.CONCUR_READ_ONLY);
			sqlE2 = con.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
					ResultSet.CONCUR_READ_ONLY);
			sqlA = con.createStatement();// 创建sql语句
			sqlB1 = con.createStatement();// 创建sql语句
			sqlB2 = con.createStatement();// 创建sql语句
			sqlC1 = con.createStatement();// 创建sql语句
			sqlC2 = con.createStatement();// 创建sql语句
			sqlD1 = con.createStatement();// 创建sql语句
			sqlD2 = con.createStatement();// 创建sql语句
			sqlD1 = con.createStatement();// 创建sql语句
			sqlD2 = con.createStatement();// 创建sql语句
			sqlE1 = con.createStatement();// 创建sql语句
			sqlE2 = con.createStatement();// 创建sql语句
			// 接收参数
			String columnOwn = request.getParameter("columnOwn"), tel = request
					.getParameter("tel"), people = request
					.getParameter("people"), rowOwn = request
					.getParameter("rowOwn"), areaNameOwn = request
					.getParameter("areaNameOwn");
			String indata = request.getParameter("indata");
			/*------------------------导入excel表start--------------------*/
			if (indata != null) {
				JSONArray json = JSONArray.fromObject(indata);
				/* a start */
				for (int i = 0; i < 663; i++) {
					JSONObject jsonobject = JSONObject.fromObject(json.get(i));
					User user = (User) JSONObject
							.toBean(jsonobject, User.class);// 将json对象转换为java对象
					if (user.getDataName() == null || user.getTel() == null) {
						user.setDataName("");
						user.setTel("");
					}
					String ina = "update area" + user.getAreaName()
							+ " set tel='" + user.getTel() + "',"
							+ "dataName='" + user.getDataName() + "'"
							+ " where rowOwn='" + user.getRowOwn() + "'"
							+ " and columnOwn='" + user.getColumnOwn() + "';";
					int rsa = sqlE2.executeUpdate(ina);
				}
				/* a end */
				/* b1 start */
				for (int i = 663; i < 1131; i++) {
					JSONObject jsonobject = JSONObject.fromObject(json.get(i));
					User user = (User) JSONObject
							.toBean(jsonobject, User.class);// 将json对象转换为java对象
					if (user.getDataName() == null || user.getTel() == null) {
						user.setDataName("");
						user.setTel("");
					}
					String inb1 = "update area" + user.getAreaName()
							+ " set tel='" + user.getTel() + "',"
							+ "dataName='" + user.getDataName() + "'"
							+ " where rowOwn='" + user.getRowOwn() + "'"
							+ " and columnOwn='" + user.getColumnOwn() + "';";
					int rsb1 = sqlE2.executeUpdate(inb1);
				}

				/* b1end */
				/* b2 start */
				for (int i = 1131; i < 1599; i++) {
					JSONObject jsonobject = JSONObject.fromObject(json.get(i));
					User user = (User) JSONObject
							.toBean(jsonobject, User.class);// 将json对象转换为java对象
					if (user.getDataName() == null || user.getTel() == null) {
						user.setDataName("");
						user.setTel("");
					}
					String inb2 = "update area" + user.getAreaName()
							+ " set tel='" + user.getTel() + "',"
							+ "dataName='" + user.getDataName() + "'"
							+ " where rowOwn='" + user.getRowOwn() + "'"
							+ " and columnOwn='" + user.getColumnOwn() + "';";
					int rsb2 = sqlE2.executeUpdate(inb2);
				}

				/* b2end */
				/* c1 start */
				for (int i = 1599; i < 2067; i++) {
					JSONObject jsonobject = JSONObject.fromObject(json.get(i));
					User user = (User) JSONObject
							.toBean(jsonobject, User.class);// 将json对象转换为java对象
					if (user.getDataName() == null || user.getTel() == null) {
						user.setDataName("");
						user.setTel("");
					}
					String inc1 = "update area" + user.getAreaName()
							+ " set tel='" + user.getTel() + "',"
							+ "dataName='" + user.getDataName() + "'"
							+ " where rowOwn='" + user.getRowOwn() + "'"
							+ " and columnOwn='" + user.getColumnOwn() + "';";
					int rsc1 = sqlE2.executeUpdate(inc1);
				}

				/* c1end */
				/* c2 start */
				for (int i = 2067; i < 2535; i++) {
					JSONObject jsonobject = JSONObject.fromObject(json.get(i));
					User user = (User) JSONObject
							.toBean(jsonobject, User.class);// 将json对象转换为java对象
					if (user.getDataName() == null || user.getTel() == null) {
						user.setDataName("");
						user.setTel("");
					}
					String inc2 = "update area" + user.getAreaName()
							+ " set tel='" + user.getTel() + "',"
							+ "dataName='" + user.getDataName() + "'"
							+ " where rowOwn='" + user.getRowOwn() + "'"
							+ " and columnOwn='" + user.getColumnOwn() + "';";
					int rsc2 = sqlE2.executeUpdate(inc2);
				}

				/* c2end */
				/* d1 start */
				for (int i = 2535; i < 3302; i++) {
					JSONObject jsonobject = JSONObject.fromObject(json.get(i));
					User user = (User) JSONObject
							.toBean(jsonobject, User.class);// 将json对象转换为java对象
					if (user.getDataName() == null || user.getTel() == null) {
						user.setDataName("");
						user.setTel("");
					}
					String ind1 = "update area" + user.getAreaName()
							+ " set tel='" + user.getTel() + "',"
							+ "dataName='" + user.getDataName() + "'"
							+ " where rowOwn='" + user.getRowOwn() + "'"
							+ " and columnOwn='" + user.getColumnOwn() + "';";
					int rsd1 = sqlE2.executeUpdate(ind1);
				}

				/* d1end */
				/* d2 start */
				for (int i = 3302; i < 4069; i++) {
					JSONObject jsonobject = JSONObject.fromObject(json.get(i));
					User user = (User) JSONObject
							.toBean(jsonobject, User.class);// 将json对象转换为java对象
					if (user.getDataName() == null || user.getTel() == null) {
						user.setDataName("");
						user.setTel("");
					}
					String ind2 = "update area" + user.getAreaName()
							+ " set tel='" + user.getTel() + "',"
							+ "dataName='" + user.getDataName() + "'"
							+ " where rowOwn='" + user.getRowOwn() + "'"
							+ " and columnOwn='" + user.getColumnOwn() + "';";
					int rsd2 = sqlE2.executeUpdate(ind2);
				}

				/* d2end */
			}
			/*------------------------导入excel表end--------------------*/
			/*------------------------修改更新数据start--------------------*/
			// 更新dataName
//			System.out.println("1areaNameOwn:" + areaNameOwn + "rowOwn:"
//					+ rowOwn + "columnOwn:" + columnOwn + "people:" + people
//					+ "tel:" + tel);
			if (areaNameOwn != null && rowOwn != null && columnOwn != null
					&& people != null && tel == null) {
				System.out.println("areaNameOwn:" + areaNameOwn + "rowOwn:"
						+ rowOwn + "columnOwn:" + columnOwn + "  people:"
						+ people + "  tel:" + tel);
				String uparea1 = "update area" + areaNameOwn
						+ " set dataName='" + people + "'" + "where rowOwn='"
						+ rowOwn + "'" + "and columnOwn='" + columnOwn + "';";
				int rs1 = sqlE1.executeUpdate(uparea1);
			}
			// 更新tel
			if (areaNameOwn != null && rowOwn != null && columnOwn != null
					&& tel != null && people == null) {
				String uparea2 = "update area" + areaNameOwn + " set tel='"
						+ tel + "'" + "where rowOwn='" + rowOwn + "'"
						+ "and columnOwn='" + columnOwn + "';";
				int rs2 = sqlE2.executeUpdate(uparea2);
			}
			/*------------------------修改更新数据end--------------------*/
			/*------------------------查询数据start--------------------*/
			// sql 语句定义
			String areaA = "select * from areaa", areaB1 = "select * from areab1", areaB2 = "select * from areab2", areaC1 = "select * from areac1", areaC2 = "select * from areac2", areaD1 = "select * from aread1", areaD2 = "select * from aread2";
			ResultSet rsareaA = sqlA.executeQuery(areaA), // 执行sql语句
			rsareaB1 = sqlB1.executeQuery(areaB1), // 执行sql语句
			rsareaB2 = sqlB2.executeQuery(areaB2), // 执行sql语句
			rsareaC1 = sqlC1.executeQuery(areaC1), // 执行sql语句
			rsareaC2 = sqlC2.executeQuery(areaC2), // 执行sql语句
			rsareaD1 = sqlD1.executeQuery(areaD1), // 执行sql语句
			rsareaD2 = sqlD2.executeQuery(areaD2);// 执行sql语句
			ResultSetMetaData mdA = rsareaA.getMetaData(), // 获得A的结果集结构信息,元数据
			mdB1 = rsareaB1.getMetaData(), mdB2 = rsareaB2.getMetaData(), mdC1 = rsareaC1
					.getMetaData(), mdC2 = rsareaC2.getMetaData(), mdD1 = rsareaD1
					.getMetaData(), mdD2 = rsareaD2.getMetaData();
			int columnCountA = mdA.getColumnCount(), // 获得A的列数
			columnCountB1 = mdB1.getColumnCount(), columnCountB2 = mdB2
					.getColumnCount(), columnCountC1 = mdC1.getColumnCount(), columnCountC2 = mdC2
					.getColumnCount(), columnCountD1 = mdD1.getColumnCount(), columnCountD2 = mdD2
					.getColumnCount();
			// ---------------------A start
			while (rsareaA.next()) {
				Map rowDataA = new HashMap();
				for (int i = 1; i <= columnCountA; i++) {
					rowDataA.put(mdA.getColumnName(i), rsareaA.getObject(i));
				}
				listA.add(rowDataA);// 将map中的值添加到List中
			}

			// ---------------------A end
			// ---------------------B1 start
			while (rsareaB1.next()) {
				Map rowDataB1 = new HashMap();
				for (int i = 1; i <= columnCountB1; i++) {
					rowDataB1.put(mdB1.getColumnName(i), rsareaB1.getObject(i));
				}
				listB1.add(rowDataB1);// 将map中的值添加到List中
			}

			// ---------------------B1 end
			// ---------------------B2 start
			while (rsareaB2.next()) {
				Map rowDataB2 = new HashMap();
				for (int i = 1; i <= columnCountB2; i++) {
					rowDataB2.put(mdB2.getColumnName(i), rsareaB2.getObject(i));
				}
				listB2.add(rowDataB2);// 将map中的值添加到List中
			}

			// ---------------------B2 end
			// ---------------------C1 start
			while (rsareaC1.next()) {
				Map rowDataC1 = new HashMap();
				for (int i = 1; i <= columnCountC1; i++) {
					rowDataC1.put(mdC1.getColumnName(i), rsareaC1.getObject(i));
				}
				listC1.add(rowDataC1);// 将map中的值添加到List中
			}

			// ---------------------C1 end
			// ---------------------C2 start
			while (rsareaC2.next()) {
				Map rowDataC2 = new HashMap();
				for (int i = 1; i <= columnCountC2; i++) {
					rowDataC2.put(mdC2.getColumnName(i), rsareaC2.getObject(i));
				}
				listC2.add(rowDataC2);// 将map中的值添加到List中
			}

			// ---------------------C2 end
			// ---------------------D1 start
			while (rsareaD1.next()) {
				Map rowDataD1 = new HashMap();
				for (int i = 1; i <= columnCountD1; i++) {
					rowDataD1.put(mdD1.getColumnName(i), rsareaD1.getObject(i));
				}
				listD1.add(rowDataD1);// 将map中的值添加到List中
			}

			// ---------------------D1 end
			// ---------------------D2 start
			while (rsareaD2.next()) {
				Map rowDataD2 = new HashMap();
				for (int i = 1; i <= columnCountD2; i++) {
					rowDataD2.put(mdD2.getColumnName(i), rsareaD2.getObject(i));
				}
				listD2.add(rowDataD2);// 将map中的值添加到List中
			}

			// ---------------------D2 end

			list.add(listA);
			list.add(listB1);
			list.add(listB2);
			list.add(listC1);
			list.add(listC2);
			list.add(listD1);
			list.add(listD2);
			JSONArray jsonArr = new JSONArray();
			jsonArr.add(list);// 将List中的值添加到json数组中
			out.print(jsonArr);
			con.close();
			/*------------------------查询数据end--------------------*/
		} catch (SQLException e) {
			System.out.println(e);

		}

	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(req, resp);
	}
}
