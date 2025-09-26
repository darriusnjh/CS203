import os
from pymongo import MongoClient  
from langchain.embeddings.openai import OpenAIEmbeddings

class vectordb:
    def __init__(self):
        self.client = MongoClient(os.getenv("MONGODB_URI"))
        self.db = self.client["Tariff"]
        self.embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

    def query_vectordb(self, query: str) -> str:
        query_embedding = self.embeddings.embed_query(query)

        results = self.db.HTS_codes.aggregate([
        {
            "$vectorSearch": {
            "index": "hts8",
            "path": "embedding",
            "queryVector": query_embedding,
            "numCandidates": 100,
            "limit": 5
            }
        }
        ])
        output = ""
        for r in results:
            output += r["page_content"] + "\n"
        return output
