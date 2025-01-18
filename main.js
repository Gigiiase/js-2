const container  = document.querySelector('.seats');
const seats = document.querySelectorAll('.seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

function saveToLocalStorage() {
    const selectedSeats = document.querySelectorAll('.seat.selected');    
    const selectedSeatsIndexes = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatsIndexes));
    localStorage.setItem('selectMovieIndex', movieSelect.selectedIndex);
    localStorage.setItem('selectedMoviePrice', ticketPrice);
}

function loadFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const selectedMovieIndex = localStorage.getItem('selectMovieIndex');

    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.includes(index)) {
                seat.classList.add('selected');
            }
        });
    }
    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
        ticketPrice = +localStorage.getItem('selectedMoviePrice');
    }
}



function selectedCount() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const selectedSeatSCount = selectedSeats.length;

    count.textContent = selectedSeatSCount;
    total.textContent = selectedSeatSCount * ticketPrice;

    saveToLocalStorage();
}

movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    saveToLocalStorage();
    selectedCount();
});

container .addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        selectedCount();
    }
});
loadFromLocalStorage();
selectedCount();