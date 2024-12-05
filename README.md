How to run:
-Download the following csv files from https://www.kaggle.com/datasets/grouplens/movielens-20m-dataset?select=link.csv :
  1. genome_scores.csv
  2. genome_tags.csv
  3. movie.csv

-Place the files in your working directory in a folder titled 'data'

-In your terminal do git clone https://github.com/haneenmustafa03/MovieStars

-Navigate to the project directory (MovieStars)

-Create a virtual environment by running the following command: python3 -m venv venv
  1. Depending on your version of python you may have to do teh follwoing command: python -m venv venv

-Next run the follwoing command if working on a windows computer: venv\Scripts\activate

-If working on a mac run the following command instead: source venv/bin/activate

-Install the dependencies from the requirements.txt file by doing: pip install -r requirements.txt

-To run the backend python code do: python app.py

-To access the application, in your web browser navigate to: http://127.0.0.1:5500/ (you can also use live server in vscode to open the page)

-Find a movie to watch based on the 1200 genomes available for you to choose from!


