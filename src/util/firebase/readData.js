// import { async } from "@firebase/util";
import { async } from "@firebase/util";
import { collection, query, where, getDocs, deleteDoc, orderBy, getCountFromServer, doc, startAt, endAt, endBefore, Timestamp } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { changeNumberTwoLength } from "../Calender";

const diaryCollection = collection(db, "diary");

  /**
   * firebase에서 캘린더 데이터 받아오는 함수
   * @param {int} month 
   * @param {int} year 
   * 
   * @return {array} Ddata
   */
export const getCalenderData = async(month, year) => {
  const q = query(collection(db, "diary"), 
                where("u_id", "==", auth.currentUser.uid),
                orderBy("date"),
                where("date", ">", new Date(`${year}-${month}-1`)),  // 4월의 첫 날 00시
                where("date", "<", new Date(`${year}-${month+1}-1`))    // 5월의 첫 날 00시
              );

    const d_data = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //날짜 convert day+1
      const year = doc.data().date.toDate().toISOString().split('T')[0].split("-")[0]
      const month = doc.data().date.toDate().toISOString().split('T')[0].split("-")[1][0] === '0' ? doc.data().date.toDate().toISOString().split('T')[0].split("-")[1][1] : doc.data().date.toDate().toISOString().split('T')[0].split("-")[1]
      const day = doc.data().date.toDate().toISOString().split('T')[0].split("-")[2][0] === '0' ? doc.data().date.toDate().toISOString().split('T')[0].split("-")[2][1] : doc.data().date.toDate().toISOString().split('T')[0].split("-")[2]
      // const imgdate = dayPlus(year, 0, month, 0, day, 1)
      // const imgdate = (year+"-"+month+"-"+day)
      const imgdate = (day*1)
      // 이미지
      const imgUrl = doc.data().image;

      const imageCalenderData = {
        date : imgdate,
        imgUrl : imgUrl
      }
      d_data.push(imageCalenderData)
    });
    return d_data
}

/**
 * (firebase)무드 트레커 정보 GET 함수
 * @param {int} month 
 * @param {int} year 
 * @returns {array} moodCountData
 */
export const getMoodData = async(mood, year, month) => {
  try{
    const q = query(diaryCollection, 
      where("u_id", "==", auth.currentUser.uid), 
      where("mood", "==", mood), 
      orderBy("date"),
      where("date", ">=", Timestamp.fromDate(new Date(`${year}-${month}-1`))), 
      where("date", "<", Timestamp.fromDate(new Date(`${year}-${month+1}-1`))),
    );
    const snapshot = await getCountFromServer(q);
    const moodCountResult = snapshot.data().count;
    return moodCountResult
  }
  catch(e){
    console.log(e)
  }
}

/**
 * (firebase)일기 배열 GET 함수
 * @param {int} month 
 * @param {int} year 
 */
export const getDiaryList = async(month, year) => {
  try{
    const q = query(diaryCollection,
      where("u_id", "==", auth.currentUser.uid), 
      orderBy('date'),
      where("date", ">=", Timestamp.fromDate(new Date(`${year}-${month}-1`))), 
      where("date", "<", Timestamp.fromDate(new Date(`${year}-${month+1}-1`))),
    );
    const result = await getDocs(q);
    let arr = [];
    result.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      arr.push(doc.data())
    });
    return arr
  }
  catch(e){
    console.log(e)
  }
}

/**
 * timestamp를 날짜(string)로 변환해주는 함수 
 * @param {timestamp} timestamp 
 * @returns {string} yyyy.MM.DD
 */
export const timestampToDate = (timestamp) => {
	let date = timestamp.toDate();
	let mm = date.getMonth()+1;
	let dd = date.getDate();
	let yyyy = date.getFullYear();

	date = yyyy +'.'+ changeNumberTwoLength(mm) + '.' + changeNumberTwoLength(dd);
	return date;
}

/**
 * Delete -
 * 일기 삭제 함수
 * @param {string} dId 
 */
export const deleteDiary = async(dId) => {
  try{
    await deleteDoc(doc(db, "diary", `${dId}_${auth.currentUser.uid}`));
  }
  catch(e) {
    console.log('삭제 firebase 오류', e)
  }
}