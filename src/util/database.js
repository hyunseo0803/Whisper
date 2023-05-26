import * as SQLite from "expo-sqlite";
import { changeNumberTwoLength } from "./Calender";

// 데이터베이스 연결
const db = SQLite.openDatabase('database.db');

// 테이블 생성 및 초기 데이터 추가
export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(`CREATE TABLE IF NOT EXISTS diary 
                    ( id INTEGER PRIMARY KEY AUTOINCREMENT,
                      date TEXT,
                      title TEXT,
                      mood TEXT,
                      weather TEXT,
                      image TEXT,
                      content TEXT,
                      voice TEXT)
    `)
  })
}

/**
 * 일기 조회 (시작날짜-종료날짜)
 * @param {int} month 
 * @param {int} year 
 * @param {String} howSortDiary 'DESC','ASC' 
 * @returns {Array}일기 배열
 */
export const readDiarys = async(month, year, howSortDiary) => {
  try{
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
  }
  catch(e) {
    console.error(e)
  }
}

/**
 * 일기 삭제
 * @param {int} id 
 * @returns 일기 삭제
 */
export const deleteDiarys = async(id) => {
  try{
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql('DELETE FROM diary WHERE id = ?', 
        [id], 
        (_, {row}) => {
          return true
        },
        (_, error) => {
          console.error(error, '삭제 과정에서 에러 발생!')
          return false
        })
      });
    });
  }
  catch(e){
    console.error(e)
  }
}


export const getDiaryCountByMood = async(month, year) => {
  try{
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT mood, COUNT(*) AS count FROM diary WHERE date BETWEEN ? AND ? GROUP BY mood',
          [
            `${year}-${changeNumberTwoLength(month)}-01 00:00:00`,
            `${year}-${changeNumberTwoLength(month + 1)}-0 23:59:59`,
          ],
          (_, { rows }) => {
            const counts = {
              happy: 0,           // 기쁨
              disgust: 0,         // 혐오
              surprised: 0,       // 놀람
              angry: 0,           // 화남
              sad: 0,             // 슬픔
              fear: 0,            // 두려움
              expressionless: 0,  // 무표정
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
  }
  catch(e){
    console.error(e)
  }
}
