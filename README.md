# Hackathon2025\

Inspiration
The inspiration for Haystack came from the challenge students face when trying to remember everything discussed in class. Professors often share critical insights that are difficult to capture through note-taking alone. The goal was to create a system that allows students to quickly search through class recordings and find specific information with precision and ease.

What it does
Haystack enables students to search their class video recordings by asking natural language questions. The system returns accurate responses with direct video links and timestamps, making it easy to revisit key moments. By breaking down video transcripts into 30-second intervals, the system ensures precise search results, helping students study more efficiently.

How we built it

Data Retrieval:

Used the YouTube Data API to retrieve URLs from recorded class videos.
Extracted transcripts from Blackboard recordings.
Split each transcript into 30-second intervals, with one file per video.
Embedding and Vector Database:

Used OpenAI embeddings to convert transcript data into vector representations.
Stored vector embeddings in a vector database for fast and accurate semantic search.
Query System:

Processed user queries by generating embeddings using OpenAI.
Performed similarity searches within the vector database to retrieve the most relevant 30-second intervals.
Returned answers with timestamps and video links for easy verification.
Challenges we ran into

Speed of Response: Ensuring fast search and response times while querying a large vector database was a key challenge.
Transcript Quality: Extracting clear and accurate transcripts from Blackboard recordings.
Data Organization: Structuring video data into manageable 30-second intervals for better search accuracy.
Accomplishments that we're proud of
Built a system that allows students to search class recordings and instantly find specific information.
Successfully integrated OpenAI embeddings and a vector database to enable efficient semantic search.
Improved search accuracy by organizing video transcripts into precise 30-second intervals.
