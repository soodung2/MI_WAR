import json
from socket import *
# import sys
# 1 is the command arg you passed
# state= sys.argv[0]
#
# # 2 is the comport arg you passed
# name = sys.argv[1]
#
#
#


HOST = 'ec2-54-180-155-65.ap-northeast-2.compute.amazonaws.com'
PORT = 8080
ADDR = (HOST,PORT)
client2 = socket(AF_INET, SOCK_STREAM)

if __name__ == '__main__' :
    client2.connect(ADDR)
    print(1)
    client2.sendall(json.dumps(['4040','s2','n2']).encode('utf-8'))
    print(2)
    msg = json.loads(client2.recv(1024).decode('utf-8'))
    print(3)
    print(msg)
