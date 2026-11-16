const trips = {
  istanbul: {
    name: "سحر إسطنبول",
    destination: "إسطنبول، تركيا",
    price: "١٢,٩٩٠",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=85",
    description: "سبعة أيام تجمع بين عبق التاريخ، جولات البوسفور، والأسواق التي لا تنام. استمتع بإقامة مريحة وبرنامج متوازن.",
    itinerary: ["اليوم الأول: الوصول والاستقبال", "اليوم الثاني: المدينة القديمة وآيا صوفيا", "اليوم الثالث: جولة البوسفور", "اليوم الرابع: جزر الأميرات", "اليوم الخامس: الأسواق والتسوق", "اليوم السادس: يوم حر", "اليوم السابع: المغادرة"],
    includes: ["الإقامة ٦ ليالٍ مع الإفطار", "الاستقبال والتوديع من المطار", "جولة سياحية مع مرشد", "التنقلات المذكورة بالبرنامج", "دعم ومتابعة طوال الرحلة"]
  },
  santorini: {
    name: "حكاية سانتوريني",
    destination: "سانتوريني، اليونان",
    price: "٢٤,٥٠٠",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=85",
    description: "خمسة أيام من الاسترخاء على الجزيرة اليونانية الساحرة، بين البيوت البيضاء والإطلالات البحرية والغروب الشهير.",
    itinerary: ["اليوم الأول: الوصول إلى الجزيرة", "اليوم الثاني: جولة في فيرا وإيميروفيغلي", "اليوم الثالث: شاطئ بيريسا", "اليوم الرابع: رحلة بحرية وغروب أويا", "اليوم الخامس: المغادرة"],
    includes: ["الإقامة ٤ ليالٍ", "الإفطار اليومي", "الاستقبال والتوديع", "جولة بحرية جماعية", "دعم ومتابعة طوال الرحلة"]
  },
  dubai: {
    name: "نبض دبي",
    destination: "دبي، الإمارات",
    price: "١٨,٧٥٠",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=85",
    description: "أربعة أيام بين معالم دبي الحديثة وتجاربها الممتعة، من وسط المدينة النابض إلى أجواء الصحراء الهادئة.",
    itinerary: ["اليوم الأول: الوصول وجولة وسط المدينة", "اليوم الثاني: برج خليفة ودبي مول", "اليوم الثالث: سفاري الصحراء", "اليوم الرابع: وقت حر والمغادرة"],
    includes: ["الإقامة ٣ ليالٍ مع الإفطار", "الاستقبال والتوديع من المطار", "جولة سفاري الصحراء", "التنقلات المذكورة بالبرنامج", "دعم ومتابعة طوال الرحلة"]
  }
};

const modal = document.querySelector("#trip-modal");
const modalTitle = document.querySelector("#modal-title");
const modalDestination = document.querySelector("#modal-destination");
const modalImage = document.querySelector("#modal-image");
const modalPrice = document.querySelector("#modal-price");
const modalDescription = document.querySelector("#modal-description");
const modalItinerary = document.querySelector("#modal-itinerary");
const modalIncludes = document.querySelector("#modal-includes");
const modalBook = document.querySelector("#modal-book");
const closeButton = document.querySelector(".modal-close");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const toast = document.querySelector(".toast");
let toastTimeout;

function openTrip(tripKey) {
  const trip = trips[tripKey];
  if (!trip) return;
  modalTitle.textContent = trip.name;
  modalDestination.textContent = trip.destination;
  modalImage.src = trip.image;
  modalImage.alt = trip.destination;
  modalPrice.innerHTML = `<strong>${trip.price} ج.م</strong>للفرد، تبدأ من`;
  modalDescription.textContent = trip.description;
  modalItinerary.replaceChildren(...trip.itinerary.map((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    return li;
  }));
  modalIncludes.replaceChildren(...trip.includes.map((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    return li;
  }));
  modalBook.href = `https://wa.me/201000000000?text=${encodeURIComponent(`مرحبًا، أود الاستفسار عن رحلة ${trip.name}`)}`;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  closeButton.focus();
}

function closeTrip() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.querySelectorAll(".trip-details").forEach((button) => {
  button.addEventListener("click", () => openTrip(button.dataset.trip));
});

closeButton.addEventListener("click", closeTrip);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeTrip();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) closeTrip();
});

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "فتح القائمة" : "إغلاق القائمة");
  mainNav.classList.toggle("is-open", !isExpanded);
});
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "فتح القائمة");
  });
});

document.querySelectorAll(".save-trip").forEach((button) => {
  button.addEventListener("click", () => {
    const saved = button.classList.toggle("is-saved");
    button.textContent = saved ? "♥" : "♡";
    button.setAttribute("aria-pressed", String(saved));
    toast.textContent = saved ? "أُضيفت الرحلة إلى مفضلتك" : "أُزيلت الرحلة من مفضلتك";
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
  });
});
