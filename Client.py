import serial
import sys
import datetime
import struct
import json
import thread
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

def set_post(loc, line) :
  post = {
    "Station Name" : loc[0],
    "Name" : loc[1],
    "PM25":line[line.find('5:')+2:line.find('\t')],
    "PM10":line[line.find('10:')+3:line.find('\t',20)],
    "Humi":line[line.find('y:')+2:line.find('%')],
    "Temp":line[line.find('e:')+2:line.find('*')],
    "NOW":str(datetime.datetime.now())
  }
  return post

def Usage() :
    '''
    This code written on Python 3.7.2
    Usage : python client.py [StationName] [BuildingName]
    '''

#Main
if __name__=="__main__" :
    if (len(sys.argv) != 4) :
        print(Usage.__doc__)
        sys.exit()
    else :
        loc = json.dumps(sys.argv[1:])
        client.connect(ADDR)
        line = SDS011.readline()
        try :
            while True :
                line = SDS011.readline()
                value = json.dumps(['8080',set_post(loc, line)])
                if  value is not None:
                    try :
                        client.sendall(value.encode('utf-8'))
                    except Exception as e :
                        print('While transmitting, Problem detected : ',e)
                    else :
                        print(line)
        #Error branch point
        #Request Quit
        except KeyboardInterrupt :
            print('\nQuit')
        #Unknow error occur
        except Exception as e :
            print('Error Detected : {}'.format(e))
