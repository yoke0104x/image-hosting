
import os
from docx import Document
from docx.shared import Inches
import requests
import uuid
import shutil
# 存储文件
PATH = os.path.dirname(__file__) + '/dist'
PATH1 = os.path.dirname(__file__) + '/dist1'

# 下载图片
def downLoadImg(content,name):

    print(content,name)
    # 保存图片
    
    shutil.copy(content, PATH1)
    os.rename(content, name +"/" + uuid.uuid4().hex + '.png')

def main():
    # 遍历文件夹
    for file in os.listdir(PATH):
        # 判断是否是文件夹
        if not os.path.isfile(PATH + '/' + file):
            # 遍历文件夹
            for img in os.listdir(PATH + '/' + file):
                # 判断是否是文件

                downLoadImg(PATH + '/' + file + "/" + img,PATH1)
        


if __name__ == "__main__":
    main()