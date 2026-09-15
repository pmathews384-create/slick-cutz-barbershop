function bookNow(){
  let booking = {
    service: document.getElementById('service').value,
    barber: document.getElementById('barber').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    id: Date.now()
  }

  if(!booking.date || !booking.name || !booking.phone){
    document.getElementById('message').innerText = "Fill in all fields!";
    return;
  }

  let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  
  // Check double booking for same barber + date + time
  let clash = bookings.find(b => b.barber==booking.barber && b.date==booking.date && b.time==booking.time);
  if(clash){
    document.getElementById('message').innerText = `${booking.barber} is busy at ${booking.time}. Choose another time.`;
    return;
  }

  bookings.push(booking);
  localStorage.setItem('bookings', JSON.stringify(bookings));
  document.getElementById('message').innerText = `✅ Booked with ${booking.barber} on ${booking.date} at ${booking.time}`;
}

function loadAdmin(){
  let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  let table = document.getElementById('table');
  if(!table) return;
  table.innerHTML = "";
  bookings.forEach(b => {
    table.innerHTML += `<tr>
      <td>${b.date} ${b.time}</td>
      <td>${b.barber}</td>
      <td>${b.service}</td>
      <td>${b.name} - ${b.phone}</td>
      <td><button onclick="deleteBooking(${b.id})">Done</button></td>
    </tr>`;
  });
}
function deleteBooking(id){
  let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  bookings = bookings.filter(b => b.id != id);
  localStorage.setItem('bookings', JSON.stringify(bookings));
  loadAdmin();
}