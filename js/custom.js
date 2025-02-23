(function ($) {
  "use strict";

  // NAVBAR
  $(".navbar-nav .nav-link").click(function () {
    $(".navbar-collapse").collapse("hide");
  });

  // REVIEWS CAROUSEL
  $(".reviews-carousel").owlCarousel({
    center: true,
    loop: true,
    nav: true,
    dots: false,
    autoplay: true,
    autoplaySpeed: 300,
    smartSpeed: 500,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
        margin: 100,
      },
      1280: {
        items: 2,
        margin: 100,
      },
    },
  });

  // Banner Carousel
  var myCarousel = document.querySelector("#myCarousel");
  var carousel = new bootstrap.Carousel(myCarousel, {
    interval: 1500,
  });

  // REVIEWS NAVIGATION
  function ReviewsNavResize() {
    $(".navbar").scrollspy({ offset: -94 });

    var ReviewsOwlItem = $(".reviews-carousel .owl-item").width();

    $(".reviews-carousel .owl-nav").css({ width: ReviewsOwlItem + "px" });
  }

  $(window).on("resize", ReviewsNavResize);
  $(document).on("ready", ReviewsNavResize);

  // HREF LINKS
  $('a[href*="#"]').click(function (event) {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 74,
          },
          1000
        );
      }
    }
  });
})(window.jQuery);

// Handle Chat Interaction
document
  .getElementById("chatForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const chatInput = document.getElementById("chatInput");
    const chatWindow = document.getElementById("chatWindow");

    // Add user message to chat window
    chatWindow.innerHTML += `<div class="chat-message user"><strong>You:</strong> ${chatInput.value}</div>`;

    // Send message to backend for AI response
    try {
      const response = await fetch("http://localhost:3000/chat", {
        // Replace with your backend URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: chatInput.value }),
      });
      const data = await response.json();
      chatWindow.innerHTML += `<div class="chat-message ai"><strong>AI:</strong> ${data.response}</div>`;
    } catch (error) {
      console.error("Error:", error);
      chatWindow.innerHTML += `<div class="chat-message ai"><strong>AI:</strong> Error processing your message.</div>`;
    }

    // Clear input and scroll to bottom
    chatInput.value = "";
    chatWindow.scrollTop = chatWindow.scrollHeight;
  });
