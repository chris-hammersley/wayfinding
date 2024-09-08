// custom-zoom.js
document.addEventListener('DOMContentLoaded', function() {
  const zoomedImage = document.getElementById('zoomed-image');
  const zoomableElements = document.querySelectorAll('.polaroid');

  zoomableElements.forEach(element => {
    element.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Clear previous content
      zoomedImage.innerHTML = '';

      // Determine the type of content and create appropriate element
      let zoomedElement;
      const imgElement = this.querySelector('img');
      const videoElement = this.querySelector('video');
      
      if (imgElement) {
        zoomedElement = document.createElement('img');
        zoomedElement.src = imgElement.src;
      } else if (videoElement) {
        zoomedElement = document.createElement('video');
        const sourceElement = videoElement.querySelector('source');
        zoomedElement.src = sourceElement.src;
        zoomedElement.controls = true;
        zoomedElement.autoplay = true;
      }

      // Add classes for styling
      zoomedElement.classList.add('zoomed');

      // Append the new element to the zoomed-image div
      zoomedImage.appendChild(zoomedElement);

      // Show the zoomed-image div
      zoomedImage.style.display = 'flex';

      // Add click event to close zoomed view
      zoomedImage.addEventListener('click', closeZoom);
    });
  });

  function closeZoom() {
    zoomedImage.style.display = 'none';
    zoomedImage.innerHTML = '';
    zoomedImage.removeEventListener('click', closeZoom);
  }
});
