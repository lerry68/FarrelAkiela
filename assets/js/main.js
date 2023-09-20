/**
* Template Name: Personal
* Updated: Jul 27 2023 with Bootstrap v5.3.1
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
 * Easy on scroll event listener 
 */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function (e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function () {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function () {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });


  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 1000,
    loop: false,
    // autoplay: {
    //   delay: 5000,
    //   disableOnInteraction: false
    // },
    autoplay: false,
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    // let portfolioContainer = select('.portfolio-container');
    // if (portfolioContainer) {
    //   let portfolioIsotope = new Isotope(portfolioContainer, {
    //     itemSelector: '.portfolio-item',
    //     layoutMode: 'fitRows'
    //   });

    //   let portfolioFilters = select('#portfolio-flters li', true);

    //   on('click', '#portfolio-flters li', function (e) {
    //     e.preventDefault();
    //     portfolioFilters.forEach(function (el) {
    //       el.classList.remove('filter-active');
    //     });
    //     this.classList.add('filter-active');

    //     portfolioIsotope.arrange({
    //       filter: this.getAttribute('data-filter')
    //     });
    //   }, true);

    $(document).ready(function () {

      var itemSelector = '.portfolio-item';

      var $container = $('#port').isotope({
        itemSelector: itemSelector,
        masonry: {
          columnWidth: itemSelector,
          isFitWidth: true
        }
      });

      //Ascending order
      var responsiveIsotope = [
        [480, 6],
        [720, 9]
      ];

      var itemsPerPageDefault = 9;
      var itemsPerPage = defineItemsPerPage();
      var currentNumberPages = 1;
      var currentPage = 1;
      var currentFilter = '*';
      var filterAtribute = 'data-filter';
      var pageAtribute = 'data-page';
      var pagerClass = 'isotope-pager';

      function changeFilter(selector) {
        $container.isotope({
          filter: selector
        });
      }

      function goToPage(n) {
        currentPage = n;

        var selector = itemSelector;
        selector += (currentFilter != '*') ? '[' + filterAtribute + '="' + currentFilter + '"]' : '';
        selector += '[' + pageAtribute + '="' + currentPage + '"]';

        changeFilter(selector);
      }

      function defineItemsPerPage() {
        var pages = itemsPerPageDefault;

        for (var i = 0; i < responsiveIsotope.length; i++) {
          if ($(window).width() <= responsiveIsotope[i][0]) {
            pages = responsiveIsotope[i][1];
            break;
          }
        }

        return pages;
      }

      function setPagination() {

        var SettingsPagesOnItems = function () {

          var itemsLength = $container.children(itemSelector).length;

          var pages = Math.ceil(itemsLength / itemsPerPage);
          var item = 1;
          var page = 1;
          var selector = itemSelector;
          selector += (currentFilter != '*') ? '[' + filterAtribute + '="' + currentFilter + '"]' : '';

          $container.children(selector).each(function () {
            if (item > itemsPerPage) {
              page++;
              item = 1;
            }
            $(this).attr(pageAtribute, page);
            item++;
          });

          currentNumberPages = page;

        }();

        var CreatePagers = function () {

          var $isotopePager = ($('.' + pagerClass).length == 0) ? $('<div class="' + pagerClass + '"></div>') : $('.' + pagerClass);

          $isotopePager.html('');

          for (var i = 0; i < currentNumberPages; i++) {
            var $pager = $('<a href="javascript:void(0);" class="pager" ' + pageAtribute + '="' + (i + 1) + '"></a>');
            $pager.html(i + 1);

            $pager.click(function () {
              var page = $(this).eq(0).attr(pageAtribute);
              goToPage(page);
            });

            $pager.appendTo($isotopePager);
          }

          $container.after($isotopePager);

        }();

      }

      setPagination();
      goToPage(1);

      //Adicionando Event de Click para as categorias
      $('.filters a').click(function () {
        var filter = $(this).attr(filterAtribute);
        currentFilter = filter;

        setPagination();
        goToPage(1);


      });

      //Evento Responsivo
      $(window).resize(function () {
        itemsPerPage = defineItemsPerPage();
        setPagination();
      });

    });



    $(document).ready(function () {

      // filter items on button click
      $('.filter-button-group').on('click', 'li', function () {
        var filterValue = $(this).attr('data-filter');

        $('.isotope-pager a').removeClass('active');

        $('.isotope-pager a:first-child').addClass('active');

        $('.grid').isotope({ filter: filterValue });

        $('.filter-button-group li').removeClass('active');

        $(this).addClass('active');
      });
    })


    $(document).ready(function () {
      // set first page to active
      $('.isotope-pager a:first-child').addClass('active');
      // filter items on button click
      $('.isotope-pager').on('click', 'a', function () {
        var filterValue = $(this).attr('data-page');

        $('.isotope-pager a').removeClass('active');
        $(this).addClass('active');
      });
    })
    // }
  });


  // CERTIFICATIONS
  // JavaScript to disable context menu for img elements with the class 'disable-context-menu'
  const disableContextMenuCert = document.querySelectorAll(".cert");

  disableContextMenuCert.forEach(function (img) {
    img.addEventListener("contextmenu", function (e) {
      e.preventDefault(); // Prevent the default context menu behavior for each img element
    });
  });

  $(document).ready(function () {
    $(".cert").fancybox({
      animationEffect: "circular", // Ubah opsi animasi menjadi "fade" atau pilihan lainnya
      animationDuration: 700, // Durasi animasi dalam milidetik
      // Opsi lainnya

      // Add a callback to disable the context menu
      afterLoad: function () {
        $(".fancybox-image").on("contextmenu", function (e) {
          e.preventDefault(); // Prevent the default context menu behavior for images
        });
      },
    });
  });


  // PORTFOLIO

  // PORTFOLIO MODAL
  $(document).ready(function () {
    $(".port").fancybox({
      animationEffect: "circular", // Ubah opsi animasi menjadi "fade" atau pilihan lainnya
      animationDuration: 500, // Durasi animasi dalam milidetik
      // Opsi lainnya

      // Add a callback to disable the context menu
      afterLoad: function () {
        $(".fancybox-image").on("contextmenu", function (e) {
          e.preventDefault(); // Prevent the default context menu behavior for images
        });
      },

      clickContent: function (current, event) {
        if (current.type === "image") {
          return false; // Mencegah penutupan modal saat mengklik gambar
        }
      },

    });
  });

  /**
   * Initiate portfolio details lightbox 
   */
  // const portfolioDetailsLightbox = GLightbox({
  //   selector: '.portfolio-details-lightbox',
  //   width: '90%',
  //   height: '95vh'
  // });

  $(document).ready(function () {
    $("[data-fancybox]").fancybox({
      css: {
        width: '100%',
        height: '100vh',
      },
      slideShow: false,
      animationEffect: 'circular',
      animationDuration: 500,
      arrows: false,
      infobar: false,             // Display infobar with title and index
      toolbar: true,              // Display toolbar with buttons
      buttons: ["close"],  // Toolbar buttons
      idleTime: false,
    });
  });


  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 1500,
    loop: true,
    // autoplay: false,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  // document.addEventListener("DOMContentLoaded", function () {
  //   const lightbox = GLightbox({
  //     // Additional Glightbox options here
  //   });

  //   // Configure Glightbox for the trigger
  //   lightbox.on("open", function () {
  //     lightbox.addElements(document.querySelectorAll(".portfolio-details-lightbox"));
  //   });
  // });

  $(document).ready(function () {
    $("[data-fancybox='inline']").fancybox({
      type: 'inline',
    });
  });

  /**
 * Preloader
 */
  let preload = select('#preloader');
  if (preload) {
    window.addEventListener('load', () => {
      preload.remove()
      document.body.classList.remove('no-scroll');
    });
  }

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

