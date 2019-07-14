import serial
import sys
import time
import datetime
import struct
import json
from socket import *


HOST = 'ec2-54-180-155-65.ap-northeast-2.compute.amazonaws.com'
PORT = 8080
ADDR = (HOST,PORT)
client = socket(AF_INET, SOCK_STREAM)


#Request connection to arduino sensor
#"port"='/dev/ttyUSB0',"baudrate"=9600
try :
    print('Waiting for connection.....')
    SDS011 = serial.Serial(port='/dev/ttyUSB0',baudrate=9600)
except :
    print('Fail to connection')
    sys.exit()
else :
    print('Connection Success')

#unpack respon val and calculator PM
def process_data(respon) :
    val = struct.unpack('<HHxxBB',respon[2:])
    pm25 = val[0]/10.0
    pm10 = val[1]/10.0
    return [pm25,pm10]

#read data from sensor
def read_response():
    byte = 0
    while byte != "\xaa":
        byte = SDS011.read(size=1)
    d = SDS011.read(size=9)
    return byte + d

#Control sensor
def read_data() :
    value = []
    respon = read_response()
    if respon[1] == '\xc0' :
        value = process_data(respon)
    return value

#"now" is current time
#Make document
def get_post(value) :
    now =str(datetime.datetime.now())
    post = {
        "now":now,"PM25":value[0],"PM10":value[1],"TEMP":'-',"HUMI":'-'
        }
    return post

#Main
if __name__=="__main__" :
    if(sys.argv != 3) :
        print('-i/-o -bugilding_Name')
        print('-i -> indoor, -o -> outdoor')
        sys.exit()
    if(sys.argv[1] != '-i' and sys.argv[1] !='-o') :
        sys.exit()
    loc = json.dumps(sys.argv[1:])
    client.connect(ADDR)
    client.sendall(loc.encode('utf-8'))
    try :
        while True :
            value = json.dumps(get_post())
            if  value is not None:
                try :
                    client.sendall(value.encode('utf-8'))
                except Exception as e :
                    print('While transmitting, Problem detected : ',e)
                else :
                    print('transmission Success')
                finally :
                    #time.sleep is cycle, time.sleep(second)
                    time.sleep(5)
    #Error branch point
    #Request Quit
    except KeyboardInterrupt :
        print('\nQuit')
    #Unknow error occur
    except Exception as e :
        print('Error Detected : {}'.format(e))
