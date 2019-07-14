import datetime
import serial
import pymongo
import sys
import time


try :
    connection = pymongo.MongoClient('mongodb://ec2-13-125-244-112.ap-northeast-2.compute.amazonaws.com:27017')
except :
    print("MongoDB Connection Error")
    sys.exit()
else :
    print('MongoDB Connection Success')

def insert_post(line) :
    db = connection['test2']
    collection = db['Null']
    collection.insert(get_post(line))


def get_post(line) :
  post = {
    "PM25":line[6:10],"PM10":line[18:22],"Humi":line[34:38],"Temp":line[55:59]
  }
  return post

def main():
  port = serial.Serial("/dev/ttyUSB0", baudrate=9600)

  line = port.readline()
  while True:

    line = port.readline()
    print(line)
    insert_post(line)


  print("\n\n")


main()
