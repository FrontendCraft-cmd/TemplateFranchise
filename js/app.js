$(document).ready(function () {
  const heightDevice = $(window).height();

  let top = $(window).scrollTop();

  // Fixed header
  function fixedHeader(top) {
    if (top > heightDevice) {
      $(".header").addClass("fixed");
    } else {
      $(".header").removeClass("fixed");
    }
  }
  fixedHeader(top);

  // Scrolling
  $(".header-menu__link").click(function (e) {
    const hrefId = $(this).attr("href");
    const headerHeight = $(".header").height();

    $("body,html").animate(
      { scrollTop: $(hrefId).offset().top - headerHeight - 30 },
      500,
      function () {}
    );
    e.preventDefault();
  });
  $(".header-mobile-menu__link").click(function (e) {
    const hrefId = $(this).attr("href");

    $(".header-mobile").removeClass("active");
    $("body").removeClass("lock");

    $("body,html").animate(
      { scrollTop: $(hrefId).offset().top - 20 },
      500,
      function () {}
    );
    e.preventDefault();
  });

  $(".footer__link").click(function (e) {
    const hrefId = $(this).attr("href");
    const headerHeight = $(".header").height();

    $(".header-mobile").removeClass("active");
    $("body").removeClass("lock");

    if (hrefId == "#main") {
      $("html, body").animate({ scrollTop: 0 }, 500);
    } else {
      $("body,html").animate(
        { scrollTop: $(hrefId).offset().top - headerHeight - 30 },
        500,
        function () {}
      );
    }

    e.preventDefault();
  });

  //Burger menu
  $(".header__burger").click(function (e) {
    $(".header-mobile").addClass("active");
    $("body").addClass("lock");
    e.preventDefault();
    e.stopPropagation();
  });
  $(".header-mobile__close").click(function (e) {
    $(".header-mobile").removeClass("active");
    $("body").removeClass("lock");
    e.preventDefault();
  });
  $(".header-mobile").click(function (e) {
    e.stopPropagation();
  });
  $(document).click(function (e) {
    if (e.target != $(".header-mobile") && e.target != $(".header__burger")) {
      $(".header-mobile").removeClass("active");
      $("body").removeClass("lock");
    }
  });

  // Reviews
  $(".reviews__item").each(function () {
    const thisItem = $(this);
    const btn = thisItem.find(".reviews__btn");
    const btnText = btn.find("span").text();
    const text = thisItem.find(".reviews__text");
    const originalText = text.text().replace(/\s+/g, " ").split(" ");
    const maxChars = 33;

    if (originalText.length > maxChars) {
      const sliceText = originalText.slice(0, maxChars);
      text.text(sliceText.join(" ") + "...");

      btn.click(function (e) {
        btn.toggleClass("active");

        if (btn.hasClass("active")) {
          btn.find("span").text("Свернуть");
          text.text(originalText.join(" "));
        } else {
          btn.find("span").text(btnText);
          text.text(sliceText.join(" ") + "...");
        }
        e.preventDefault();
      });
    } else {
      btn.hide();
    }
  });

  // Spoiler
  $(".faq__header").click(function () {
    const parent = $(this).closest(".faq__item");
    const btn = parent.find(".faq__btn");

    if (!$(".faq").hasClass("no-one")) {
      $(".faq__body").not($(this).next()).slideUp(300);
      $(".faq__btn").not(btn).removeClass("active");
    }
    btn.toggleClass("active");
    $(this).next().slideToggle(300);
  });

  $(".faq__btn").click(function () {
    const parent = $(this).closest(".faq__item");
    const body = parent.find(".faq__body");

    if (!$(".faq").hasClass("no-one")) {
      $(".faq__btn").not($(this)).removeClass("active");
      $(".faq__body").not(body).slideUp(300);
    }
    $(this).toggleClass("active");
    body.slideToggle(300);
  });

  // Paralax
  function paralax() {
    $(".partners-decor-item").each(function () {
      const movement = $(this).data("movement");
      const translateY = (top * movement) / 100;
      $(this).css("transform", "translateY(" + translateY + "px)");
    });
  }

  // Map
  ymaps.ready(function () {
    if ($("#map").length > 0) {
      const map = new ymaps.Map("map", {
        center: [45.049940437101334, 38.963571822090046],
        zoom: 15,
      });
      map.behaviors.disable("scrollZoom");
      const placemarks = [[45.049940437101334, 38.963571822090046]];

      placemarks.forEach(function (coords) {
        const myPlacemark = new ymaps.Placemark(
          coords,
          {},
          {
            iconLayout: "default#image",
            iconImageHref: "./img/contacts/point.svg",
            iconImageSize: [38, 46],
            iconImageOffset: [-20, -30],
          }
        );
        map.geoObjects.add(myPlacemark);
      });
      map.controls.remove("geolocationControl");
      map.controls.remove("searchControl");
      map.controls.remove("trafficControl");
      map.controls.remove("typeSelector");
      map.controls.remove("rulerControl");
    }
  });

  // Hide mobile menu
  let positionTopFooter = $(".footer").offset().top;
  let positionTopMobileMenu = $(".header").offset().top;

  function hideMobileMenu() {
    if (positionTopMobileMenu >= positionTopFooter) {
      $(".header").addClass("hide");
    } else {
      $(".header").removeClass("hide");
    }
  }
  hideMobileMenu();

  // Modal
  const myModal = new HystModal({
    linkAttributeName: "data-hystmodal",
  });

  // Slider
  $(".format__slider").slick({
    variableWidth: true,
  });

  $(".reviews__slider").slick({
    variableWidth: true,
    nextArrow: $(".reviews .custom-arrow-next"),
    responsive: [
      {
        breakpoint: 639,
        settings: {
          nextArrow: '<button type="button" class="slick-next"></button>',
        },
      },
    ],
  });

  $(".gallery__slider").slick({
    fade: true,
    asNavFor: ".gallery-nav__slider",
  });
  $(".gallery-nav__slider").slick({
    variableWidth: true,
    arrows: false,
    asNavFor: ".gallery__slider",
    focusOnSelect: true,
    infinite: true,
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
  });

  $(".partners__slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
  });

  $(window).scroll(function () {
    top = $(window).scrollTop();
    positionTopFooter = $(".footer").offset().top;
    positionTopMobileMenu = $(".header-mobile").offset().top;
    fixedHeader(top);
    paralax();
    hideMobileMenu();
  });
});

// const calculator = Vue.createApp({
//   data() {
//     return {};
//   },
// });

// calculator.mount("#calculator-vue");
