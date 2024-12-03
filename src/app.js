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

  //Event listeners listening for button clicks and checks
  document.getElementById('suggestions-btn').addEventListener('click', () => { //if find movie suggestions button is clicked
    fetch('http://127.0.0.1:5000/get_genome_tags') //using flask, fetch data from backend
      .then(response => response.json()) //Used for jso formatting
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
  });
});