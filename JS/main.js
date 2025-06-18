// Move to Login-page

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.querySelector(".loginPage-btn");

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }
});


