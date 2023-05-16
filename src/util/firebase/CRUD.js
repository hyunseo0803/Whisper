// import { async } from "@firebase/util";
import { async } from "@firebase/util";
import { collection, query, where, getDocs, deleteDoc, orderBy, getCountFromServer, doc, startAt, endAt, and, Timestamp, limit } from "firebase/firestore";
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
                where("date", ">=", new Date(`${year}-${month}-1 0:0:0`)),  // 4월의 첫 날 0시 0분 0초~
                where("date", "<=", new Date(`${year}-${month+1}-0 23:59:59`))    // 4월의 마지막 날 23시59분59초
              );

    const d_data = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const fullDate = timestampToDate(doc.data().date)
      const day = fullDate.split('.')[2][0] === '0' ? fullDate.split('.')[2][1] : fullDate.split('.')[2]

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
      where("date", ">=", Timestamp.fromDate(new Date(`${year}-${month}-1 0:0:0`))), 
      where("date", "<=", Timestamp.fromDate(new Date(`${year}-${month+1}-0 23:59:59`))),
    );
    const snapshot = await getCountFromServer(q);
    const moodCountResult = snapshot.data().count;
    return moodCountResult
  }
  catch(e){
    console.log("무드트래커 GET 오류", e)
  }
}

/**
 * (firebase)일기 쓴 날짜 GET 함수
 */
export const getDiaryDate = async() => {
  try{
    const q = query(diaryCollection,
      where("u_id", "==", auth.currentUser.uid), 
      orderBy('date')
    )
    const result = await getDocs(q);
    let arr = [];
    result.forEach((doc) => {
      arr.push(timestampToDate(doc.data().date).replace(/\./g, '-'))
      
    });
    return arr
  }
  catch(e){
    console.log("getDiaryDate GET 오류", e)
  }
}

/**
 * (firebase)일기 배열 GET 함수
 * @param {int} month 
 * @param {int} year 
 */
export const getDiaryList = async(month, year, listupType) => {
  try{
    const q = query(diaryCollection,
      where("u_id", "==", auth.currentUser.uid), 
      orderBy('date', listupType),
      where("date", ">=", Timestamp.fromDate(new Date(`${year}-${month}-1 0:0:0`))), 
      where("date", "<=", Timestamp.fromDate(new Date(`${year}-${month+1}-0 23:59:59`))),
    );
    const result = await getDocs(q);
    let arr = [];
    result.forEach((doc) => {
      var finDoc = doc.data()
      finDoc.d_id = doc.id
      arr.push(finDoc)
    });
    return arr
  }
  catch(e){
    console.log("getDiaryList GET 오류", e)
  }
}

/**
 * 일기 검색 결과를 반환해주는 함수
 * @param {string} title 
 * @param {string} startDate '2020.01.01'
 * @param {string} endDate '2020.01.01'
 * @param {string} mood string/null
 * @param {string} weather string/null
 * @returns arr
 */
export const getSearchDiary = async(title, startDate, endDate, mood, weather) => {
  /**
   * 검색하려는 감정 배열 반환
   * @param {string} mood 
   * @returns arr
   */
  const searchMood = (mood) => {
    if(mood === null){
      return ['happy', 'disgust', 'surprised', 'angry', 'sad', 'fear', 'expressionless']
    }else{
      return [mood]
    }
  }

  /**
   * 검색하려는 날씨 배열 반환
   * @param {string} weather 
   * @returns 
   */
  const searchWeather = (weather) => {
    if(weather === null){
      return ['sunny', 'littleCloud', 'cloudy', 'rain', 'snow', 'lightning']
    }
    else{
      return [weather]
    }
  }

  /**
   * 검색할 날짜 구하는 함수 - 지정하지 않을경우 2010.01.01부터 오늘날짜까지의 일기를 검색
   * @param {date} date startDate, endDate 
   * @param {string} type 'start', 'end'
   * 
   */
  const searchDate = (date, type) => {
    if(type === 'start'){
      if(date === ''){
        return Timestamp.fromDate(new Date(`2010-01-01 0:0:0`))
      }else{
        return Timestamp.fromDate(new Date(`${startDate.split('.')[0]}-${startDate.split('.')[1]}-${startDate.split('.')[2]} 0:0:0`))
      }
    }
    else{
      if(date === ''){
        const DATE = new Date()
        return Timestamp.fromDate(new Date(`${DATE.getFullYear()}-${DATE.getMonth()+1}-${DATE.getDate()} 23:59:59`))
      }else{
        return Timestamp.fromDate(new Date(`${endDate.split('.')[0]}-${endDate.split('.')[1]}-${endDate.split('.')[2]} 23:59:59`))
      }
    }
  }

  try{
    const dateQuery = query(diaryCollection,
      where("u_id", "==", auth.currentUser.uid), 
      orderBy('date'),
      where("date", ">=", searchDate(startDate, 'start')), 
      where("date", "<=", searchDate(endDate, 'end')),
      )
    const moodWeatherQuery = query(diaryCollection,
      where("u_id", "==", auth.currentUser.uid), 
      where('mood', 'in', searchMood(mood)),
      where('weather', 'in', searchWeather(weather)),
      orderBy('date'),
      where("date", ">=", searchDate(startDate, 'start')), 
      where("date", "<=", searchDate(endDate, 'end')),
    );

    let arr = [];

    if(mood!==null || weather!==null){
      const result = await getDocs(moodWeatherQuery);
      result.forEach((doc) => {
        var finDoc = doc.data()
        finDoc.d_id = doc.id
        arr.push(finDoc)
      });
    }
    else{
      const result = await getDocs(dateQuery);
      result.forEach((doc) => {
        var finDoc = doc.data()
        finDoc.d_id = doc.id
        arr.push(finDoc)
      });
    }

    if(title !== ''){
      // filter를 사용해서 title에 해당 글자가 포함되어 있는 객체만 남김
      arr = arr.filter((searchText) => {
        if(searchText.title.includes(title)){
          return true
        }
      })
    }
    
    return arr
  }
  catch(e){
    console.log("getDiaryList GET 오류", e)
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
    await deleteDoc(doc(db, "diary", dId));
    return true
  }
  catch(e) {
    console.log('삭제 firebase 오류', e)
    return false
  }
}
