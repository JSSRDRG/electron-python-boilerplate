from photon import console
from photon import document
import time

import photon
print = photon.print

x = 0

while True:
    console.log(str(x))
    console.warn(str(x))
    console.error(str(x))
    print('Hello World!')
    x += 1
    time.sleep(1)

