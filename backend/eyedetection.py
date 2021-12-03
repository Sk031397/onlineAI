import cv2
import matplotlib.pyplot as plt
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import PrecisionRecallDisplay

cap = cv2.VideoCapture(0)
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')
while True:
    ret, frame = cap.read()
    image = np.array(frame)

    

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 5)
        print("Faces: X %2d, Y %2d" %(x,y))
        roi_gray = gray[y:y+w, x:x+w]
        roi_color = frame[y:y+h, x:x+w]
        eyes = eye_cascade.detectMultiScale(roi_gray, 1.3, 5)
        for (ex, ey, ew, eh) in eyes:
            cv2.rectangle(roi_color, (ex, ey), (ex + ew, ey + eh), (0, 255, 0), 5)
            print("Eyes: X: %2d, Y: %2d" % (ex,ey))
           # X_train,X_test,y_train,y_test = train_test_split(ex,ey,test_size=0.5,random_state=np.random.RandomState(0))
          #  classifier = make_pipeline(StandardScaler(),LinearSVC(random_state=np.random.RandomState(0)))
          #  classifier.fit(X_train,y_train)
          #  display = PrecisionRecallDisplay.from_estimator(classifier,X_test,y_test,name="LinearSVC")
          #  _ = display.ax_.set_title("2 pr")
    cv2.imshow('frame', frame)
    if cv2.waitKey(1) == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
