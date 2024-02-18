import os
import cv2
import numpy as np


def createDirectory(directory):
    try:
        if not os.path.exists(directory):
            os.makedirs(directory)
    except OSError:
        print("Error: Creating directory. ")



def Vertor_Normalization(joint):

    v1 = joint[[0, 1, 2, 3,]]