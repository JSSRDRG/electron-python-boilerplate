from photon import console
import time

x = 0

while True:
    console.log(str(x))
    console.warn(str(x))
    console.error(str(x))
    x += 1
    time.sleep(1)

