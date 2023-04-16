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
