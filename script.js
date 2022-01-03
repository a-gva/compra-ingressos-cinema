const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')
let ticketPrice = +movieSelect.value
// Alternative to parseInt = + plus signal
// const ticketPrice = parseInt(movieSelect.value)

populateUI()

// Save selected movie index and price
function setMovieData (movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex)
  localStorage.setItem('selectedMoviePrice', moviePrice)
}

// Update Total and Count
function updateSelectedCount () {
  const selectedSeats = document.querySelectorAll('.row .seat.selected')

  // Copy selected seats into an array
  // Map through array
  // Return a new array of indexes
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))

  // Store in local
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

  const selectedSeatsCount = selectedSeats.length
  //   console.log(selectedSeatsCount)
  count.innerText = selectedSeatsCount
  total.innerText = selectedSeatsCount * ticketPrice
}

// Get data from local storage and populate UI

function populateUI () {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
  console.log(selectedSeats)

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected')
      }
    })
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex
  }
}

// Movie select event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value
  setMovieData(e.target.selectedIndex, e.target.value)
  updateSelectedCount()
})

// Seat click event
container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected')
    updateSelectedCount()
  }
})

//  Initial count and total set
updateSelectedCount()
