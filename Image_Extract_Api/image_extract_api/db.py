import pymongo
import os
from dotenv import load_dotenv
load_dotenv()

client = pymongo.MongoClient(os.getenv("mongoURL"))
mydb = client.test
collection = mydb["folders"]