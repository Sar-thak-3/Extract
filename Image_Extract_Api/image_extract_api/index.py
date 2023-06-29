from doctr.io import read_img_as_tensor
from doctr.models import ocr_predictor
import os
import db
from bson.objectid import ObjectId
# import uvicorn
from flask import Flask

app = Flask(__name__)

os.environ['USE_TORCH'] = '1'

model = ocr_predictor('db_resnet50', 'crnn_vgg16_bn', pretrained=True)

def readImage(imagefile):
  # f = open("Image_Extract_Api\image_extract_api\im.png","rb")
  input_image = read_img_as_tensor("Image_Extract_Api\image_extract_api\im.png")
  output = model([input_image])
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
    allimages = list(db.collection.aggregate([{"$unwind": "$images"},{"$match": {"images.extracted": "Where are aravalis located?"}},{"$skip": skip},{"$limit": 50}]))
    skip += 50
    # print(allimages)
    if(allimages==[]):
      break
    else:
      for img in allimages:
        print()
        print(img["images"])
        para = readImage("")
        print(para)
        # ques = findQues(para)
        res = db.collection.update_one({"_id": ObjectId(img["_id"])},{"$set": {"images.$[inner].extracted": para}},upsert=False,array_filters=[{"inner._id": img["images"]["_id"]}])

  print(list(db.collection.find({"_id": ObjectId("648e1ef81a0c8629aaebdc40")})))

  para = readImage("")
  return para

# if __name__=='__main__':
#   uvicorn.run("main:app", port=8080, reload=True, access_log=False)
if __name__=='__main__':
  app.run()