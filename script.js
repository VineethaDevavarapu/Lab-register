function searchLabEquipment() {
  const searchTerm = document.getElementById('searchTextarea').value.trim();
  const searchResultsElement = document.getElementById('searchResults');

  if (searchTerm === "") {
    searchResultsElement.innerHTML = "<p>Please enter a search term.</p>";
    return;
  }

  fetch('Lab Equipment.json')
    .then(response => response.json())
    .then(data => {
      const matchedItems = data.filter((item) => {
        const regex = new RegExp(searchTerm, "i");
        return item.Content !== null && item.Content !== undefined && regex.test(item.Content);
      });

      if (matchedItems.length === 0) {
        searchResultsElement.innerHTML = "<p>No matching items found.</p>";
        return;
      }
      const resultHTML = matchedItems.map(item => `
        <div class="external">
          <p><strong>Content:</strong> ${item.Content}</p>
          <p><strong>Quantity:</strong> ${item.Quantity}</p>
          <p><strong>Position:</strong> ${item.Position}</p>
        </div>
      `).join('');

      searchResultsElement.innerHTML = resultHTML;
    })
    .catch(error => {
      searchResultsElement.innerHTML = `<p>Error fetching or parsing JSON file: ${error}</p>`;
    });
    /* const resultStyles = `
    <style>
      //Style for each result div 
      div {
        border: 1px solid #ccc;
        padding: 10px;
        flex-display:row;
        margin-bottom: 10px;
      }

       Style for the strong tag within each result 
      div p strong {
        color: #007bff; //Change to your preferred color 
      }
    </style>
  `;
  document.head.insertAdjacentHTML('beforeend', resultStyles);*/
}
