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
            if (!target) return;
            
            const duration = 2000;
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(easeOutQuart * target);
                
                counter.textContent = current + '+';
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
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
        
        // Update active nav on scroll
        window.addEventListener('scroll', updateActiveNav);
    });

})();
