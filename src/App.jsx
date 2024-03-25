import { useRef, useState } from 'react'
import './App.css'

function App() {

  const [day, setDay] = useState('--')
  const [month, setMonth] = useState('--')
  const [year, setYear] = useState('--')

  const [dayError, setDayError] = useState(1)
  const [monthError, setMonthError] = useState(1)
  const [yearError, setYearError] = useState(1)

  const [error, setError] = useState('')

  const dayRef = useRef(null)
  const monthRef = useRef(null)
  const yearRef = useRef(null)

  let fechaNacimiento = ''

  const handleAge = e => {
    e.preventDefault()
    let day = parseInt(dayRef.current.value, 10);
    let month = parseInt(monthRef.current.value, 10);
    let year = parseInt(yearRef.current.value, 10);

    // let validar = true

    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const bisiestoYear = year % 4 == 0

    // if (day === '') {
    //   setDayError(2)
    //   validar = false
    // } else if (day > 31) {
    //   setDayError(3)
    //   validar = false
    // } else if (0 < day < 32) {
    //   setDayError(1)
    // }

    // if (month === '') {
    //   setMonthError(2)
    //   validar = false
    // } else if (month > 12) {
    //   setMonthError(3)
    //   validar = false
    // } else if (month == 2 && bisiestoYear && day > 29) {
    //   setDayError(3)
    //   validar = false
    // } else if (month == 2 && !bisiestoYear && day > 28) {
    //   setDayError(3)
    //   validar = false
    // } else if (0 < month < 13) {
    //   setMonthError(1)
    // }

    // if (year === '') {
    //   setYearError(2)
    //   validar = false
    // } else if (year > currentYear) {
    //   setYearError(3)
    //   validar = false
    // } else if (year == currentYear && month > currentMonth) {
    //   setMonthError(3)
    //   validar = false
    // } else if (year == currentYear && month == currentMonth && day > currentDay) {
    //   setDayError(3)
    //   validar = false
    // } else if (1000 < year < currentYear + 1) {
    //   setYearError(1)

    // }
    // if (validar == false) {
    //   return
    // } else {
    //   fechaNacimiento = new Date(year, month - 1, day)
    //   calculeAge(fechaNacimiento)
    // }
    const maxDaysInMonth = (m) => {
      switch (m) {
        case 2:
          return bisiestoYear ? 29 : 28;
        case 4:
        case 6:
        case 9:
        case 11:
          return 30;
        default:
          return 31;
      }
    };

    const isValidDay = day > 0 && day <= maxDaysInMonth(month);
    const isValidMonth = month > 0 && month <= 12;
    const isValidYear = year >= 1000 && year <= currentYear;

    setDayError(isNaN(day) ? 2 : !isValidDay ? 3 : 1);
    setMonthError(isNaN(month) ? 2 : !isValidMonth ? 3 : 1);
    setYearError(isNaN(year) ? 2 : !isValidYear ? 3 : 1);

    if (!isValidDay || !isValidMonth || !isValidYear) {
      setDay('--')
      setMonth('--')
      setYear('--')
      setError('error')
      return;
    }

    if (year === currentYear) {
      if (month > currentMonth) {
        setMonthError(3);
        return;
      } else if (month === currentMonth && day > currentDay) {
        setDayError(3);
        return;
      }
    }

    const fechaNacimiento = new Date(year, month - 1, day);
    calculeAge(fechaNacimiento);
  }


  const calculeAge = (fechaNacimiento) => {
    const fechaActual = new Date()

    // Calcula la diferencia en milisegundos entre las fechas
    let diferencia = fechaActual - fechaNacimiento;

    // Calcula la cantidad de años
    let años = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 365.25));
    diferencia -= años * 1000 * 60 * 60 * 24 * 365.25;
    setYear(años)

    // Calcula la cantidad de meses
    let meses = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 30.4375));
    diferencia -= meses * 1000 * 60 * 60 * 24 * 30.4375;
    setMonth(meses)

    // Calcula la cantidad de días
    let dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    setDay(dias)
  }

  return (
    <main className='age__wrapper'>
      <div className="age__container">
        <form className="age__form" onSubmit={handleAge}>
          <div className="age__inputs">
            <div className="input__container">
              <label className={`label__text ${dayError === 2 || dayError === 3 ? 'error' : ''}`} htmlFor="day">DAY</label>
              <input className={`input__text ${dayError === 2 || dayError === 3 ? 'errorInput' : ''}`} type="number" name='day' id='day' placeholder='DD' ref={dayRef} />
              {dayError === 2 ? <span className='error__message'>This field is required</span> : dayError === 3 ? <span className='error__message'>Must be a valid day</span> : dayError && ''}
            </div>
            <div className="input__container">
              <label className={`label__text ${monthError === 2 || monthError === 3 ? 'error' : ''}`} htmlFor="month">MONTH</label>
              <input className={`input__text ${monthError === 2 || monthError === 3 ? 'errorInput' : ''}`} type="number" name='month' id='month' placeholder='MM' ref={monthRef} />
              {monthError === 2 ? <span className='error__message'>This field is required</span> : monthError === 3 ? <span className='error__message'>Must be a valid month</span> : monthError && ''}
            </div>
            <div className="input__container">
              <label className={`label__text ${yearError === 2 || yearError === 3 ? 'error' : ''}`} htmlFor="year">YEAR</label>
              <input className={`input__text ${yearError === 2 || yearError === 3 ? 'errorInput' : ''}`} type="number" name='year' id='year' placeholder='YYYY' ref={yearRef} />
              {yearError === 2 ? <span className='error__message'>This field is required</span> : yearError === 3 ? <span className='error__message'>Must be in the past</span> : yearError && ''}
            </div>
          </div>
          <div className="age__button-container">
            <hr className='horizontal__line' />
            <button className='submit__button'><img src="/images/icon-arrow.svg" alt="submit_button" /></button>
            <hr className='horizontal__line secondary' />
          </div>
        </form>
        <div className="age__results">
          <p className='result__item'><span>{year}</span>years</p>
          <p className='result__item'><span>{month}</span>months</p>
          <p className='result__item'><span>{day}</span>days</p>
        </div>
      </div>
    </main>

  )
}

export default App
