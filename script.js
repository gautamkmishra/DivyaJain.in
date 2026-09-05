/* =========================================================
   DIVYA JAIN — PORTFOLIO
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".section > *, .service-item, .work-card, .case-study, .achievement, .experience-item, .tool"
    );

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px -50px 0px"
        }
    );


    revealElements.forEach((element) => {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });


    /* =====================================================
       02. ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".desktop-nav a");

    const updateActiveNavigation = () => {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });


        navLinks.forEach((link) => {

            const href = link.getAttribute("href");

            link.classList.remove("active");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =====================================================
       03. ANIMATED ACHIEVEMENT NUMBERS
       ===================================================== */

    const numberElements = document.querySelectorAll(
        ".achievement strong"
    );


    const animateNumber = (element) => {

        const targetText = element.textContent.trim();

        /*
         * Only animate actual numerical values.
         * Placeholder values such as "—" are ignored.
         */

        if (!/\d/.test(targetText)) {
            return;
        }

        const match = targetText.match(
            /^([^\d]*)([\d,.]+)(.*)$/
        );

        if (!match) return;

        const prefix = match[1];
        const number = parseFloat(
            match[2].replace(/,/g, "")
        );
        const suffix = match[3];

        if (Number.isNaN(number)) return;

        const duration = 1500;
        const startTime = performance.now();


        const updateNumber = (currentTime) => {

            const elapsed = currentTime - startTime;

            const progress = Math.min(
                elapsed / duration,
                1
            );

            /*
             * Smooth ease-out curve
             */

            const easedProgress =
                1 - Math.pow(1 - progress, 3);

            const currentValue =
                number * easedProgress;


            element.textContent =
                prefix +
                Math.floor(currentValue).toLocaleString("en-IN") +
                suffix;


            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent =
                    prefix +
                    number.toLocaleString("en-IN") +
                    suffix;
            }

        };


        requestAnimationFrame(updateNumber);

    };


    const numberObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                animateNumber(entry.target);

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.6
        }
    );


    numberElements.forEach((element) => {
        numberObserver.observe(element);
    });


    /* =====================================================
       04. HEADER SCROLL STATE
    ===================================================== */

    const header = document.querySelector(".site-header");

    const handleHeaderScroll = () => {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };


    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );

    handleHeaderScroll();


    /* =====================================================
       05. SMOOTH INTERNAL LINKS
    ===================================================== */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );


    internalLinks.forEach((link) => {

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

            if (!target) return;

            event.preventDefault();


            const headerOffset = 100;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerOffset;


            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       06. TOOL HOVER INTERACTION
    ===================================================== */

    const tools = document.querySelectorAll(".tool");


    tools.forEach((tool) => {

        tool.addEventListener("mouseenter", () => {
            tool.classList.add("tool-hover");
        });

        tool.addEventListener("mouseleave", () => {
            tool.classList.remove("tool-hover");
        });

    });


    /* =====================================================
       07. WORK CARD PARALLAX
    ===================================================== */

    const workCards =
        document.querySelectorAll(".work-card");


    workCards.forEach((card) => {

        const visual =
            card.querySelector(".work-placeholder");

        if (!visual) return;


        card.addEventListener("mousemove", (event) => {

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
                 translateY(-6px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* =====================================================
       08. MAGNETIC PRIMARY LINKS
    ===================================================== */

    const magneticLinks =
        document.querySelectorAll(
            ".primary-link, .header-cta, .contact-email"
        );


    magneticLinks.forEach((link) => {

        link.addEventListener("mousemove", (event) => {

            const rect =
                link.getBoundingClientRect();

            const x =
                event.clientX - rect.left - rect.width / 2;

            const y =
                event.clientY - rect.top - rect.height / 2;


            link.style.transform =
                `translate(${x * 0.08}px, ${y * 0.08}px)`;

        });


        link.addEventListener("mouseleave", () => {

            link.style.transform = "";

        });

    });


    /* =====================================================
       09. PAGE LOADED
    ===================================================== */

    document.body.classList.add("page-loaded");


    /* =====================================================
       10. CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "Divya Jain Portfolio — loaded successfully."
    );

});
