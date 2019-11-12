import json
from socket import *

HOST = 'ec2-54-180-155-65.ap-northeast-2.compute.amazonaws.com'
PORT = 8080
ADDR = (HOST,PORT)
client = socket(AF_INET, SOCK_STREAM)

if __name__ == '__main__' :
    client.connect(ADDR)
    # print(1)
    client.sendall(json.dumps(['4040','S1','N1']).encode('utf-8'))
    # print(2)
    msg = json.loads(client.recv(1024).decode('utf-8'))
    # print(3)
    print(msg)
