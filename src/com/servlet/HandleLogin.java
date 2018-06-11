package com.servlet;

import java.io.*;
import java.sql.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import net.sf.json.JSONObject;

public class HandleLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;
	Connection con;
	Statement sql;
	ResultSet rs;

	@Override
	public void init(ServletConfig config) throws ServletException {
		// TODO Auto-generated method stub
		super.init(config);
	}

	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (Exception e) {
		}

		try {
			PrintWriter out = response.getWriter();
			String secreate = "", telephone = "";
			String uri = "jdbc:mysql://127.0.0.1/report?"
					+ "user=root&password=123456&characterEncoding=utf-8";
			con = DriverManager.getConnection(uri);
			sql = con.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
					ResultSet.CONCUR_READ_ONLY);
			String userName = request.getParameter("userNamehash");
			if (userName != null) {
				String conn = "select  * from login where userName='"
						+ userName + "';";
				sql = con.createStatement();
				rs = sql.executeQuery(conn);
				Map<String, Object> map = new HashMap<String, Object>();
				if (rs.next()) {
					secreate = rs.getString("secreate");
					telephone = rs.getString("telephone");
					map.put("secreate", secreate);
					map.put("telephone", telephone);
					map.put("mes", "10001");
					rs.last();
				} else {
					map.put("mes", "10000");
				}
				JSONObject json = JSONObject.fromObject(map);
				out.print(json);// 同一组装
			}
			con.close();
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
