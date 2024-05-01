// Fetch the gallery data from gallery3-3.json
fetch('data/gallery.json')
  .then(response => response.json())
  .then(data => {
    const gallery = document.querySelector('.gallery');

    // Iterate over each item in the gallery data
    data.forEach(item => {
      const galleryItem = document.createElement('div');
      galleryItem.classList.add('gallery-item');

      const link = document.createElement('a');
      link.href = item.imageUrl; // Use the full-size image URL
      link.target = '_blank'; // Open the image in a new tab/window

      const image = document.createElement('img');
      image.src = item.imageUrl;
      image.alt = item.text;

      const description = document.createElement('div');
      description.classList.add('description');
      description.textContent = item.text;

      link.appendChild(image);
      galleryItem.appendChild(link);
      galleryItem.appendChild(description);

      gallery.appendChild(galleryItem);
    });
  })
  .catch(error => {
    console.error('Error fetching gallery data:', error);
  });


// Fetch the gallery data from gallery.json

// ... (existing code remains the same) ...

$(document).ready(function() {
  $.getJSON('data/carousel.json', function(data) {
    var items = '';
    $.each(data, function(key, val) {
      items += '<div class="item"><a href="' + val.url + '" target="_blank"><img src="' + val.imageUrl + '"></a><p>' + val.text + '</p></div>';
    });
    $('.owl-carousel').html(items);

    $('.owl-carousel').owlCarousel({
      loop: true,
      margin: 20,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
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