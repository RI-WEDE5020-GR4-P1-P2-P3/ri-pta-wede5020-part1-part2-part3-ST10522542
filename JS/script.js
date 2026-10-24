

/* PRODUCT SEARCH */

function searchProducts() {
    let searchInput = document.getElementById("productSearch");
    let searchMessage = document.getElementById("searchMessage");

    if (!searchInput || !searchMessage) {
        return;
    }

    let searchText = searchInput.value.toLowerCase().trim();
    let products = document.querySelectorAll("main h3");
    let found = false;

    for (let i = 0; i < products.length; i++) {
        let productName = products[i].textContent.toLowerCase();

        if (searchText !== "" && productName.includes(searchText)) {
            products[i].scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            searchMessage.textContent =
                "Category found: " + products[i].textContent;

            found = true;
            break;
        }
    }

    if (!found) {
        searchMessage.textContent =
            "No matching category found. Try Groceries, Fresh Produce, Beverages or Household Products.";
    }
}


/* IMAGE GALLERY LIGHTBOX */

function setupLightbox() {
    let images = document.querySelectorAll("main img");

    images.forEach(function (image) {
        image.style.cursor = "pointer";

        image.onclick = function () {
            // Prevent opening multiple lightboxes
            if (document.querySelector(".lightbox")) {
                return;
            }

            let lightbox = document.createElement("div");
            lightbox.className = "lightbox";

            let largeImage = document.createElement("img");
            largeImage.src = image.src;
            largeImage.alt = image.alt;

            let closeButton = document.createElement("button");
            closeButton.textContent = "Close X";
            closeButton.className = "lightbox-close";

            lightbox.appendChild(closeButton);
            lightbox.appendChild(largeImage);
            document.body.appendChild(lightbox);

            closeButton.onclick = function () {
                lightbox.remove();
            };

            lightbox.onclick = function (event) {
                if (event.target === lightbox) {
                    lightbox.remove();
                }
            };
        };
    });
}


/* START LIGHTBOX AFTER PAGE LOADS */

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupLightbox);
} else {
    setupLightbox();
}

/* INTERACTIVE MAP */

function setupMap() {
    let mapElement = document.getElementById("map");

    // Only run on pages containing the map
    if (!mapElement || typeof L === "undefined") {
        return;
    }

    // Prevent the map from being created twice
    if (mapElement.dataset.mapLoaded === "true") {
        return;
    }

    mapElement.dataset.mapLoaded = "true";

    // Example location: central Johannesburg
    let map = L.map("map").setView(
        [-26.2041, 28.0473],
        13
    );

    // Load map tiles
    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    ).addTo(map);

    // Add a clickable marker
    let marker = L.marker([-26.2041, 28.0473])
        .addTo(map);

    marker.bindPopup(
        "<b>SaveMore Supermarket</b><br>Example location in Johannesburg."
    );
}

// Wait until the page is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupMap);
} else {
    setupMap();
}

/* ENQUIRY FORM VALIDATION */

function setupEnquiryForm() {
    let form = document.getElementById("enquiryForm");

    if (!form) {
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("enquiryName").value.trim();
        let type = document.getElementById("enquiryType").value;
        let message = document.getElementById("enquiryMessage").value.trim();
        let response = document.getElementById("enquiryResponse");

        if (name.length < 2 || message.length < 10 || type === "") {
            response.textContent =
                "Please complete all fields correctly.";
            return;
        }

        response.textContent =
            "Thank you, " + name + "! Your " +
            type.toLowerCase() +
            " enquiry has passed validation. Please contact the store to confirm prices and availability.";

        form.reset();
    });
}


/* CONTACT FORM VALIDATION */

function setupContactForm() {
    let form = document.getElementById("contactForm");

    if (!form) {
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("contactName").value.trim();
        let subject = document.getElementById("contactSubject").value.trim();
        let message = document.getElementById("contactMessage").value.trim();
        let response = document.getElementById("contactResponse");

        if (name.length < 2 ||
            subject.length < 3 ||
            message.length < 10) {
            response.textContent =
                "Please complete all fields correctly.";
            return;
        }

        response.textContent =
            "Thank you, " + name +
            "! Your message has passed validation. This demo does not send messages to the store.";

        form.reset();
    });
}


/* START BOTH FORMS WHEN THE PAGE LOADS */

function setupForms() {
    setupEnquiryForm();
    setupContactForm();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupForms);
} else {
    setupForms();
}
