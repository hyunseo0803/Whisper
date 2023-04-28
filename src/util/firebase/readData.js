// import { async } from "@firebase/util";
import { collection, query, where, getDocs, and, orderBy, getCountFromServer, get, startAt, endAt, endBefore, Timestamp } from "firebase/firestore";
import { db, auth } from "../../../firebase";

// const user = ;  // TODO: 로그인 완료되면 조회하도록 변경
const diaryCollection = collection(db, "diary");

/**
 * (firebase)무드 트레커 정보 GET 함수
 * @param {int} month 
 * @param {int} year 
 * @returns {array} moodCountData
 */
export const getMoodData = async(mood, year, month) => {
  try{
    const q = query(diaryCollection, 
      where("uid", "==", auth.currentUser.uid), 
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