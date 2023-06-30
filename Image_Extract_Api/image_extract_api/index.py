from doctr.models import ocr_predictor
import os
import db
from bson.objectid import ObjectId
from flask import Flask
from PIL import Image
import cv2
import io
import base64
import numpy as np
import torchvision.transforms as transforms
import re

app = Flask(__name__)

os.environ['USE_TORCH'] = '1'

model = ocr_predictor('db_resnet50', 'crnn_vgg16_bn', pretrained=True)

transform = transforms.ToTensor()

def readImage(imagefile):
  base64_data = re.sub('^data:image/.+;base64,', '', imagefile)
  binary_data = base64.b64decode(base64_data)
  img = Image.open(io.BytesIO(binary_data))
  opencv_img= cv2.cvtColor(np.array(img), cv2.COLOR_BGR2RGB)
  tensor = transform(opencv_img)
  output = model([tensor])
  out = output.export()
  words = []
  for item in out['pages'][0]['blocks']:
    for line in item["lines"]: 
      for word in line['words']:
        words.append(word['value'])
  
  para = " ".join(words)
  return para

def findQues(paragraph):
  pass

# from fastapi import FastAPI
# app = FastAPI()
@app.route("/")
def home():

  skip = 0
  while(True):
    # allimages = db.collection.aggregate([{"$unwind": "$images"},{"$match": {"images.date": date.today(),"images.extract": ""}},{"$skip": skip},{"$limit": 50}])
    allimages = list(db.collection.aggregate([{"$unwind": "$images"},{"$skip": skip},{"$limit": 50}]))
    skip += 50
    if(allimages==[]):
      break
    else:
      for img in allimages:
        if("extracted" not in img["images"]):
          para = readImage(img["images"]["image"])
          print(para)
          # ques = findQues(para)
          res = db.collection.update_one({"_id": ObjectId(img["_id"])},{"$set": {"images.$[inner].extracted": para}},upsert=False,array_filters=[{"inner._id": img["images"]["_id"]}])


  return "Completed perfectly"

if __name__=='__main__':
  app.run()