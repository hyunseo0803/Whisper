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
 * 
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