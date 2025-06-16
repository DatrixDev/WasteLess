
    document.addEventListener("DOMContentLoaded", function () {
        const searchInput = document.getElementById("search-input");

        searchInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                const keyword = searchInput.value.trim();
                if (keyword !== "") {
                    alert("Đang tìm kiếm: " + keyword);
                    searchInput.blur();
                    setTimeout(() => {
                        searchInput.value = "";
                    }, 1000);
                }
            }
        });
    });

    window.addEventListener('DOMContentLoaded', function () {
        var currentPage = window.location.pathname.split("/").pop();

        var menuLinks = document.querySelectorAll('.inner-menu a');

        menuLinks.forEach(function(link) {
            var linkPath = link.getAttribute('href');

            if (linkPath === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });


//SECTION-ONE
document.addEventListener('scroll', function () {
    const heading = document.querySelector('.section-one div');
    const scrollY = window.scrollY;
    const fadeStart = 0;
         const fadeEnd = 300;

  
    let opacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
    heading.style.opacity = Math.max(opacity, 0);
  });




    document.addEventListener("DOMContentLoaded", () => {
        const counters = document.querySelectorAll(".counter");
    
        const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    
        const animateCount = (counter, duration = 2000) => {
            const target = +counter.getAttribute("data-target");
            let start = 0;
            const startTime = performance.now();
    
            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOut(progress);
                const value = Math.floor(easedProgress * target);
    
                counter.textContent = value.toLocaleString();
    
                // Thêm dấu cộng nếu chưa có
                if (!counter.textContent.includes('+')) {
                    counter.textContent += '+';
                }
    
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = value.toLocaleString() + '+';
                }
            };
    
            requestAnimationFrame(updateCounter);
        };
    
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    observer.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.6 });
    
        counters.forEach(counter => {
            observer.observe(counter);
        });
    });
    


    /*PHONE*/





//SECTION-TWO
const mainFeature = document.getElementById("main-feature");
const mainIcon = document.getElementById("main-icon");
const mainTitle = document.getElementById("main-title");
const mainDesc = document.getElementById("main-desc");
const featureList = document.getElementById("feature-list");

featureList.addEventListener("click", function (e) {
  const box = e.target.closest(".feature-box");
  if (!box) return;

  // --- Lấy phần tử trong box ---
  const boxImage = box.querySelector("img");
  const boxIcon = box.dataset.icon;
  const boxTitle = box.dataset.title;
  const boxDesc = box.dataset.desc;

  const boxP = box.querySelector("p");      // Tiêu đề ngắn
  const boxH3 = box.querySelector("h3");    // Mô tả thu gọn

  // --- Lưu dữ liệu hiện tại từ khung chính ---
  const oldImageHTML = mainIcon.innerHTML;
  const oldIcon = mainIcon.dataset.icon || "";
  const oldTitle = mainTitle.textContent;
  const oldDesc = mainDesc.textContent;

  // --- Lưu dữ liệu rút gọn để gán lại vào box ---
  const shortTitle = mainTitle.textContent;        // Gán vào p
  const shortDesc = mainDesc.textContent;          // Gán vào h3

  // --- Gán dữ liệu mới lên khung chính ---
  mainIcon.innerHTML = boxImage.outerHTML;
  mainIcon.dataset.icon = boxIcon;
  mainTitle.textContent = boxTitle;
  mainDesc.textContent = boxDesc;

  // --- Gán dữ liệu cũ (rút gọn) trở lại box ---
  box.querySelector("img").outerHTML = oldImageHTML;
  box.dataset.icon = oldIcon;
  box.dataset.title = oldTitle;
  box.dataset.desc = oldDesc;

  boxP.textContent = oldTitle;  // đổi lại p
  boxH3.textContent = oldDesc;  // đổi lại h3
});


//END-SECTION-TWO

// SECTION-THREE
document.addEventListener("DOMContentLoaded", () => {
    const timelineCards = document.querySelectorAll(".timeline-content");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const timelineContainer = document.querySelector(".timeline");

    timelineCards.forEach((card) => {
      card.addEventListener("click", () => {
        card.classList.toggle("flipped");
      });
    });

    if (prevBtn && timelineContainer) {
      prevBtn.addEventListener("click", () => {
        timelineContainer.scrollBy({ left: -320, behavior: "smooth" });
      });
    }

    if (nextBtn && timelineContainer) {
      nextBtn.addEventListener("click", () => {
        timelineContainer.scrollBy({ left: 320, behavior: "smooth" });
      });
    }
  });

document.getElementById('next').onclick = function () {
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').appendChild(lists[0]);
}

document.getElementById('prev').onclick = function () {
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').prepend(lists[lists.length - 1]);
}

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', function () {
        let lists = document.querySelectorAll('.item');
        document.getElementById('slide').appendChild(lists[0]);
    });
});



//   HIỆU ỨNG
