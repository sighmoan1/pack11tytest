---
title: Feedback form
eleventyNavigation:
  order: 20
  key: Feedback form
---
<!--TODO Datetime stamp submissions-->
<form action="https://prod-108.westeurope.logic.azure.com:443/workflows/c296b810b382468781b05661b6ee5e85/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=DoYjm5bGluWK0Ov-3PSzJOZtEEMpmqZAjPaFhm0IH6I" method="post">
  <label for="first_name">First name:</label><br>
  <input type="text" id="first_name" name="first_name" value=""><br>
  
  <label for="last_name">Last name:</label><br>
  <input type="text" id="last_name" name="last_name" value=""><br>

  <label for="Rating">Rating 0-5</label><br>
  <input type="number" id="Rating" name="Rating" min="0" max="5"><br>

  <label for="feedback">Feedback:</label><br>
  <textarea id="feedback" name="Feedback"></textarea><br><br>
  
<div id="message"></div>
  <input type="submit" value="Submit">
</form>

<script>
document.addEventListener("DOMContentLoaded", function() {
  var form = document.querySelector('form');

  // Function to check if the rating is within the allowed range
  function validateRating() {
    var ratingInput = document.getElementById('Rating');
    var rating = ratingInput.value;
    if (rating < 0 || rating > 5) {
      document.getElementById('message').textContent = 'Rating must be between 0 and 5!';
      return false;
    }
    return true;
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form from submitting immediately

    // Perform validation before proceeding
    if (!validateRating()) {
      return; // If validation fails, stop here
    }

    var formData = new FormData(form);
    var object = {};
    formData.forEach(function(value, key) {
      // Parse the "Rating" as a number
      if (key === 'Rating') {
        object[key] = parseInt(value, 10); // Ensure "Rating" is a number
      } else {
        object[key] = value;
      }
    });
    var json = JSON.stringify(object);

    fetch(form.action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: json
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      document.getElementById('message').textContent = 'Form submitted successfully!';
    })
    .catch((error) => {
      console.error('Error:', error);
      document.getElementById('message').textContent = 'An error occurred!';
    });
  });
});

</script>
