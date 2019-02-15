from os import listdir
from os.path import isfile, join

#resizes images
import cv2

#get list of images
Dabs = [f for f in listdir("./Raw/Dabs/") if isfile(join("./Raw/Dabs", f))]
NotDabs = [f for f in listdir("./Raw/NotDabs/") if isfile(join("./Raw/NotDabs", f))]
max_width = 300 
max_height = 300



#resize Dabs
i = 0
for f in Dabs:
    # print(f)
    img = cv2.imread("./Raw/Dabs/"+f)


    #print(img)
    height,width = img.shape[:2]

   

    # only shrink if img is bigger than required
    if max_height < height or max_width < width:
        # get scaling factor
        scaling_factor = max_height / float(height)
        if max_width/float(width) < scaling_factor:
            scaling_factor = max_width / float(width)
        # resize image
        img = cv2.resize(img, None, fx=scaling_factor, fy=scaling_factor, interpolation=cv2.INTER_AREA)

    # cv2.imshow("Shrinked image", img)
    key = cv2.waitKey()
    cv2.imwrite("./ResizedDabs/Train/Dabs/Dab"+str(i)+".jpg",img)
    i+=1

##Resize Not Dabs
i = 0
for f in NotDabs:
    # print(f)
    img = cv2.imread("./Raw/NotDabs/"+f)


    #print(img)
    height,width = img.shape[:2]

   

    # only shrink if img is bigger than required
    if max_height < height or max_width < width:
        # get scaling factor
        scaling_factor = max_height / float(height)
        if max_width/float(width) < scaling_factor:
            scaling_factor = max_width / float(width)
        # resize image
        img = cv2.resize(img, None, fx=scaling_factor, fy=scaling_factor, interpolation=cv2.INTER_AREA)

    # cv2.imshow("Shrinked image", img)
    key = cv2.waitKey()
    cv2.imwrite("./ResizedDabs/Train/NotDabs/NotDab"+str(i)+".jpg",img)
    i+=1
