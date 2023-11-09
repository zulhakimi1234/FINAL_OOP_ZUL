function buttonClicked() {
    var makeup = document.getElementById("makeup_input").value;
    var type = document.getElementById("type_input").value;
  
    fetch(
      `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${makeup}&product_type=${type}`
    )
      .then((response) => response.json())
      .then((data) => {
        var displayContent = ""; // Initialize an empty string to store the HTML content.
  
        // Filter the data for items of the selected type.
        var filteredData = data.filter((item) => item.product_type === type);
  
        if (filteredData.length > 0) {
          // Limit to displaying a maximum of five items.
          for (let i = 0; i < Math.min(5, filteredData.length); i++) {
            var item = filteredData[i];
  
            var brand = item.brand;
            var name = item.name;
            var itemType = item.product_type;
            var imageLink = item.image_link; // Use the correct property for the image link.
  
            // Create HTML elements for each item and append them to the displayContent.
            displayContent += `
              <div>
                <img src="${imageLink}" alt="${name} Image">
                <p>Brand: ${brand}</p>
                <p>Name: ${name}</p>
                <p>Type: ${itemType}</p>
              </div>
            `;
          }
  
          document.getElementById("display").innerHTML = displayContent;
        } else {
          document.getElementById("display").innerHTML =
            "No items of the selected type found.";
        }
      });
  }