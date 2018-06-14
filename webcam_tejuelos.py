import numpy as np
import cv2

ruta = "[lo_que_sea]\OpenCV-Python\opencv-python-master\examples\haarcascade\\"

face_cascade = cv2.CascadeClassifier(ruta + 'haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier(ruta + 'haarcascade_eye.xml')
tejuelo_cascade = cv2.CascadeClassifier("[lo_que_sea]\OpenCV\Tejuelo\cascades\cascade-700-1400-19.xml")

cap = cv2.VideoCapture(0)
#img = cv2.imread("[lo_que_sea]\OpenCV\\test\IMG_1.jpg")

while 1:
    ret, img = cap.read()
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    
    # add this
    # image, reject levels level weights.
    tejuelos = tejuelo_cascade.detectMultiScale(gray, 1.2, 5) # 50, 50)#
    print tejuelos

    # add this
    for (x,y,w,h) in tejuelos:
        cv2.rectangle(img,(x,y),(x+w,y+h),(0,250,0),2)

    for (x,y,w,h) in faces:
        cv2.rectangle(img,(x,y),(x+w,y+h),(255,0,0),2)

        
        roi_gray = gray[y:y+h, x:x+w]
        roi_color = img[y:y+h, x:x+w]
        eyes = eye_cascade.detectMultiScale(roi_gray)
        for (ex,ey,ew,eh) in eyes:
            cv2.rectangle(roi_color,(ex,ey),(ex+ew,ey+eh),(0,255,0),2)

    cv2.imshow('webcam',img)
    k = cv2.waitKey(30) & 0xff
    if k == 27:
        break

cap.release()
cv2.destroyAllWindows()
