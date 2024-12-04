document.addEventListener('DOMContentLoaded', () => {
  /*NOTE: Alot of these comments are for myself because I haven't used javascript in a long time and 
  wanted to mark down what each function is doing to help engrave them in my mind, please disregard
  the redundant comments*/

  //IDs to be used in the html (must use all of them otherwise error)
  const mainScreen = document.getElementById('main-screen');
  const genomeTagsScreen = document.getElementById('genome-tags-screen');
  const suggestionsScreen = document.getElementById('suggestions-screen');
  const findSuggestionsBtn = document.getElementById('find-suggestions-btn');
  const returnBtn = document.getElementById('return-btn');

  //Common function for fetching genome tags and rendering checkboxes
  const fetchGenomeTags = () => {
    fetch('http://127.0.0.1:5000/get_genome_tags') //using flask, fetch data from backend
      .then(response => response.json()) //Used for json formatting
      .then(genomeTags => {
        const tagsContainer = document.getElementById('tags-container'); //selects genome tag container
        tagsContainer.innerHTML = ''; //make sure tag container is empty

        let selectedCount = 0; //number of genome tags checked off

        genomeTags.forEach(tag => {
          const checkbox = document.createElement('input'); //checkbox eleement
          checkbox.type = 'checkbox'; 
          checkbox.id = tag;
          checkbox.value = tag;
          checkbox.classList.add('mr-2', 'w-4', 'h-4'); //tailwind :))

          const label = document.createElement('label'); //label for the element above
          label.htmlFor = tag;
          label.textContent = tag;
          label.classList.add('text-sm', 'font-medium', 'text-gray-700'); //tailwind :))

          //wrapper for grouping and label
          const wrapper = document.createElement('div');
          wrapper.classList.add('flex', 'items-center', 'space-x-2');
          wrapper.appendChild(checkbox);
          wrapper.appendChild(label);

          tagsContainer.appendChild(wrapper); //the wrapper is added to tags container here

          //This will make sure the user is only selecting 10 values, otherwise a popup will show
          checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
              selectedCount++;
              if (selectedCount > 10) {
                checkbox.checked = false;
                selectedCount--;
                alert('You can only select up to 10 tags!');
              }
            } else {
              selectedCount--;
            }
          });
        });

        //This will diplay the screen with the genome tags
        mainScreen.style.display = 'none';
        genomeTagsScreen.style.display = 'block';
      })
      .catch(err => console.error('Error fetching genome tags:', err));
  };

  //Event listeners listening for button clicks and checks
  document.getElementById('find-hashmap-btn').addEventListener('click', fetchGenomeTags); //if find movie suggestions button is clicked
  document.getElementById('find-sortedmap-btn').addEventListener('click', fetchGenomeTags); //same exact thing as find-hashmap-btn but this one is for sorted map

  //once user has selected their tags click find suggestions and js will listen for the click
  findSuggestionsBtn.addEventListener('click', () => {
    const selectedTags = [];
    document.querySelectorAll('#tags-container input:checked').forEach(checkbox => {
      selectedTags.push(checkbox.value); //adds checked values to an array
    });

    fetch('http://127.0.0.1:5000/suggest_movies', { //send request to backend so the movie suggestions are returned
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ selected_tags: selectedTags })
    })
      .then(response => response.json())
      .then(data => {
        const suggestionsContainer = document.getElementById('suggestions-container'); //here we select suggestions container
        suggestionsContainer.innerHTML = ''; //clears/ensures its empty
        //not sure if I had to add data before movies because of how i modified the jsonify result
        //easy removal if it isn't needed
        data.movies.forEach(movie => {
          const movieDiv = document.createElement('div'); //div elemenet for the movie
          movieDiv.classList.add('p-4', 'border', 'rounded', 'shadow', 'bg-white', 'space-y-2'); //tailwind :))

          const title = document.createElement('h3'); //h3 element for title
          title.textContent = movie.title;
          title.classList.add('text-lg', 'font-bold', 'text-gray-800'); //tailwind :)))

          const genres = document.createElement('p'); //p eleement for genres
          genres.textContent = `Genres: ${movie.genres.join(', ')}`;
          genres.classList.add('text-sm', 'text-gray-600'); //tailwind :))

          const relevance = document.createElement('p'); //p element for the relevance
          relevance.textContent = `Relevance: ${movie.relevance.toFixed(2)}`;
          relevance.classList.add('text-sm', 'text-gray-500'); //tailwind

          //add elements to the movie div
          movieDiv.appendChild(title);
          movieDiv.appendChild(genres);
          movieDiv.appendChild(relevance);

          suggestionsContainer.appendChild(movieDiv); //moviediv goes to the suggestions container
        });
        // Display the execution time
        const executionTimeDiv = document.createElement('div'); //div element for the execution time
        executionTimeDiv.textContent = `Execution Time: ${data.execution_time.toFixed(4)} seconds`;
        executionTimeDiv.classList.add('text-sm', 'text-gray-500', 'mt-4'); //I also don't know if this is the right gray
        suggestionsContainer.appendChild(executionTimeDiv); //add to suggestions container

        genomeTagsScreen.style.display = 'none'; //hides genome display screen and...
        suggestionsScreen.style.display = 'block'; //switches to movie suggestions screen
      })
      .catch(err => console.error('Error fetching movie suggestions:', err)); //catch errors when fetching suggestions
  });

  //listens for a click to return to main menu
  returnBtn.addEventListener('click', () => {
    suggestionsScreen.style.display = 'none';
    mainScreen.style.display = 'block';
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const searchBar = document.getElementById('search-bar');
  const tagsContainer = document.getElementById('tags-container');
  let genomeTags = []; // to hold all genome tags fetched from the backend

  // Fetch genome tags
  const fetchGenomeTags = () => {
    fetch('http://127.0.0.1:5000/get_genome_tags') // Fetch data from backend
      .then(response => response.json())
      .then(data => {
        genomeTags = data; // Store genome tags
        renderTags(genomeTags); // Render all tags initially
      })
      .catch(err => console.error('Error fetching genome tags:', err));
  };

  // Render tags based on the given list of tags
  const renderTags = (tags) => {
    tagsContainer.innerHTML = ''; // Clear existing tags

    tags.forEach(tag => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = tag;
      checkbox.value = tag;
      checkbox.classList.add('mr-2', 'w-4', 'h-4');
      
      const label = document.createElement('label');
      label.htmlFor = tag;
      label.textContent = tag;
      label.classList.add('text-sm', 'font-medium', 'text-gray-700');
      
      const wrapper = document.createElement('div');
      wrapper.classList.add('flex', 'items-center', 'space-x-2');
      wrapper.appendChild(checkbox);
      wrapper.appendChild(label);

      tagsContainer.appendChild(wrapper);
    });
  };

  // Listen for typing in the search bar to filter tags
  searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase(); // Get the search query
    const filteredTags = genomeTags.filter(tag => 
      tag.toLowerCase().includes(query) // Check if tag matches query
    );
    renderTags(filteredTags); // Render filtered tags
  });

  // Fetch genome tags when the page loads
  fetchGenomeTags();
});