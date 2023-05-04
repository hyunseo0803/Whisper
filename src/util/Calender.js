/**
 * 월(int)을 영어 월 이름으로 바꿔주는 함수
 * @param {int} NMonth 
 * @returns EnglishMonthName
 */
export function changeMonth(NMonth) {
  const EMonth = [
    'January',
    'Fabruary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  return EMonth[NMonth-1]
}

/**
 * 날짜 수정해주는 함수
 * @param {int} year 
 * @param {int} yearPlus 
 * @param {int} month 
 * @param {int} monthPlus 
 * @param {int} day 
 * @param {int} dayPlus 
 * 
 * @returns {date}
 */
export const dayPlus = (year, yearPlus, month, monthPlus, day, dayPlus) => {
  
  date = new Date(`${year+yearPlus}-${month+monthPlus}-${day+dayPlus}`)
  
  return date
}


/**
 * 한자리 숫자를 두자리 숫자로 만들어주는 함수
 * @param {int} month 
 * @returns ex)05
 */
export const changeNumberTwoLength = (month) => {
  if (month.toString().length !== 2){
    return '0'+month
  }else{
    return month
  }
}