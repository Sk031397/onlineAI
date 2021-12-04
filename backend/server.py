from flask import Flask
import cv2
import mediapipe as mp
import time
import numpy as np 
from FaceDetectionModule import FaceDetector
app = Flask(__name__)


@app.route('/eyedetection')
def detect():
    cap = cv2.VideoCapture(0)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')
    lmList = []
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
                lmList.append([x,y,ex,exy])
        cv2.imshow('frame', frame)
        if cv2.waitKey(1) == ord('q'):
            break
    cap.release()
    cv2.destroyAllWindows()
    return ex,ey
@app.route('/facemesh')
def detect1():
    cap = cv2.VideoCapture(0)
    pTime = 0
    lmList = []
    mpDraw = mp.solutions.drawing_utils
    mpFaceMesh = mp.solutions.face_mesh
    faceMesh = mpFaceMesh.FaceMesh(max_num_faces=2)
    drawSpec = mpDraw.DrawingSpec(thickness=1, circle_radius=2)
    while True:
        success, img = cap.read()
        imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        results = faceMesh.process(imgRGB)
        if results.multi_face_landmarks:
            for faceLms in results.multi_face_landmarks:
                mpDraw.draw_landmarks(img, faceLms, mpFaceMesh.FACEMESH_TESSELATION,
                drawSpec,drawSpec)
            for id,lm in enumerate(faceLms.landmark):
                ih, iw, ic = img.shape
                x,y = int(lm.x*iw), int(lm.y*ih)
                lmList.append([x,y])
                print(id,x,y) 
        cTime = time.time()
        fps = 1 / (cTime - pTime)
        pTime = cTime
        cv2.putText(img, f'FPS: {int(fps)}', (20, 70), cv2.FONT_HERSHEY_PLAIN,
        3, (255, 0, 0), 3)
        cv2.imshow("Image", img)
        cv2.waitKey(1)
        return x,y,lmList

@app.route('/facedetection')
def detect2():
    cap = cv2.VideoCapture(0)
    face = FaceDetector()
    while True:
        success,img = cap.read()
        img,bboxs = face.findFaces(img)
        cv2.imshow("facedetection",img)
        if cv2.waitKey(0) == ord('1'):
            break
        cap.release()
        cap.destroyAllWindows()
        return img
@app.route('/poseestimation')
def detect3():
    cap = cv2.VideoCapture(0)
    mpDraw = mp.solutions.drawing_utils
    mpPose = mp.solutions.pose
    pose = mpPose.Pose()
    pTime = 0
    lmList = []
    while True:
        success, img = cap.read()
        imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        results = pose.process(imgRGB)
        if results.pose_landmarks:
            mpDraw.draw_landmarks(img, results.pose_landmarks, mpPose.POSE_CONNECTIONS)
            for id, lm in enumerate(results.pose_landmarks.landmark):
                h, w, c = img.shape
                print(id, lm)
                lmList.append([lm])
                cx, cy = int(lm.x * w), int(lm.y * h)
                cv2.circle(img, (cx, cy), 5, (255, 0, 0), cv2.FILLED)
        cTime = time.time()
        fps = 1 / (cTime - pTime)
        pTime = cTime
        cv2.putText(img, str(int(fps)), (70, 50), cv2.FONT_HERSHEY_PLAIN, 3,
                (255, 0, 0), 3)
        cv2.imshow("Image", img)
        if cv2.waitKey(0) == ord('q'):
            break
        cap.release()
        cap.destroyAllWindows()
        return lmList[0]
if __name__ == '__main__':
    app.run(debug=True)
