document.addEventListener('DOMContentLoaded', function() {
    const dateDisplay = document.getElementById('date-display');
    const prayerTimesBody = document.getElementById('prayer-times-body');
    let currentDate = new Date();
  
    function updateDate() {
      dateDisplay.textContent = currentDate.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  
    async function fetchPrayerTimes() {
      const latitude = 51.481583; // Approximate latitude for Cardiff, South Wales
      const longitude = -3.179090; // Approximate longitude for Cardiff, South Wales
      const method = 2; // Example method number for calculation (Check the API for correct values)
  
      const url = `https://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}&method=${method}&month=${currentDate.getMonth() + 1}&year=${currentDate.getFullYear()}`;
  
      try {
        const response = await fetch(url);
        const data = await response.json();
        const todayTimes = data.data[currentDate.getDate() - 1].timings;
  
        const times = [
          { name: "Fajr", time: todayTimes.Fajr },
          { name: "Dhuhr", time: todayTimes.Dhuhr },
          { name: "Asr", time: todayTimes.Asr },
          { name: "Maghrib", time: todayTimes.Maghrib },
          { name: "Isha", time: todayTimes.Isha }
        ];
  
        prayerTimesBody.innerHTML = times.map(t => `<tr><td>${t.name}</td><td>${t.time.split(' ')[0]}</td></tr>`).join('');
      } catch (error) {
        console.error('Error fetching prayer times:', error);
      }
    }
  
    document.getElementById('prevDay').addEventListener('click', () => {
      currentDate.setDate(currentDate.getDate() - 1);
      updateDate();
      fetchPrayerTimes(); // Fetch new times for the updated date
    });
  
    document.getElementById('nextDay').addEventListener('click', () => {
      currentDate.setDate(currentDate.getDate() + 1);
      updateDate();
      fetchPrayerTimes(); // Fetch new times for the updated date
    });
  
    // Initial setup
    updateDate();
    fetchPrayerTimes();
  });


  $(document).ready(function() {
    $.getJSON('data/gallery.json', function(data) {
      var items = '';
      $.each(data, function(key, val) {
        items += '<div class="item"><a href="' + val.url + '" target="_blank"><img src="' + val.imageUrl + '"></a><p>' + val.text + '</p></div>';
      });
      $('.owl-carousel').html(items);
  
      $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 3
          },
          1000: {
            items: 3
          }
        }
      });
    });
  });


    
