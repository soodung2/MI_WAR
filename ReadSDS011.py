import serial, time, struct
import pymongo

try :
    connection = pymongo.MongoClient('mongodb://172.31.29.213:27017/db/MiDB')
except :
    print("MongoDB Connection Error")

try :
    ser = serial.Serial()
    ser.port = "/dev/"
    ser.baudrate = 9600
    ser.open()
    ser.flushInput()
except :
    print("Aduino Connection Error")


byte = "\x00"
lastbyte = "\x00"

while True:
    lastbyte = byte
    byte = ser.read(size=1)

    # We got a valid packet header
    if lastbyte == "\xAA" and byte == "\xC0":
        sentence = ser.read(size=8) # Read 8 more bytes
        readings = struct.unpack('>hhxxcc',sentence) # Decode the packet - big endian, 2 shorts for pm2.5 and pm10, 2 reserved bytes, checksum, message tail

        pm_25 = readings[0]/10.0
        pm_10 = readings[1]/10.0
        # ignoring the checksum and message tail
