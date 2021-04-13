# 甲必丹遊艇網（Kapitan）

本專案是一個透過 Vue Cli 2 建立的單頁應用，主題為販賣遊艇行程的電商網站，品牌名為甲必丹（Kapitan）。甲必丹擁有完整的前後台和資料庫，並架設在 Heroku 平台上。

這個儲存庫是甲必丹的前端內容。後端內容則請見：https://github.com/Hugo-Chiang/Backend-Side-Projects-0001-Kapitan

## 演示網址

* 前台：https://fe-sp-0001-kapitan.herokuapp.com/#/
* 後台：https://fe-sp-0001-kapitan.herokuapp.com/#/Admin

（如需測試後台，請聯繫作者拿取「測試管理員」帳密並約定測試時間。「測試管理員」不能影響既有資料庫內容，新增項目會被強制冠上測試狀態，也只能刪改自己新增的測試項目。）

## 網站架構

__前台__：
1. 首頁：得知本站服務流程，訂閱電子報。
2. 登入註冊：登入或註冊。
3. 挑選航程：即商城，可以透過地點和預算篩選商品。
4. 方案頁：即商品頁，在此了解商品內容和會合地點，並選購非額滿或三日（不含）內的行程。
5. 購物車：可對選購商品作內容調整，包含增減人數或刪除品項。進行結帳需要登入。
6. 會員中心：可以修改會員資料和檢視訂單。

__後台__：
1. 訂單管理：對訂單及其細項進行「增刪改查」。
2. 方案管理：對方案進行「增刪改查」。
3. 會員管理：對會員進行「增刪改查」。

## 使用技術

技術：
* HTML 5
* CSS 3（SCSS）
* JavaScript
* PHP
* MySQL
* Git
 
框架：
* Vue.js 2
* Bootstrap 4

工具：
* Vue Cli 2
* MySQL Workbench

## 部署方式

``` bash
# 安裝所需內容
npm install

# 執行開發模式，伺服器埠口為 localhost:8080
npm run dev

# （有需求的話）執行打包
npm run build

```
