import https from 'https';
import cheerio from 'cheerio';
import chalk from 'chalk';
import request from 'request';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import puppeteer from 'puppeteer';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { EventEmitter } from 'events';
const URL = `https://zazhitaotu.cc/page/`
const event = new EventEmitter();
event.setMaxListeners(0)
const COUNT = 25;

const PUBLIC_PATH = path.resolve(__dirname, 'dist');

var opt = {
    host: '127.0.0.1', // 这里是代理服务器的地址
    port: '7890', // 这里是代理服务器的端口号
    method: 'GET', // 这里是发送的方法
    path: "https://blog.csdn.net/weixin_42259266/article/details/104119222?spm=1001.2101.3001.6650.7&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EESLANDING%7Edefault-7-104119222-blog-125909225.pc_relevant_landingrelevant&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EESLANDING%7Edefault-7-104119222-blog-125909225.pc_relevant_landingrelevant", // 这里是访问的路径
};

const getHtml = async (page) => {
    console.log(URL + page)
    try {
        return await https.request(opt, (res) => {
            let html = '';
            res.on('data', (chunk) => {
                html += chunk;
            });
            res.on('end', () => {
                console.log(res)
                // const $ = cheerio.load(html);
                // const list = $('.post-list .post-item');
                // list.each((index, item) => {
                //     const title = $(item).find('.post-title a').text();
                //     const img = $(item).find('.post-img img').attr('src');
                //     const link = $(item).find('.post-title a').attr('href');
                //     const time = $(item).find('.post-time').text();
                //     const desc = $(item).find('.post-desc').text();
                //     const data = {
                //         title,
                //         img,
                //         link,
                //         time,
                //         desc
                //     }
                //     console.log(data)
                //     fs.appendFile(`${PUBLIC_PATH}/data.json`, JSON.stringify(data) + ',', (err) => {
                //         if (err) throw err;
                //         console.log('数据已追加到文件');
                //     });
                // })
            })
        });
    } catch (error) {
        console.log(chalk.red(error.message));
    }
}

async function main() {
    console.log(PUBLIC_PATH)
    // for (let i = 1; i <= COUNT; i++) {
    //     console.log(chalk.green(`正在爬取第${i}页`));
    //     const browser = await puppeteer.launch()
    //     const page = await browser.newPage()
    //     await page.goto(URL + i)
    //     const html = await page.content()
    //     const $ = cheerio.load(html);

    //     $("#masonry .item").each(async (index, item) => {
    //         const link = $(item).find('a').attr('href');
    //         const title = $(item).find('.item-link-text').text();
    //         const browser1 = await puppeteer.launch({
    //             args: ['--no-sandbox']
    //         })
    //         const page1 = await browser1.newPage()
    //         await page1.goto(link)
    //         const html = await page1.content()
    //         const $1 = cheerio.load(html);
    //         $1("#masonry .post-item-img").each(async (index, item) => {
    //             console.log($1(item).attr('data-original'))
    //             const imgUrl = $1(item).attr('data-original');
    //             fs.mkdir(PUBLIC_PATH + "/" + title, (e) => {
    //                 if (!e || (e && e).code === 'EEXIST') {
    //                     if (imgUrl)
    //                         //保存在这个目录下
    //                         request(imgUrl).pipe(fs.createWriteStream(PUBLIC_PATH + "/" + title + "/" + (index * 1) + 1 + ".jpg"));
    //                     else
    //                         console.log('地址为空')
    //                 }
    //                 else {
    //                     console.log('err')
    //                 }
    //             })
    //         })
    //         await browser1.close()
    //         console.log(link, title)
    //         await sleep(2000)
    //     })
    //     await browser.close()
    // }
    request("https://zazhitaotu.cc/usr/uploads/2020/04/2845503267.jpg", (err, body) => {
        console.log(err, body)
    })
}
main();

/*
休眠函数sleep
调用 await sleep(1500)
 */
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}