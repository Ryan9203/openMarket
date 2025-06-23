document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector(".signup-form");
  const signupBtn = document.querySelector(".signup-btn");

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.querySelector(".input-with-btn input").value.trim();
    const password = document.querySelectorAll(".input-with-icon input")[0].value;
    const passwordCheck = document.querySelectorAll(".input-with-icon input")[1].value;
    const name = document.querySelector(".input-name input").value.trim();
    const phone1 = document.querySelector(".phone-box select").value;
    const phone2 = document.querySelectorAll(".phone-box input")[0].value.trim();
    const phone3 = document.querySelectorAll(".phone-box input")[1].value.trim();
    const phoneNumber = `${phone1}${phone2}${phone3}`;

    // 1. 입력값 유효성 체크
    if (!username || !password || !passwordCheck || !name || !phone2 || !phone3) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 2. API 요청
    try {
      const res = await fetch("https://api.wenivops.co.kr/services/open-market/accounts/buyer/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          name,
          phone_number: phoneNumber,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
        window.location.href = "./login.html";
      } else {
        // 실패 사유에 따라 알림
        alert(data.username || data.password || data.name || data.phone_number || "회원가입에 실패했습니다.");
      }
    } catch (err) {
      console.error("회원가입 요청 실패:", err);
      alert("회원가입 요청 중 오류가 발생했습니다.");
    }
  });
});
