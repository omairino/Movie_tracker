import time

from websocket import create_connection
import cv2
import numpy as np
from collections import deque

ws = create_connection("ws://127.0.0.1:1234/")
cap = cv2.VideoCapture(0)
pts = deque(maxlen=10)
Lower_green = np.array([110, 50, 50])
Upper_green = np.array([130, 255, 255])
while True:
    ret, img = cap.read()
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    kernel = np.ones((3, 3), np.uint8)
    mask = cv2.inRange(hsv, Lower_green, Upper_green)
    mask = cv2.erode(mask, kernel, iterations=2)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
    # mask=cv2.morphologyEx(mask,cv2.MORPH_CLOSE,kernel)
    mask = cv2.dilate(mask, kernel, iterations=1)
    res = cv2.bitwise_and(img, img, mask=mask)
    cnts, heir = cv2.findContours(mask.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)[-2:]
    center = None

    if len(cnts) > 0:
        c = max(cnts, key=cv2.contourArea)
        ((x, y), radius) = cv2.minEnclosingCircle(c)
        M = cv2.moments(c)
        try:
            center = (int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"]))
        except:
            continue
        if radius > 5:
            cv2.circle(img, (int(x), int(y)), int(radius), (0, 255, 255), 2)
            cv2.circle(img, center, 5, (0, 0, 255), -1)

    pts.appendleft(center)
    for i in range(1, len(pts)):
        if pts[i - 1] is None or pts[i] is None:
            continue
        if (not pts[1] is None and not pts[-1] is None):
            size_x = pts[1][0] - pts[-1][0]
            size_y = pts[1][1] - pts[-1][1]

            print(size_y,"aaaa")
            if size_x > 250 and size_y < 250:
                ws.send("1")
                pts.clear()
                time.sleep(0.3)

                break;

            elif size_x < -250 and size_y > -250:
                ws.send("-1")
                pts.clear()
                time.sleep(0.3)

                break;
            elif size_y < -250 and size_x > -250:
                ws.send("0")
                print("0")
                pts.clear()
                time.sleep(0.3)

                break;
            elif size_x < 250 and size_y > 250:
                print("-0")
                ws.send("-0")
                pts.clear()
                time.sleep(0.3)

                break;
ws.close()
