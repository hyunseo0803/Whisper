import * as SQLite from "expo-sqlite";
import { changeNumberTwoLength } from "./Calender";

// 데이터베이스 연결
const db = SQLite.openDatabase("database.db");

// 테이블 생성 및 초기 데이터 추가
export const createTable = () => {
	db.transaction((tx) => {
		tx.executeSql(`CREATE TABLE IF NOT EXISTS diary 
                    ( id INTEGER PRIMARY KEY AUTOINCREMENT,
                      date TEXT,
                      title TEXT,
                      mood TEXT,
                      weather TEXT,
                      image TEXT,
                      content TEXT,
                      audio_id TEXT,
                      sound TEXT,
                      file TEXT,
                      status TEXT
                      )
    `);
	});
};

/**
 * 일기 조회 (시작날짜-종료날짜)
 * @param {int} month
 * @param {int} year
 * @param {String} howSortDiary 'DESC','ASC'
 * @returns {Array}일기 배열
 */
export const readDiarys = async (month, year, howSortDiary) => {
	try {
		return new Promise((resolve, reject) => {
			db.transaction((tx) => {
				tx.executeSql(
					`SELECT * FROM diary WHERE date BETWEEN ? AND ? ORDER BY date ${howSortDiary}`,
					[
						`${year}-${changeNumberTwoLength(month)}-01 00:00:00`,
						`${year}-${changeNumberTwoLength(month + 1)}-0 23:59:59`,
					],
					(_, { rows }) => {
						const diarys = rows._array;
						resolve(diarys);
					},
					(_, error) => {
						reject(error);
					}
				);
			});
		});
	} catch (e) {
		console.error(e);
	}
};

/**
 * 일기 삭제
 * @param {int} id
 * @returns 일기 삭제
 */
export const deleteDiarys = async (id) => {
	try {
		return new Promise((resolve, reject) => {
			db.transaction((tx) => {
				tx.executeSql(
					"DELETE FROM diary WHERE id = ?",
					[id],
					(_, { row }) => {
						return true;
					},
					(_, error) => {
						console.error(error, "삭제 과정에서 에러 발생!");
						return false;
					}
				);
			});
		});
	} catch (e) {
		console.error(e);
	}
};

/**
 * 월별 감정 count
 * @param {int} month
 * @param {int} year
 * @returns 월별 감정 count
 */
export const getDiaryCountByMood = async (month, year) => {
	try {
		return new Promise((resolve, reject) => {
			db.transaction((tx) => {
				tx.executeSql(
					"SELECT mood, COUNT(*) AS count FROM diary WHERE date BETWEEN ? AND ? GROUP BY mood",
					[
						`${year}-${changeNumberTwoLength(month)}-01 00:00:00`,
						`${year}-${changeNumberTwoLength(month + 1)}-0 23:59:59`,
					],
					(_, { rows }) => {
						const counts = {
							happy: 0, // 기쁨
							disgust: 0, // 혐오
							surprised: 0, // 놀람
							angry: 0, // 화남
							sad: 0, // 슬픔
							fear: 0, // 두려움
							expressionless: 0, // 무표정
						};
						for (let i = 0; i < rows.length; i++) {
							const item = rows.item(i);
							counts[item.mood] = item.count;
						}
						resolve(counts);
					},
					(_, error) => {
						reject(error);
					}
				);
			});
		});
	} catch (e) {
		console.error(e);
	}
};

/**
 * 검색 함수
 * @param {string} title
 * @param {string} mood
 * @param {string} weather
 * @param {string} startDate
 * @param {string} endDate
 * @returns 검색 결과 배열
 */
export const getDiarySearch = (title, mood, weather, startDate, endDate) => {
	console.log("제목:", title);
	console.log("기분:", mood);
	console.log("날씨:", weather);
	console.log("시작:", startDate);
	console.log("종료:", endDate);
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			let query = "SELECT * FROM diary WHERE 1 = 1";
			let params = [];

			if (title !== "") {
				query += " AND title LIKE ?";
				params.push(`%${title}%`);
			}

			if (mood) {
				query += " AND mood = ?";
				params.push(mood);
			}

			if (weather) {
				query += " AND weather = ?";
				params.push(weather);
			}

			if (startDate !== "") {
				query += " AND date >= ?";
				params.push(startDate);
			}

			if (endDate !== "") {
				query += " AND date <= ?";
				params.push(endDate);
			}

			tx.executeSql(
				query,
				params,
				(_, { rows }) => {
					const diarys = rows._array;
					resolve(diarys);
				},
				(_, error) => {
					reject(error);
				}
			);
		});
	});
};

/**
 * 일기가 있는 날짜 배열을 구하는 함수
 * @returns {Array}일기가 있는 날짜
 */
export const getDiaryDates = () => {
	try {
		return new Promise((resolve, reject) => {
			db.transaction((tx) => {
				tx.executeSql(
					`SELECT date FROM diary`,
					[],
					(_, { rows }) => {
						let diarys = [];
						rows._array.forEach((element) => {
							diarys.push(element["date"]);
						});
						resolve(diarys);
					},
					(_, error) => {
						reject(error);
					}
				);
			});
		});
	} catch (e) {
		console.error(e);
	}
};
