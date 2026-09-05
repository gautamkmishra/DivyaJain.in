/* =========================================================
   DIVYA JAIN — PORTFOLIO INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     REVEAL ON SCROLL
  ======================================================= */

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );


  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });


  /* =======================================================
     HEADER SCROLL EFFECT
  ======================================================= */

  const header = document.querySelector(".site-header");


  const updateHeader = () => {

    if (!header) return;

    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  };


  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    {
      passive: true
    }
  );


  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================= */

  const navLinks = document.querySelectorAll(".main-nav a");

  const navigationSections = [
    "about",
    "services",
    "work",
    "experience",
    "contact"
  ];


  const sectionElements = navigationSections
    .map((id) => document.getElementById(id))
    .filter(Boolean);


  const updateActiveNavigation = () => {

    let currentSection = "";

    const scrollPosition = window.scrollY + 180;


    sectionElements.forEach((section) => {

      if (scrollPosition >= section.offsetTop) {
        currentSection = section.id;
      }

    });


    navLinks.forEach((link) => {

      const href = link.getAttribute("href");

      if (href === `#${currentSection}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }

    });

  };


  window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
      passive: true
    }
  );


  updateActiveNavigation();


  /* =======================================================
     SMOOTH INTERNAL LINKS
  ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const headerHeight =
        header?.offsetHeight || 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        20;


      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });


  /* =======================================================
     ACHIEVEMENT NUMBER ANIMATION
  ======================================================= */

  const achievementNumbers =
    document.querySelectorAll(".achievement-number");


  const animateNumber = (element) => {

    if (element.dataset.animated === "true") {
      return;
    }

    element.dataset.animated = "true";


    const target =
      parseFloat(element.dataset.target);

    const suffix =
      element.dataset.suffix || "";

    const duration = 1300;

    const startTime = performance.now();


    const updateNumber = (currentTime) => {

      const elapsed =
        currentTime - startTime;

      const progress =
        Math.min(elapsed / duration, 1);


      /* Ease-out */
      const eased =
        1 - Math.pow(1 - progress, 3);


      const current =
        target * eased;


      let displayValue;


      if (target % 1 !== 0) {

        displayValue =
          current.toFixed(2);

      } else {

        displayValue =
          Math.floor(current).toString();

      }


      element.textContent =
        displayValue + suffix;


      if (progress < 1) {

        requestAnimationFrame(updateNumber);

      } else {

        element.textContent =
          target + suffix;

      }

    };


    requestAnimationFrame(updateNumber);

  };


  const achievementObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            animateNumber(entry.target);

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.45
      }
    );


  achievementNumbers.forEach((number) => {

    achievementObserver.observe(number);

  });


  /* =======================================================
     POST READER MODAL
  ======================================================= */

  const modal =
    document.getElementById("post-modal");

  const modalContainer =
    modal?.querySelector(".post-modal-container");

  const modalContents =
    modal?.querySelectorAll("[data-post-content]");

  const openButtons =
    document.querySelectorAll(
      "[data-post-target]"
    );

  const closeButtons =
    modal?.querySelectorAll("[data-modal-close]");


  let lastFocusedElement = null;


  const closePostModal = () => {

    if (!modal) return;

    modal.classList.remove("is-open");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "modal-open"
    );


    modalContents?.forEach((content) => {

      content.classList.remove("active");

    });


    if (
      lastFocusedElement &&
      typeof lastFocusedElement.focus === "function"
    ) {

      lastFocusedElement.focus();

    }

  };


  const openPostModal = (postId) => {

    if (!modal || !postId) return;


    const selectedPost =
      document.getElementById(postId);


    if (!selectedPost) return;


    lastFocusedElement =
      document.activeElement;


    modalContents?.forEach((content) => {

      content.classList.remove("active");

    });


    selectedPost.classList.add("active");


    modal.classList.add("is-open");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "modal-open"
    );


    if (modalContainer) {

      modalContainer.scrollTop = 0;

    }


    const closeButton =
      modal.querySelector(".post-modal-close");

    if (closeButton) {

      setTimeout(() => {
        closeButton.focus();
      }, 100);

    }

  };


  openButtons.forEach((button) => {

    button.addEventListener("click", (event) => {

      const postId =
        button.getAttribute(
          "data-post-target"
        );


      if (!postId) return;


      event.preventDefault();

      event.stopPropagation();

      openPostModal(postId);

    });

  });


  closeButtons?.forEach((button) => {

    button.addEventListener("click", () => {

      closePostModal();

    });

  });


  /* =======================================================
     CLOSE MODAL WITH ESC
  ======================================================= */

  document.addEventListener("keydown", (event) => {

    if (
      event.key === "Escape" &&
      modal?.classList.contains("is-open")
    ) {

      closePostModal();

    }

  });


  /* =======================================================
     MODAL KEYBOARD FOCUS
  ======================================================= */

  document.addEventListener("keydown", (event) => {

    if (
      event.key !== "Tab" ||
      !modal?.classList.contains("is-open")
    ) {
      return;
    }


    const focusableElements =
      modal.querySelectorAll(
        'button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );


    if (!focusableElements.length) return;


    const firstElement =
      focusableElements[0];

    const lastElement =
      focusableElements[
        focusableElements.length - 1
      ];


    if (event.shiftKey) {

      if (
        document.activeElement === firstElement
      ) {

        event.preventDefault();

        lastElement.focus();

      }

    } else {

      if (
        document.activeElement === lastElement
      ) {

        event.preventDefault();

        firstElement.focus();

      }

    }

  });


  /* =======================================================
     WORK CARD CLICK
  ======================================================= */

  document
    .querySelectorAll(
      ".post-card"
    )
    .forEach((card) => {

      card.addEventListener(
        "click",
        (event) => {

          /*
            If the user clicked the actual
            Read Sample button, its own
            listener handles the modal.
          */

          if (
            event.target.closest(".post-open")
          ) {
            return;
          }


          const postId =
            card.getAttribute(
              "data-post-target"
            );


          if (postId) {

            openPostModal(postId);

          }

        }
      );

    });


  /* =======================================================
     TOOL HOVER MICRO INTERACTION
  ======================================================= */

  document
    .querySelectorAll(".tool")
    .forEach((tool) => {

      tool.addEventListener(
        "mouseenter",
        () => {

          tool.classList.add(
            "tool-hover"
          );

        }
      );


      tool.addEventListener(
        "mouseleave",
        () => {

          tool.classList.remove(
            "tool-hover"
          );

        }
      );

    });


  /* =======================================================
     MAGNETIC LINKS
  ======================================================= */

  const magneticElements =
    document.querySelectorAll(
      ".header-cta, .hero-link, .contact-link"
    );


  magneticElements.forEach((element) => {

    element.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          element.getBoundingClientRect();


        const x =
          event.clientX -
          rect.left -
          rect.width / 2;


        const y =
          event.clientY -
          rect.top -
          rect.height / 2;


        element.style.transform =
          `translate(${x * 0.08}px, ${y * 0.08}px)`;

      }
    );


    element.addEventListener(
      "mouseleave",
      () => {

        element.style.transform = "";

      }
    );

  });


  /* =======================================================
     FEATURED WORK IMAGE MOVEMENT
  ======================================================= */

  const workCards =
    document.querySelectorAll(
      ".work-feature, .work-secondary"
    );


  workCards.forEach((card) => {

    const visual =
      card.querySelector(
        ".post-image-slot"
      );


    if (!visual) return;


    card.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          card.getBoundingClientRect();


        const x =
          (event.clientX - rect.left) /
          rect.width -
          0.5;


        const y =
          (event.clientY - rect.top) /
          rect.height -
          0.5;


        visual.style.transform =
          `translate(${x * 4}px, ${y * 4}px)`;

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        visual.style.transform = "";

      }
    );

  });


  /* =======================================================
     PAGE LOADED
  ======================================================= */

  requestAnimationFrame(() => {

    document.body.classList.add(
      "page-loaded"
    );

  });


  /* =======================================================
     SAFETY — REMOVE HASH JUMP ON LOAD
  ======================================================= */

  if (
    window.location.hash &&
    window.location.hash.startsWith("#post-")
  ) {

    history.replaceState(
      null,
      "",
      window.location.pathname +
      window.location.search
    );

  }

});
/* =========================================================
   SELECTED WORK — READ SAMPLE SCROLL FIX
   ========================================================= */

document.querySelectorAll(".selected-post .post-open").forEach((button) => {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    const post = this.closest(".selected-post");

    if (!post) return;

    const image = post.querySelector(".selected-post-image");

    if (!image) return;

    image.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });
});
/* =========================================================
   SELECTED WORK — READ SAMPLE
   ========================================================= */

document.querySelectorAll(".selected-post .post-open").forEach((button) => {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    const post = this.closest(".selected-post");

    if (!post) return;

    const image = post.querySelector(".selected-post-image");

    if (!image) return;

    image.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });
});
