// Move to Login-page

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.querySelector(".loginPage-btn");

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }
});

// Product List

document.addEventListener("DOMContentLoaded", () => {
  const productList = document.querySelector(".product-list");

  // 상품 카드 생성 함수
  function createProductCard(product) {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <p class="brand">${product.seller.store_name}</p>
      <h3 class="product-title">${product.name}</h3>
      <p class="product-price">${product.price.toLocaleString()}<span>원</span></p>
    `;

    return card;
  }

  // 상품 목록 API 호출

  async function fetchProducts() {

    try {
      const res = await fetch("https://api.wenivops.co.kr/services/open-market/products/");
      const data = await res.json();

      if (data.count === 0) {
        productList.innerHTML = `<P>상품이 존재하지 않습니다.</p>`;
        return;
      }

      data.results.forEach(product => {
        const card = createProductCard(product);
        productList.appendChild(card);
      });
    } catch (err) {
      console.error("상품 목록 불러오기 실패", err);
      productList.innerHTML = `<P>상품을 불러오는 데 문제가 발생했습니다.</p>`;
    }
  }
  fetchProducts();
});

