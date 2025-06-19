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

  // HTML 문서의 내용이 모두 로드되었을 때 아래 코드를 실행, DOM 구조가 준비 되기 전에는 요소를 찾을 수 없기 때문
document.addEventListener("DOMContentLoaded", () => {
  // HTML 문서에서 .product-list를 찾아서 const producList에 저장 
  const productList = document.querySelector(".product-list");

  // 상품 카드 생성 함수
  function createProductCard(product) {
    // card = <div class="product-card"></div>
    const card = document.createElement("div");
    card.classList.add("product-card");

    //card 안에 innerHTML을 사용해서 html 코드를 작성한다.
    //${product.image}에서 ${}를 쓰는 이유는 데이터가 바뀔 수 있기 때문
    //product와 image는 API 명세의 Res에서 확인 가능
    //.toLocaleString()는 숫자에 ',' 넣어주는 기능
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <p class="brand">${product.seller.store_name}</p>
      <h3 class="product-title">${product.name}</h3>
      <p class="product-price">${product.price.toLocaleString()}<span>원</span></p>
    `;

    //  클릭 시 상세 페이지로 이동하는 기능
    //addEventListener()는 () 안에 행위와 결과가 들어감. addEventListener(행위, 함수)와 깉이.
    card.addEventListener("click", () => {
      // window.location.href를 이용해 상세 페이지로 이동
      window.location.href = `product-detail.html?id=${product.id}`;
    });

    //위에서 만든 card를 결과로 제공
    return card;
  }

  // 상품 목록 API 호출

  //비동기 함수 async/await는 직렬로 가던 코드가 병렬로 분기됨
  //- async를 만나면 분기되어 1.직렬로 코드를 계속 읽음, 2. 서버에서 api 데이터를 가져옴 두가지를 동시에 진행
  //-try/catch, then/catch
  async function fetchProducts() {

    //fetch는 api 주소에서 데이터를 불러올때 사용
    //try는 뭐지?
    // try는 async/await와 함께 사용됨, catch를 통해 error case 대응을 위해 사용
    try {
    // await fetch(API URL) = API URL을 불러온다(fetch)
      const res = await fetch("https://api.wenivops.co.kr/services/open-market/products/");
      //date는 위에서 선언한 res를 json으로 바꿔서 저장한 것
      //질문) 왜 json()으로 저장해?
      const data = await res.json();

      //만약 data에서 불러온 api의 데이터가 0이면 
      if (data.count === 0) {
      //productList의 안에 p태그 추가
        productList.innerHTML = `<P>상품이 존재하지 않습니다.</p>`;
        //질문) 여기는 리턴 뒤에 아무것도 안쓰나?
        return;
      }

      //api 데이터를 json()으로 저장한 결과을 각각 card에 넣는다.
      //질문) 근데 product를 왜 또 적는거지?
      data.results.forEach(product => {
        // 질문) 여기가 좀 이해가 잘 안되요.
        const card = createProductCard(product);
        //생성한 card를 productList에 하나씩 추가(appendChild)한다.
        productList.appendChild(card);
      });
    //만약 API 요청이 실패하면 콘솔에 에러 문구를 전달하고, productList에 안내문구 노출한다.
    } catch (err) {
      console.error("상품 목록 불러오기 실패", err);
      productList.innerHTML = `<P>상품을 불러오는 데 문제가 발생했습니다.</p>`;
    }
  }
  //????아 질문) 이게 async에서 만든 함수인가?
  fetchProducts();
});




