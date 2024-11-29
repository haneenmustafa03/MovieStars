from flask import Flask, jsonify, request #flask will be used to create the web app its the bridge between front and backend, jsonify will convert lists into JSON format, request used to handle incoming requests
from flask_cors import CORS #using cors in case we run into cross origin issues using live server for testing
import random #to suggest 200 random genomes
import csv #to read files

app = Flask(__name__) #initializes appication instance 
CORS(app) #add cors here, remove once app is actually launched

#Our first data structure we are using is hashmaps
def load_genome_tags():
    genome_tags = {} #here we will store the genome tagId mapped to the genome value
    with open('data/genome_tags.csv', 'r') as file: #auto opens and closes file, r stands for read mode
        reader = csv.DictReader(file) #reader is an iterator that we will use to read in each line
        for row in reader: #going line by line in the code and parsing the data into hashmap
            genome_tags[int(row['tagId'])] = row["tag"] #convert the key value to an int here and set it to the tag


        return genome_tags #this will return the tagIds and values for use later

#still using hashmaps here, mapping movieID, tagID, relevance decimal factor
def load_genome_scores():
    genome_scores = {}
    with open('data/genome_scores.csv', 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            movieId = int(row["movieId"])
            genomeId = int(row["tagId"])
            relevanceFactor = float(row["relevance"])

            if movieId not in genome_scores:
                genome_scores[movieId] = {}
            genome_scores[movieId][genomeId] = relevanceFactor
    return genome_scores

#load the movies from the csv files and their Ids in hashmap
def load_movies():
    movies = {}
    with open('data/movie.csv', 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            movieId = int(row['movieId'])
            title = row['title']
            genres = row['genres'].split("|") #there will be a list of the genres
            movies[movieId] = {'title' : title, 'genres' : genres}
    return movies

def find_movie_suggestions(selected_tags, genome_scores, movies_and_genres, genome_tags):
    movie_relevance = {}

    #iterate over all of the user selected genomes
    for tag in selected_tags:
        tagId = None
        for id, name in genome_tags.items(): #find the id number associated with the genome
            if tag == name:
                tagId = id
                break

    #pick up right here, somehow add up relevance factors and return top five movies
        for movieId in genome_scores:
            #adding up the relevance factors for all of the 
            movie_relevance[movieId] = movie_relevance.get(movieId, 0) + genome_scores[movieId][tagId]
    
    #sort movie relevance factors in order to get the top five
    sorted_movies = sorted(movie_relevance.items(), key=lambda x: x[1], reverse=True) #the lambda just means sort the relevance values in the hashmap

    top_5_movies = sorted_movies[:5]

    #Get the movie details and genres to return to the user
    movie_details = []
    for movie_id, score in top_5_movies:
        movie = movies_and_genres.get(movie_id, {})
        movie_details.append({
            'title': movie['title'],
            'genres': movie['genres'],
            'relevance': score
        })

    return movie_details

@app.route('/suggest_movies', methods=['POST']) #/sugges_movies is the path where the app will respond to requests, post means we expect data
def suggest_movies():
    data = request.json #converts data to json format
    selected_tags = data.get('selected_tags', []) #pulls the selected tags from request
    results = find_movie_suggestions(selected_tags, genome_scores, movies_and_genres, genome_tags)
    return jsonify(results)


genome_tags = load_genome_tags()
genome_scores = load_genome_scores()
movies_and_genres = load_movies()

if __name__ == "__main__":
    app.run(debug=True)


#example accessing the load genome scores hashmap, id number - 1 because indexing starts at 0, and movie titles
'''genome_scores = load_genome_scores().. delete later
genome = genome_scores[1]
print(f"007 relevance: {genome[0]['relevanceFactor']}")

movies = load_movies()
movie = movies[1]
print(f"Movie Name: {movie['title']}")'''

        

