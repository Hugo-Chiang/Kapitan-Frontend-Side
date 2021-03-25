<script>
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

// 函式：透過 session 向後端查明目前登入的會員 ID
function verifySignInedMember() {
  const api = `${process.env.REMOTE_HOST_PATH}/API/Forestage/SignInAuthentication.php`;
  const session = this.GlobalFunctions.getKapitanSession("forestage");

  this.$http
    .post(api, session)
    .then((response) => {
      console.log(response.data);
      if (response.data.sessionCheck) {
        console.log(this);
        localStorage.setItem("kapitanSignedInID", response.data.signInedID);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export default {
  format,
  getKapitanSession,
  verifySignInedMember,
};
</script>