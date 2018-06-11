package com.content.servlet;

public class User {
	private String areaName="";
	private String columnOwn;
	private String tel="";
	private String rowOwn;
	private String dataName;

	@Override
	public String toString() {
		return "User [areaName=" + areaName + ", columnOwn=" + columnOwn
				+ ", tel=" + tel + ", rowOwn=" + rowOwn + ", dataName="
				+ dataName + "]";
	}

	public String getAreaName() {
		return areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}

	public String getColumnOwn() {
		return columnOwn;
	}

	public void setColumnOwn(String columnOwn) {
		this.columnOwn = columnOwn;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getRowOwn() {
		return rowOwn;
	}

	public void setRowOwn(String rowOwn) {
		this.rowOwn = rowOwn;
	}

	public String getDataName() {
		return dataName;
	}

	public void setDataName(String dataName) {
		this.dataName = dataName;
	}

}
