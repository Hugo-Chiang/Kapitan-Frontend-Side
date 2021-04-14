<script>
import axios from "axios";
import router from "../router";

// （準備於 Date 原型下）創立時間格式化方法，以利資料庫內容與 input 間銜接順利
function format(fmt) {
  let o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
}

// 函式：抓取存在 cookie 中的 session（通用）
function getKapitanSession(sessionUseAtStr) {
  let cookie = document.cookie;
  let startIndex = 0;
  let keyLength = 0;
  let forestageKey = 'kapitanMembersSession="';
  let backstageKey = 'kapitanAdminSession="';

  switch (sessionUseAtStr) {
    case "forestage":
      startIndex = cookie.indexOf(forestageKey);
      keyLength = forestageKey.length;
      break;
    case "backstage":
      startIndex = cookie.indexOf(backstageKey);
      keyLength = backstageKey.length;
      break;
  }

  let rawSession = cookie.substring(startIndex + keyLength);
  let endIndex = rawSession.indexOf('"');
  let session = rawSession.substring(0, endIndex);

  return session;
}

// 函式：抓取存在 cookie 中的 ID（通用）
function getSignInedID(whichSignInedID) {
  let cookie = document.cookie;
  let startIndex = 0;
  let IDlength = 0;
  let memberID = 'kapitanMemberID="';
  let admminID = 'kapitanAdminID="';

  switch (whichSignInedID) {
    case "member":
      startIndex = cookie.indexOf(memberID);
      IDlength = memberID.length;
      break;
    case "admin":
      startIndex = cookie.indexOf(admminID);
      IDlength = admminID.length;
      break;
  }

  let rawID = cookie.substring(startIndex + IDlength);
  let endIndex = rawID.indexOf('"');
  let ID = rawID.substring(0, endIndex);

  return ID;
}

// 檢查登入 session 是否還有效，避免重複登入
function checkDuplicateLogin(stage, ID) {
  let session = this.getKapitanSession(stage);
  let api = "";
  let redirection = "";

  switch (stage) {
    case "forestage":
      api = `${process.env.REMOTE_HOST_PATH}/API/Forestage/SignInAuthentication.php`;
      redirection = "登入註冊";
      break;
    case "backstage":
      api = `${process.env.REMOTE_HOST_PATH}/API/Backstage/AdminSignInAuthentication.php`;
      redirection = "管理系統：登入頁";
      break;
  }

  let sendingObj = {
    stage: stage,
    ID: ID,
    session: session,
  };

  axios
    .post(api, JSON.stringify(sendingObj))
    .then((response) => {
      if (!response.data.sessionCheck) {
        alert(
          `您的登入驗證已失效。請再登入一次，謝謝！\n最後登入時間為：【 ${response.data.signInTime} 】，請檢察是否重複登入。`
        );
        router.push({ name: redirection });
      }
    })
    .catch((error) => {
      console.log(error);
      alert("伺服器異常，請稍後再登入。造成您的不便，很抱歉！");
      router.push({ name: redirection });
    });
}

export default {
  format,
  getKapitanSession,
  getSignInedID,
  checkDuplicateLogin,
};
</script>