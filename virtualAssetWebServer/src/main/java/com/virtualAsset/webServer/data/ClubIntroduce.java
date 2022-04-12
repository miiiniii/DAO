package com.virtualAsset.webServer.data;

import java.util.ArrayList;

public class ClubIntroduce {
	private String clubId;
	private ArrayList<Rep> reps = new ArrayList<Rep>();

	public String getClubId() {
		return clubId;
	}

	public class TradeHistory {
		private String tag;
		private String name;
		private String tradeDateString;
		public String getTag() {
			return tag;
		}
		public String getName() {
			return name;
		}
		public String getTradeDateString() {
			return tradeDateString;
		}
		public TradeHistory(String tag, String name, String tradeDateString) {
			super();
			this.tag = tag;
			this.name = name;
			this.tradeDateString = tradeDateString;
		}
	}

	public class Rep {
		private String position;
		private String name;
		private String join;

		public String getPosition() {
			return position;
		}

		public String getName() {
			return name;
		}

		public String getJoin() {
			return join;
		}

		public Rep(String name, String join) {
			super();
			this.name = name;
			this.join = join;
		}
	}
}