let allTests = [];
let filteredTests = [];

const listEl = document.getElementById("testList");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterCategory");

// Thay URL này bằng URL của bạn tạo trên mocki.io
const API_URL = "https://mocki.io/v1/17e320b4-dec6-4f11-8b0b-042d07d4e0cf";

function renderTests(tests) {
  listEl.innerHTML = "";

  if (tests.length === 0) {
    listEl.innerHTML = `<p class="text-muted">Không tìm thấy xét nghiệm nào.</p>`;
    return;
  }

  tests.forEach((test, index) => {
    const card = document.createElement("div");
    card.className = "col-12 col-md-6";

    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title text-primary">${test.ten}</h5>
          <p class="card-text">${test.moTa}</p>
          <ul class="list-unstyled">
            <li><strong>Giá:</strong> ${test.gia}</li>
            <li><strong>Thời gian:</strong> ${test.thoiGian}</li>
            <li><strong>Danh mục:</strong> ${test.danhMuc}</li>
          </ul>
          <button class="btn btn-outline-primary mt-2" onclick="showDetail(${index})">Xem chi tiết</button>
        </div>
      </div>
    `;

    listEl.appendChild(card);
  });
}

function showDetail(index) {
  const test = filteredTests[index];
  document.getElementById("modalTitle").textContent = test.ten;
  document.getElementById("modalBody").innerHTML = `
    <p>${test.moTa}</p>
    <p><strong>Giá:</strong> ${test.gia}</p>
    <p><strong>Thời gian:</strong> ${test.thoiGian}</p>
    <p><strong>Danh mục:</strong> ${test.danhMuc}</p>
  `;
  const modal = new bootstrap.Modal(document.getElementById("detailModal"));
  modal.show();
}

function applyFilters() {
  const keyword = searchInput.value.toLowerCase();
  const selectedCategory = filterSelect.value;

  filteredTests = allTests.filter(test => {
    const matchKeyword = test.ten.toLowerCase().includes(keyword);
    const matchCategory = selectedCategory ? test.danhMuc === selectedCategory : true;
    return matchKeyword && matchCategory;
  });

  renderTests(filteredTests);
}

// Load dữ liệu từ API
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    allTests = data;
    filteredTests = data;
    renderTests(filteredTests);
  })
  .catch(err => console.error("Lỗi tải API:", err));

// Sự kiện tìm kiếm & lọc
searchInput.addEventListener("input", applyFilters);
filterSelect.addEventListener("change", applyFilters);
