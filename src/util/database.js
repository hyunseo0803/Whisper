import * as SQLite from "expo-sqlite";
import { changeNumberTwoLength } from "./Calender";

// 데이터베이스 연결
const db = SQLite.openDatabase("database.db");

// 테이블 생성 및 초기 데이터 추가
export const createTable = () => {
	db.transaction((tx) => {
		tx.executeSql(`CREATE TABLE IF NOT EXISTS diary 
                    ( id INTEGER PRIMARY KEY AUTOINCREMENT,
                      date TEXT NOT NULL,
                      title TEXT NOT NULL,
                      mood TEXT NOT NULL,
                      weather TEXT NOT NULL,
                      image TEXT NULL,
                      content TEXT NOT NULL,
                      audio_id TEXT NULL,
                      sound TEXT NULL,
                      file TEXT NULL,
                      status TEXT NULL,
                      is_featured INTEGER DEFAULT 0
                      )
    `);
	});
};
export const createContact = () => {
	db.transaction((tx) => {
		tx.executeSql(`CREATE TABLE IF NOT EXISTS contact
                    ( id INTEGER PRIMARY KEY AUTOINCREMENT,
                      date TEXT NOT NULL,
                      title TEXT NOT NULL,
                      content TEXT NOT NULL,
					  email TEXT NOT NULL
                      )
    `);
	});
};

/**
 * 컬럼 추가
 */
const addColumn = () => {
	db.transaction((tx) => {
		tx.executeSql(
			`ALTER TABLE diary ADD COLUMN is_featured INTEGER DEFAULT 0`,
			[],
			(txObj, resultSet) => {
				console.log("Column added successfully");
			},
			(txObj, error) => {
				console.log("Error adding column:", error);
			}
		);
	});
};

// 'diary' 테이블 삭제
const deleteDiaryTable = () => {
	db.transaction((tx) => {
		tx.executeSql(
			"DROP TABLE IF EXISTS diary",
			[],
			() => {
				//   console.log('diary 테이블이 삭제되었습니다.');
			},
			(error) => {
				console.error("diary 테이블 삭제 중 오류가 발생했습니다.", error);
			}
		);
	});
};
// deleteDiaryTable()

/**
 * 일기 추가 함수
 * @param {string} date
 * @param {string} title
 * @param {string} mood
 * @param {string} weather
 * @param {string} image
 * @param {string} content
 * @param {object} audioData
 * @returns true/false
 */
export const insertDiary = async (
	date,
	title,
	mood,
	weather,
	image,
	content,
	audioData
) => {
	try {
		return new Promise(
			(resolve, reject) => {
				db.transaction((tx) => {
					tx.executeSql(
						`INSERT INTO diary (date,title,mood,weather,image,content,audio_id,sound,file,status) VALUES(?,?,?,?,?,?,?,?,?,?)`,
						[
							date,
							title,
							mood,
							weather,
							image,
							content,
							audioData.id,
							audioData.sound,
							audioData.file,
							audioData.status,
						],
						(_, { rowsAffected, insertId }) => {
							if (rowsAffected > 0) {
								resolve(true);
							}
						},
						(_, error) => {
							console.error("Failed to insert data:", error);
							reject(false);
						}
					);
				});
			},
			(error) => {
				console.error("Transaction error:", error);
				reject(false);
			},
			() => {
				resolve(true);
			}
		);
	} catch (error) {
		console.error("Failed to insert data:", error);
	}
};

/**
 * (SET)달력 대표 이미지(일기) 설정 함수
 * @param {number} diaryId
 */
export const setFeaturedDiaryImg = (diaryId, diaryDate, is_featured) => {
	try {
		if (is_featured === 0) {
			return new Promise((resolve, reject) => {
				// 원래 대표일기가 지정이 되어있지 않았다면
				db.transaction((tx) => {
					// 이전 대표일기의 is_featured 값을 0으로 업데이트 (같은 날짜의 데이터만)
					tx.executeSql(
						`UPDATE diary SET is_featured = 0 WHERE is_featured = 1 AND date = ?`,
						[diaryDate],
						(txObj, resultSet) => {
							// console.log('Previous featured diary updated successfully');
						},
						(txObj, error) => {
							console.error("Error updating previous featured diary:", error);
						}
					);

					// 선택한 일기의 is_featured 값을 1로 업데이트
					tx.executeSql(
						`UPDATE diary SET is_featured = 1 WHERE id = ? AND date = ?`,
						[diaryId, diaryDate],
						(txObj, resultSet) => {
							// console.log('Selected diary updated as featured successfully');
							resolve(true);
						},
						(txObj, error) => {
							console.error(
								"Error updating selected diary as featured:",
								error
							);
							reject(false);
						}
					);
				});
			});
		} else if (is_featured === 1) {
			// 원래 대표이미지로 지정되어있었다면,
			return new Promise((resolve, reject) => {
				db.transaction((tx) => {
					// 해당 일기의 is_featured 값을 0으로 업데이트
					tx.executeSql(
						`UPDATE diary SET is_featured = 0 WHERE id = ?`,
						[diaryId],
						(txObj, resultSet) => {
							// console.log('Previous featured diary updated successfully');
							resolve(true);
						},
						(txObj, error) => {
							console.error("Error updating previous featured diary:", error);
							reject(false);
						}
					);
				});
			});
		}
	} catch (error) {
		console.error("대표일기 지정오류!", error);
	}
};

/**
 * 하루 일기 조회
 * @param {string} date
 * @returns 일일일기 배열
 */
export const readDailyDiarys = async (date) => {
	try {
		return new Promise((resolve, reject) => {
			db.transaction((tx) => {
				tx.executeSql(
					`SELECT * FROM diary WHERE date = ?`,
					[date],
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
	} catch (error) {
		console.error(error);
	}
};

/**
 * 문의 추가 함수
 * @param {string} date
 * @param {string} cTitle
 * @param {string} content
 * @param {string} user_email
 */

export const insertContact = async (date, cTitle, content, user_email) => {
	try {
		return new Promise(
			(resolve, reject) => {
				db.transaction((tx) => {
					tx.executeSql(
						`INSERT INTO contact (date,title,content,email) VALUES(?,?,?,?)`,
						[date, cTitle, content, user_email],
						(_, { rowsAffected, insertId }) => {
							if (rowsAffected > 0) {
								console.log(`Data inserted successfully. ID:${insertId}`);
								resolve(true);
							}
						},
						(_, error) => {
							console.log("Failed to insert data:", error);
							reject(false);
						}
					);
				});
			},
			(error) => {
				console.log("Transaction error:", error);
				reject(false);
			},
			() => {
				console.log("Transaction completed successfully.");
				resolve(true);
			}
		);
	} catch (error) {
		console.error("Failed to insert data:", error);
	}
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
						`${year}-${changeNumberTwoLength(month + 1)}-01 23:59:59`,
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
 * 문의 목록 조회
 */
export const readcontact = async () => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				"SELECT title, date ,id FROM contact",
				[],
				(_, resultSet) => {
					const { rows } = resultSet;
					const contacts = [];
					for (let i = 0; i < rows.length; i++) {
						const data = rows.item(i);
						const contact = {
							title: data.title,
							date: data.date,
							id: data.id,
						};
						contacts.push(contact);
					}
					resolve(contacts);
				},
				(_, error) => {
					reject(error);
				}
			);
		});
	});
};

/**
 * 문의 상세 조회
 * * @param {int} id
 *
 */
export const readcontactDetail = async (id) => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				"SELECT * FROM contact WHERE id=?",
				[id],
				(_, resultSet) => {
					const { rows } = resultSet;
					if (rows.length > 0) {
						const contact = rows.item(0);
						resolve({
							id: contact.id,
							title: contact.title,
							content: contact.content,
							email: contact.email,
							date: contact.date,
						});
					} else {
						reject(new Error("Contact not found"));
					}
				},
				(_, error) => {
					reject(error);
				}
			);
		});
	});
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
 * 문의 내역 삭제
 * @param {int} id
 * @returns
 */
export const deleteContact = async (id) => {
	try {
		return new Promise((resolve, reject) => {
			db.transaction((tx) => {
				tx.executeSql(
					"DELETE FROM contact WHERE id= ?",
					[id],
					(_, { rowsAffected }) => {
						if (rowsAffected > 0) {
							resolve(true);
						} else {
							resolve(false);
						}
					},
					(_, error) => {
						console.error(error, "삭제 과정에서 에러 발생!");
						reject(error);
					}
				);
			});
		});
	} catch (e) {
		console.error(e);
	}
};

export const deleteAllContact = async () => {
	try {
		return new Promise((resolve, reject) => {
			db.transaction((tx) => {
				tx.executeSql(
					"DELETE FROM contact",
					[],
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
