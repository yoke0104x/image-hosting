import requests
import os
from lxml import etree
import time
# 地址
URL = 'https://zazhitaotu.cc'

# 存储文件
PATH = os.path.dirname(__file__) + '/dist'

# 代理
proxies = {
    'http': 'http://127.0.0.1:8889',
    'https': 'http://127.0.0.1:8889'
}
# 下载图片
def downLoadImg(fileName, url,name):
    # 去除文件名中的非法字符
    filename = fileName.replace(' ', '').replace('\n', '')

    # 下载图片
    content = requests.get(url, proxies=proxies).content;
    # 保存图片
    with open(PATH + '/' + filename + '/' + str(name) + '.jpg', 'wb') as f:
        f.write(content)
    print(fileName,url,name)


def getDetailList(href,name,index):
    response = requests.get(href, proxies=proxies);
    response.encoding = 'utf-8'
    html = etree.HTML(response.text)
    list = html.xpath('//*[@id="masonry"]/div')
    # 去除文件名中的非法字符
    filename = name.replace(' ', '').replace('\n', '')
    if not os.path.exists(PATH + '/' + filename):
        # 创建文件夹
        os.makedirs(PATH + '/' + filename,exist_ok=True)
        for i in range(0, len(list)):
            url = list[i].xpath('img/@data-original')[0];
            print(f"正在获取第{index}页",f"正在获取第{i+1}张图片");
            downLoadImg(name,url,i)
    else:
        print(f"正在获取第{index}页",f"正在获取{filename}文件夹");


# 获取某页的列表
def getList(index):
    response = requests.get(f"https://zazhitaotu.cc/page/{index}", proxies=proxies);
    response.encoding = 'utf-8'
    html = etree.HTML(response.text)
    list = html.xpath('//*[@id="masonry"]/div')
    for i in range(0, len(list)):
        href = list[i].xpath('div[1]/a/@href')[0]
        name = list[i].xpath('div[1]/a/div')[0].text
        getDetailList(href,name,index)

# 删除文件
def removeFile():
    if len(os.listdir(PATH)) > 0:
        for file in os.listdir(PATH):
            if os.path.isfile(PATH + '/' + file):
                os.remove(PATH + '/' + file)
            else:
                os.rmdir(PATH + '/' + file)

# 主函数
def main():
    # removeFile()
    for i in range(16, 26):
        getList(i)
        # time.sleep(500)

if __name__ == '__main__':
    main()