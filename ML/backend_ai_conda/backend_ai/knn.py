import cv2
import numpy as np
from abc import ABCMeta, abstractmethod

class KNN(metaclass=ABCMeta):
    """
    train, predict
    """
    def __init__(self):
        self.knn = None
        self.gesture = []
        self.file = None
        self.load_data()
        self.train()

    @abstractmethod
    def load_data(self):
        pass

    def train(self):
        angle_file = self.file[1:, :-1]
        label_file = self.file[1:, -1]
        angle = angle_file.astype(np.float32)
        label = label_file.astype(np.float32)
        self.knn = cv2.ml.KNearest_create()
        self.knn.train(angle, cv2.ml.ROW_SAMPLE,label)

    def predict(self, message):
        print("message", message)
        joint = np.zeros((21, 3))
        for j, lm in enumerate(message):
            joint[j] = [lm['x'], lm['y'], lm['z']]
        v1 = joint[[0, 1, 2, 3, 0, 5, 6, 7, 0, 9, 10, 11, 0, 13, 14, 15, 0, 17, 18, 19], :]
        v2 = joint[[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], :]
        v = v2 - v1
        v = v / np.linalg.norm(v, axis=1)[:, np.newaxis]

        compare_v1 = v[[0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 16, 17], :]
        compare_v2 = v[[1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15, 17, 18, 19], :]

        angle = np.arccos(np.einsum('nt,nt->n', compare_v1, compare_v2))
        angle = np.degrees(angle)

        data = np.array([angle], dtype=np.float32)
        ret, results, neighbors, dist = self.knn.findNearest(data, 3)
        index = int(results[0][0])

        return self.gesture[index]

class ConsonantKNN(KNN):
    def load_data(self):
        self.file = np.genfromtxt('consonant_data.txt', delimiter=",")
        self.gesture = {0: 'ㄴ', 1: 'ㄷ', 2: 'ㄹ', 3: 'ㅁ', 4: 'ㅂ', 5: 'ㅅ', 6: 'ㅇ', 7: 'ㅈ', 8: 'ㅊ', 9: 'ㅋ', 10: "ㅌ",
                        11: 'ㅍ', 12: 'ㅎ', 13: "ㄱ"}

class VowelKnn(KNN):

    def load_data(self):
        self.file = np.genfromtxt('vowel_data.txt', delimiter=",")
        self.gesture = {0: 'ㅏ', 1: 'ㅑ', 2: 'ㅓ', 3: 'ㅕ', 4: 'ㅗ', 5: 'ㅛ', 6: 'ㅜ', 7: 'ㅠ', 8: 'ㅡ', 9: 'ㅣ', 10: "ㅐ",
                        11: 'ㅒ', 12: 'ㅔ', 13: "ㅖ"}

class NumberKnn(KNN):

    def load_data(self):
        self.file = np.genfromtxt('number_data.txt', delimiter=",")
        self.gesture = {0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9'}


class ConsonantVowelKnn(KNN):

    def load_data(self):
        self.file = np.genfromtxt('consonant_vowel', delimiter=",")
        self.gesture = {
            0: 'ㄴ', 1: 'ㄷ', 2: 'ㄹ', 3: 'ㅁ', 4: 'ㅂ', 5: 'ㅅ', 6: 'ㅇ', 7: 'ㅈ', 8: 'ㅊ', 9: 'ㅋ', 10: "ㅌ",
            11: 'ㅍ', 12: 'ㅎ', 13: "ㄱ", 14: 'ㅏ', 15: 'ㅑ', 16: 'ㅓ', 17: 'ㅕ', 18: 'ㅗ', 19: 'ㅛ', 20: 'ㅜ',
            21: 'ㅠ', 22: 'ㅡ', 23: 'ㅣ', 24: "ㅐ", 25: 'ㅒ', 26: 'ㅔ', 27: "ㅖ"
        }