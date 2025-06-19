//Product Detailed page

//index.html에서 상품 리스트를 클릭하여 이동 시, product-detail.html에 동일한 상품 노출

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (!productId) {
    console.error("상품 ID가 없습니다.");
    return;
  }

  const productImage = document.querySelector(".product-image img");
  const brandElem = document.querySelector(".product-info .brand");
  const titleElem = document.querySelector(".product-info .title");
  const priceElem = document.querySelector(".product-info .price");
  const deliveryElem = document.querySelector(".product-info .delivery");

  async function fetchProductDetail(id) {
    try {
      const res = await fetch(`https://api.wenivops.co.kr/services/open-market/products/${id}`);
      const product = await res.json();

      productImage.src = product.image;
      productImage.alt = product.name;
      brandElem.textContent = product.seller.store_name;
      titleElem.textContent = product.name;
      priceElem.innerHTML = `${product.price.toLocaleString()}<span>원</span>`;
      deliveryElem.textContent = product.shipping_method === "DELIVERY"
        ? `택배배송 / 배송비 ${product.shipping_fee.toLocaleString()}원`
        : `직접배송 / 배송비 ${product.shipping_fee.toLocaleString()}원`;

    } catch (err) {
      console.error("상품 정보 불러오기 실패:", err);
    }
  }

  fetchProductDetail(productId);
});

// // Quantity-box

document.addEventListener("DOMContentLoaded", async () => {
  // URL에서 상품 ID 추출
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  // 필요한 DOM 요소 선택
  const minusBtn = document.querySelector(".quantity-box .minus");
  const plusBtn = document.querySelector(".quantity-box .plus");
  const quantityElem = document.querySelector(".quantity-box .quantity");
  const totalQuantity = document.querySelector(".summary .total strong");
  const totalPrice = document.querySelector(".summary .total-price strong");

  let quantity = 1;
  let maxQuantity = 99; // 기본값 (API 연동 후 실제 값으로 덮어씀)

  // 수량 표시 업데이트 함수
  function updateQuantityDisplay() {
    quantityElem.textContent = quantity;
    totalQuantity.textContent = quantity;
    totalPrice.textContent = (quantity * productPrice).toLocaleString();

    // 버튼 상태 갱신
    minusBtn.disabled = quantity <= 1;
    plusBtn.disabled = quantity >= maxQuantity;
  }

  // 버튼 클릭 이벤트
  minusBtn.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      updateQuantityDisplay();
    }
  });

  plusBtn.addEventListener("click", () => {
    if (quantity < maxQuantity) {
      quantity++;
      updateQuantityDisplay();
    }
  });

  // 상품 정보 가져오기
  try {
    const res = await fetch(`https://api.wenivops.co.kr/services/open-market/products/${productId}/`);
    const data = await res.json();

    maxQuantity = data.stock; // 최대 수량 설정
    productPrice = data.price;
    updateQuantityDisplay();  // 초기 버튼 상태 업데이트
  } catch (err) {
    console.error("상품 정보를 불러오지 못했습니다:", err);
  }
});