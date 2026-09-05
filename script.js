/* =========================================================
   DIVYA JAIN — PORTFOLIO INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PAGE LOAD
    ===================================================== */

    window.setTimeout(() => {
        document.body.classList.add("page-loaded");
    }, 80);


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".section-label, .about-grid, .stats-grid, " +
        ".services-heading, .service-item, " +
        ".work-heading, .work-card, " +
        ".case-heading, .case-study, " +
        ".achievements-heading, .achievement, " +
        ".experience-heading, .experience-item, " +
        ".tools-heading, .tool, " +
        ".testimonial, .contact-content"
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });


    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );


    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* =====================================================
       STAGGERED REVEALS
    ===================================================== */

    const staggerGroups = [
        ".service-item",
        ".work-card",
        ".case-study",
        ".achievement",
        ".experience-item",
        ".tool"
    ];


    staggerGroups.forEach((selector) => {

        const elements = document.querySelectorAll(selector);

        elements.forEach((element, index) => {

            element.style.transitionDelay =
                `${Math.min(index * 70, 350)}ms`;

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const navigationLinks =
        document.querySelectorAll(".desktop-nav a");

    const sections = document.querySelectorAll(
        "main section[id]"
    );


    const navObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                const currentId = entry.target.id;

                navigationLinks.forEach((link) => {

                    const href =
                        link.getAttribute("href");

                    link.classList.toggle(
                        "active",
                        href === `#${currentId}`
                    );

                });

            });

        },
        {
            rootMargin: "-35% 0px -55% 0px",
            threshold: 0
        }
    );


    sections.forEach((section) => {
        navObserver.observe(section);
    });


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       HEADER SCROLL STATE
    ===================================================== */

    const header =
        document.querySelector(".site-header");


    const updateHeader = () => {

        if (!header) {
            return;
        }

        if (window.scrollY > 40) {

            header.classList.add(
                "is-scrolled"
            );

        } else {

            header.classList.remove(
                "is-scrolled"
            );

        }

    };


    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       TOOL HOVER
    ===================================================== */

    const tools =
        document.querySelectorAll(".tool");


    tools.forEach((tool) => {

        tool.addEventListener(
            "mouseenter",
            () => {
                tool.classList.add("is-hovered");
            }
        );


        tool.addEventListener(
            "mouseleave",
            () => {
                tool.classList.remove("is-hovered");
            }
        );

    });


    /* =====================================================
       WORK CARD MOUSE MOVEMENT
    ===================================================== */

    const workCards =
        document.querySelectorAll(".work-card");


    workCards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (
                    window.matchMedia(
                        "(max-width: 760px)"
                    ).matches
                ) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;


                const rotateX =
                    ((y / rect.height) - 0.5) * -2;

                const rotateY =
                    ((x / rect.width) - 0.5) * 2;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* =====================================================
       MAGNETIC LINKS
    ===================================================== */

    const magneticElements =
        document.querySelectorAll(
            ".header-cta, .primary-link, .text-link"
        );


    magneticElements.forEach((element) => {

        element.addEventListener(
            "mousemove",
            (event) => {

                if (
                    window.matchMedia(
                        "(max-width: 760px)"
                    ).matches
                ) {
                    return;
                }


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
                    `translate(${x * 0.08}px,
                               ${y * 0.08}px)`;

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                element.style.transform = "";

            }
        );

    });


    /* =====================================================
       SERVICE HOVER NUMBER
    ===================================================== */

    const serviceItems =
        document.querySelectorAll(
            ".service-item"
        );


    serviceItems.forEach((item) => {

        const number =
            item.querySelector(".service-number");


        item.addEventListener(
            "mouseenter",
            () => {

                if (!number) {
                    return;
                }

                number.style.color =
                    "#f1f0ec";

            }
        );


        item.addEventListener(
            "mouseleave",
            () => {

                if (!number) {
                    return;
                }

                number.style.color = "";

            }
        );

    });


    /* =====================================================
       EXTERNAL LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[target="_blank"]'
    ).forEach((link) => {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


    /* =====================================================
       EMAIL LINK
    ===================================================== */

    const emailLink =
        document.querySelector(
            '.contact-email[href^="mailto:"]'
        );


    if (emailLink) {

        emailLink.addEventListener(
            "click",
            () => {

                emailLink.classList.add(
                    "is-clicked"
                );


                window.setTimeout(() => {

                    emailLink.classList.remove(
                        "is-clicked"
                    );

                }, 500);

            }
        );

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.querySelector(
            '.site-footer a[href="#home"]'
        );


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       REDUCED MOTION SUPPORT
    ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (prefersReducedMotion.matches) {

        document
            .querySelectorAll(".reveal")
            .forEach((element) => {

                element.classList.add(
                    "is-visible"
                );

            });

    }


    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        "Divya Jain Portfolio — loaded successfully."
    );

});
