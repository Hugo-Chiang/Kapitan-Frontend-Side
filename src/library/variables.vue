<script>
const cloudName = "hugo-chiang";
const cloudUrlprefix = "https://res.cloudinary.com/hugo-chiang/image/upload/";
const cloudNoImgUrl =
  "Side-Projects/Frontend-Side-Projects-0001-Kapitan/Web-Imgs/ur4ulenyc0zq7gwhewfn.jpg";
const cloudNoAvatarUrl =
  "Side-Projects/Frontend-Side-Projects-0001-Kapitan/Web-Imgs/jg4rylsnwucotopfjaz9.png";
const membersAvatarPreset = "FE-SP-0001-Kapitan-Members-Avatar";
const projectAvatarPreset = "FE-SP-0001-Kapitan-Projects-Avatar";
const projectContentPreset = "FE-SP-0001-Kapitan-Projects-Content";
const projectCarouselPreset = "FE-SP-0001-Kapitan-Projects-Carousel";
let signInedID = "";

// 導入 SmtpJS 的程式碼
var Email = {
  send: function (a) {
    return new Promise(function (n, e) {
      (a.nocache = Math.floor(1e6 * Math.random() + 1)), (a.Action = "Send");
      var t = JSON.stringify(a);
      Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) {
        n(e);
      });
    });
  },
  ajaxPost: function (e, n, t) {
    var a = Email.createCORSRequest("POST", e);
    a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
      (a.onload = function () {
        var e = a.responseText;
        null != t && t(e);
      }),
      a.send(n);
  },
  ajax: function (e, n) {
    var t = Email.createCORSRequest("GET", e);
    (t.onload = function () {
      var e = t.responseText;
      null != n && n(e);
    }),
      t.send();
  },
  createCORSRequest: function (e, n) {
    var t = new XMLHttpRequest();
    return (
      "withCredentials" in t
        ? t.open(e, n, !0)
        : "undefined" != typeof XDomainRequest
        ? (t = new XDomainRequest()).open(e, n)
        : (t = null),
      t
    );
  },
};

export default {
  cloudName,
  cloudUrlprefix,
  cloudNoImgUrl,
  cloudNoAvatarUrl,
  membersAvatarPreset,
  projectAvatarPreset,
  projectContentPreset,
  projectCarouselPreset,
  signInedID,
  Email,
};
</script>