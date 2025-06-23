document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login-form");
  const usernameInput = loginForm.querySelector('input[name="username"]');
  const passwordInput = loginForm.querySelector('input[name="password"]');
  const errorMsg = document.createElement("p");
  errorMsg.style.color = "red";
  errorMsg.style.fontSize = "14px";
  errorMsg.style.marginTop = "4px";
  passwordInput.insertAdjacentElement("afterend", errorMsg);

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    try {
      const res = await fetch("https://api.wenivops.co.kr/services/open-market/accounts/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        errorMsg.textContent = data.error || "로그인에 실패했습니다.";
        return;
      }

      // 로그인 성공
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));

      // 메인 페이지로 이동
      window.location.href = "./index.html";
    } catch (err) {
      console.error("로그인 요청 실패:", err);
      errorMsg.textContent = "네트워크 오류가 발생했습니다.";
    }
  });
});
