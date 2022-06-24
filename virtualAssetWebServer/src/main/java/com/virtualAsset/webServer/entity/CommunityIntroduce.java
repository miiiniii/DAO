package com.virtualAsset.webServer.entity;

import java.util.ArrayList;



/**
 * 커뮤니티 소개 데이터 모델
 * <pre>
 * json변환 함수 구현 필요
 * 거래 내역과 관리자 데이터를 생성자에 포함시켜야함.
 *<b>History:<b/>
 *     안성찬, 1.0, 2022.5.13 작성
 * @author 안성찬
 * @version 1.0, 2022.5.13
 * @see TradeHistory
 * @see Rep
 */
public class CommunityIntroduce {
	private String clubId;
	private ArrayList<Rep> reps = new ArrayList<Rep>();

	public String getClubId() {
		return clubId;
	}
	/**
	 * 커뮤니티 거래 내역 데이터 모델
	 * <pre>
	 *<b>History:<b/>
	 *     안성찬, 1.0, 2022.5.13 작성
	 * @author 안성찬
	 * @version 1.0, 2022.5.13
	 * @see CommunityIntroduce
	 */
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

	/**
	 * 커뮤니티 관리자 데이터 모델
	 * <pre>
	 *<b>History:<b/>
	 *     안성찬, 1.0, 2022.5.13 작성
	 * @author 안성찬
	 * @version 1.0, 2022.5.13
	 * @see CommunityIntroduce
	 */
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
		/**
		 * @param position 직책
		 * @param name 이름
		 * @param join 커뮤니티 가입일
		 */
		public Rep(String position, String name, String join) {
			super();
			this.position = position;
			this.name = name;
			this.join = join;
		}
		
	}
}