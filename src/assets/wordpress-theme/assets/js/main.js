/**
 * ArgasHub Minecraft Theme - Main JavaScript
 * 
 * @package ArgasHub
 * @version 1.0.0
 */

(function() {
    'use strict';

    // ================================================
    // PRELOADER
    // ================================================
    const preloader = document.querySelector('.preloader');
    
    function hidePreloader() {
        if (preloader) {
            preloader.classList.add('explode');
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                document.body.classList.remove('preloader-active');
                
                // Trigger counter animations after preloader
                initCounters();
            }, 500);
        }
    }

    window.addEventListener('load', function() {
        setTimeout(hidePreloader, 1500);
    });

    // ================================================
    // MOBILE NAVIGATION
    // ================================================
    function initMobileNav() {
        const navToggle = document.querySelector('.navbar-toggle');
        const navMenu = document.querySelector('.navbar-nav');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });

            // Close menu on link click
            document.querySelectorAll('.navbar-link').forEach(link => {
                link.addEventListener('click', function() {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });
        }
    }

    // ================================================
    // SMOOTH SCROLL
    // ================================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ================================================
    // ANIMATED COUNTERS
    // ================================================
    function initCounters() {
        const counters = document.querySelectorAll('[data-counter], .stat-number[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-counter') || counter.getAttribute('data-count'));
            const suffix = counter.getAttribute('data-suffix') || '+';
            if (!target) return;
            
            const duration = 2000;
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(easeOutQuart * target);
                
                counter.textContent = current + suffix;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + suffix;
                }
            }
            
            requestAnimationFrame(updateCounter);
        });
    }

    // ================================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ================================================
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll, .animate-fade-in-up').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // ================================================
    // NAVBAR SCROLL EFFECT
    // ================================================
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        let lastScroll = 0;

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (navbar) {
                if (currentScroll > 100) {
                    navbar.classList.add('scrolled');
                    navbar.style.background = 'hsl(222 47% 6% / 0.98)';
                    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
                } else {
                    navbar.classList.remove('scrolled');
                    navbar.style.background = 'hsl(222 47% 6% / 0.95)';
                    navbar.style.boxShadow = 'none';
                }
                
                // Hide/show on scroll
                if (currentScroll > lastScroll && currentScroll > 300) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
            }
            
            lastScroll = currentScroll;
        });
    }

    // ================================================
    // ACTIVE NAV LINK ON SCROLL
    // ================================================
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.navbar-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ================================================
    // COPY TO CLIPBOARD (for server IP)
    // ================================================
    window.copyServerIP = function() {
        const serverIP = document.querySelector('[onclick="copyServerIP()"]');
        if (!serverIP) return;

        const ip = serverIP.textContent.replace(/[^\w.]/g, '').trim();
        
        navigator.clipboard.writeText(ip).then(function() {
            const originalText = serverIP.innerHTML;
            serverIP.innerHTML = '<i class="fas fa-check"></i> Nukopijuota!';
            serverIP.classList.add('copied');
            
            setTimeout(function() {
                serverIP.innerHTML = originalText;
                serverIP.classList.remove('copied');
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy:', err);
        });
    };

    // ================================================
    // BLOCK HOVER EFFECT
    // ================================================
    function initBlockEffects() {
        document.querySelectorAll('.minecraft-block, .card').forEach(block => {
            block.addEventListener('mouseenter', function() {
                this.classList.add('animate-block-bounce');
            });
            
            block.addEventListener('animationend', function() {
                this.classList.remove('animate-block-bounce');
            });
        });
    }

    // ================================================
    // GALLERY LIGHTBOX
    // ================================================
    function initGalleryLightbox() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(function(item) {
            item.addEventListener('click', function() {
                const img = item.querySelector('img');
                if (!img) return;

                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                
                const lightboxImg = document.createElement('img');
                lightboxImg.src = img.src;
                
                lightbox.appendChild(lightboxImg);
                document.body.appendChild(lightbox);
                
                lightbox.addEventListener('click', function() {
                    lightbox.remove();
                });
            });
        });
    }

    // ================================================
    // FORM PROGRESS / XP BAR
    // ================================================
    function initFormProgress() {
        const form = document.getElementById('application-form');
        const progressBar = document.getElementById('form-progress');
        
        if (!form || !progressBar) return;

        const totalFields = form.querySelectorAll('input, textarea, select').length;
        const progressText = progressBar.parentElement?.querySelector('.xp-bar-text');

        const updateProgress = function() {
            let filledFields = 0;

            form.querySelectorAll('input, textarea, select').forEach(function(field) {
                if (field.value.trim() !== '') {
                    filledFields++;
                }
            });

            const progress = Math.round((filledFields / totalFields) * 100);
            progressBar.style.width = progress + '%';
            
            if (progressText) {
                progressText.textContent = progress + '% Užpildyta';
            }
        };

        form.querySelectorAll('input, textarea, select').forEach(function(field) {
            field.addEventListener('input', updateProgress);
            field.addEventListener('change', updateProgress);
        });
    }

    // ================================================
    // FORM SUBMISSION (AJAX)
    // ================================================
    function initFormSubmission() {
        const form = document.getElementById('application-form');
        const messageDiv = document.getElementById('form-message');

        if (!form || typeof argashub_ajax === 'undefined') return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Siunčiama...';
            submitBtn.disabled = true;

            const formData = new FormData(form);
            formData.append('action', 'submit_application');
            formData.append('nonce', argashub_ajax.nonce);

            fetch(argashub_ajax.ajax_url, {
                method: 'POST',
                body: formData,
                credentials: 'same-origin'
            })
            .then(response => response.json())
            .then(data => {
                messageDiv.style.display = 'block';
                
                if (data.success) {
                    messageDiv.innerHTML = '<div class="card" style="background: hsl(142 76% 36% / 0.2); border-color: hsl(142 76% 36%);">' +
                        '<i class="fas fa-check-circle" style="color: hsl(142 76% 36%); font-size: 2rem;"></i>' +
                        '<p style="color: hsl(142 76% 36%); margin-top: 1rem;">' + data.data + '</p></div>';
                    form.reset();
                    
                    // Reset progress bar
                    const progressBar = document.getElementById('form-progress');
                    if (progressBar) {
                        progressBar.style.width = '0%';
                        const progressText = progressBar.parentElement?.querySelector('.xp-bar-text');
                        if (progressText) progressText.textContent = '0% Užpildyta';
                    }
                } else {
                    messageDiv.innerHTML = '<div class="card" style="background: hsl(0 85% 50% / 0.2); border-color: hsl(0 85% 50%);">' +
                        '<i class="fas fa-exclamation-circle" style="color: hsl(0 85% 50%); font-size: 2rem;"></i>' +
                        '<p style="color: hsl(0 85% 50%); margin-top: 1rem;">' + data.data + '</p></div>';
                }

                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            })
            .catch(error => {
                console.error('Error:', error);
                messageDiv.style.display = 'block';
                messageDiv.innerHTML = '<div class="card" style="background: hsl(0 85% 50% / 0.2); border-color: hsl(0 85% 50%);">' +
                    '<p style="color: hsl(0 85% 50%);">Įvyko klaida. Bandykite dar kartą.</p></div>';
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    // ================================================
    // PARTICLE EFFECTS (Ambient)
    // ================================================
    function initParticles() {
        const particleContainer = document.querySelector('.particle-container');
        if (!particleContainer) return;

        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'ambient-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: hsl(142 76% 36% / ${Math.random() * 0.5 + 0.2});
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            `;
            particleContainer.appendChild(particle);
            
            setTimeout(() => particle.remove(), 5000);
        }

        setInterval(createParticle, 500);
    }

    // ================================================
    // HISTORY BOOK NAVIGATION
    // ================================================
    function initHistoryBook() {
        const historyEvents = [
            {
                year: "2019",
                title: "Pradžia",
                description: "Serverio idėjos gimimas ir pirmieji žingsniai",
                image: "https://mc-heads.net/body/MHF_Steve/128",
                color: "emerald",
            },
            {
                year: "2020",
                title: "Pirmasis eventas",
                description: "Hunger Games renginys, kurį laimėjo Dariuscxz",
                image: "https://mc-heads.net/body/MHF_Herobrine/128",
                color: "gold",
            },
            {
                year: "2020",
                title: "Nuotykių žemė",
                description: "Startuoja populiariausias serverio projektas",
                image: "https://mc-heads.net/body/MHF_Alex/128",
                color: "diamond",
            },
            {
                year: "2021",
                title: "Vienuolynas",
                description: "Atidarytas Vienuolyno projektas su nauja patirtimi",
                image: "https://mc-heads.net/body/MHF_Villager/128",
                color: "gold",
            },
            {
                year: "2022",
                title: "Mod-pack'ai",
                description: "Pridėti mod-pack'ai, kurie pagyvino serverio patirtį",
                image: "https://mc-heads.net/body/MHF_Enderman/128",
                color: "redstone",
            },
            {
                year: "2023",
                title: "Bendruomenės augimas",
                description: "Pasiekėme 500+ žaidėjų bendruomenę",
                image: "https://mc-heads.net/body/MHF_Creeper/128",
                color: "emerald",
            },
            {
                year: "2024",
                title: "Nauji horizontai",
                description: "Serveris tęsia savo kelionę su naujomis galimybėmis",
                image: "https://mc-heads.net/body/MHF_Pig/128",
                color: "diamond",
            },
            {
                year: "2025",
                title: "Šiandien",
                description: "Tęsiame kurti nuostabius nuotykius kartu",
                image: "https://mc-heads.net/body/MHF_Skeleton/128",
                color: "gold",
            },
        ];

        let activeIndex = 0;
        
        const prevBtn = document.getElementById('history-prev');
        const nextBtn = document.getElementById('history-next');
        const indicatorsContainer = document.getElementById('page-indicators');
        const characterImg = document.getElementById('history-character');
        const characterFrame = document.getElementById('character-frame');
        const yearBadge = document.getElementById('year-badge');
        const historyTitle = document.getElementById('history-title');
        const historyDescription = document.getElementById('history-description');
        const progressFill = document.getElementById('history-progress-fill');
        
        if (!prevBtn || !nextBtn || !indicatorsContainer) return;

        // Create page indicators
        historyEvents.forEach((event, i) => {
            const indicator = document.createElement('button');
            indicator.className = 'page-indicator';
            indicator.setAttribute('data-index', i);
            indicator.setAttribute('data-color', event.color);
            if (i === 0) indicator.classList.add('active', 'color-' + event.color);
            indicatorsContainer.appendChild(indicator);
            
            indicator.addEventListener('click', () => {
                goToPage(i);
            });
        });

        function updateColors(color) {
            // Update character frame
            characterFrame.className = 'character-frame color-' + color;
            
            // Update year badge
            yearBadge.className = 'year-badge color-' + color;
            
            // Update title
            historyTitle.className = 'history-title color-' + color;
            
            // Update progress bar
            progressFill.className = 'history-progress-fill color-' + color;
            
            // Update indicators
            document.querySelectorAll('.page-indicator').forEach((ind, i) => {
                ind.classList.remove('active', 'color-emerald', 'color-gold', 'color-diamond', 'color-redstone');
                if (i === activeIndex) {
                    ind.classList.add('active', 'color-' + historyEvents[i].color);
                }
            });
        }

        function goToPage(index) {
            activeIndex = index;
            const event = historyEvents[activeIndex];
            
            // Update character with fade effect
            characterImg.style.opacity = '0';
            characterImg.style.transform = 'rotateY(-90deg)';
            
            setTimeout(() => {
                characterImg.src = event.image;
                characterImg.style.opacity = '1';
                characterImg.style.transform = 'rotateY(0)';
            }, 200);
            
            // Update year
            yearBadge.querySelector('span').textContent = event.year;
            
            // Update content with slide effect
            historyTitle.style.opacity = '0';
            historyTitle.style.transform = 'translateX(30px)';
            historyDescription.style.opacity = '0';
            historyDescription.style.transform = 'translateX(30px)';
            
            setTimeout(() => {
                historyTitle.textContent = event.title;
                historyDescription.textContent = event.description;
                historyTitle.style.opacity = '1';
                historyTitle.style.transform = 'translateX(0)';
                historyDescription.style.opacity = '1';
                historyDescription.style.transform = 'translateX(0)';
            }, 200);
            
            // Update progress bar
            const progress = ((activeIndex + 1) / historyEvents.length) * 100;
            progressFill.style.width = progress + '%';
            
            // Update colors
            updateColors(event.color);
        }

        prevBtn.addEventListener('click', () => {
            const newIndex = activeIndex === 0 ? historyEvents.length - 1 : activeIndex - 1;
            goToPage(newIndex);
        });

        nextBtn.addEventListener('click', () => {
            const newIndex = activeIndex === historyEvents.length - 1 ? 0 : activeIndex + 1;
            goToPage(newIndex);
        });

        // Add transition styles
        if (characterImg) {
            characterImg.style.transition = 'opacity 0.2s ease, transform 0.4s ease';
        }
        if (historyTitle) {
            historyTitle.style.transition = 'opacity 0.2s ease, transform 0.4s ease, color 0.3s ease';
        }
        if (historyDescription) {
            historyDescription.style.transition = 'opacity 0.2s ease, transform 0.4s ease';
        }

        // Initialize first page
        goToPage(0);
    }

    // ================================================
    // INITIALIZE EVERYTHING
    // ================================================
    document.addEventListener('DOMContentLoaded', function() {
        initMobileNav();
        initSmoothScroll();
        initNavbarScroll();
        initScrollAnimations();
        initBlockEffects();
        initGalleryLightbox();
        initFormProgress();
        initFormSubmission();
        initParticles();
        initHistoryBook();
        
        // Update active nav on scroll
        window.addEventListener('scroll', updateActiveNav);
    });

})();
