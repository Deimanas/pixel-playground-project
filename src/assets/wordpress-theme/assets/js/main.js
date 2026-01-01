/**
 * ArgasHub Theme JavaScript
 * 
 * @package ArgasHub
 * @version 1.0.0
 */

(function($) {
    'use strict';

    // ===========================================
    // Preloader
    // ===========================================
    function hidePreloader() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(function() {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000);
        }
    }

    // ===========================================
    // Mobile Navigation
    // ===========================================
    function initMobileNav() {
        const toggle = document.getElementById('navbar-toggle');
        const menu = document.getElementById('navbar-menu');

        if (toggle && menu) {
            toggle.addEventListener('click', function() {
                menu.classList.toggle('active');
                toggle.classList.toggle('active');
            });

            // Close menu on link click
            const links = menu.querySelectorAll('.navbar-link');
            links.forEach(function(link) {
                link.addEventListener('click', function() {
                    menu.classList.remove('active');
                    toggle.classList.remove('active');
                });
            });
        }
    }

    // ===========================================
    // Smooth Scrolling
    // ===========================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const navbarHeight = document.getElementById('navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===========================================
    // Navbar Scroll Effect
    // ===========================================
    function initNavbarScroll() {
        const navbar = document.getElementById('navbar');
        let lastScrollTop = 0;

        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > 100) {
                navbar.style.background = 'hsl(222 47% 6% / 0.98)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'hsl(222 47% 6% / 0.95)';
                navbar.style.boxShadow = 'none';
            }

            lastScrollTop = scrollTop;
        });
    }

    // ===========================================
    // Animated Counters
    // ===========================================
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        
        const animateCounter = function(counter) {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = function() {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        };

        // Intersection Observer for counters
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(function(counter) {
            observer.observe(counter);
        });
    }

    // ===========================================
    // Form Progress / XP Bar
    // ===========================================
    function initFormProgress() {
        const form = document.getElementById('application-form');
        const progressBar = document.getElementById('form-progress');
        const progressText = progressBar ? progressBar.parentElement.querySelector('.xp-bar-text') : null;

        if (!form || !progressBar) return;

        const requiredFields = form.querySelectorAll('[required]');
        const totalFields = form.querySelectorAll('input, textarea, select').length;

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

    // ===========================================
    // Form Submission (AJAX)
    // ===========================================
    function initFormSubmission() {
        const form = document.getElementById('application-form');
        const messageDiv = document.getElementById('form-message');

        if (!form) return;

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
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
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
                        const progressText = progressBar.parentElement.querySelector('.xp-bar-text');
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
            .catch(function(error) {
                console.error('Error:', error);
                messageDiv.style.display = 'block';
                messageDiv.innerHTML = '<div class="card" style="background: hsl(0 85% 50% / 0.2); border-color: hsl(0 85% 50%);">' +
                    '<p style="color: hsl(0 85% 50%);">Įvyko klaida. Bandykite dar kartą.</p></div>';
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    // ===========================================
    // Copy Server IP
    // ===========================================
    window.copyServerIP = function() {
        const serverIP = document.querySelector('[onclick="copyServerIP()"]');
        if (!serverIP) return;

        const ip = serverIP.textContent.replace(/[^\w.]/g, '').trim();
        
        navigator.clipboard.writeText(ip).then(function() {
            const originalText = serverIP.innerHTML;
            serverIP.innerHTML = '<i class="fas fa-check"></i> Nukopijuota!';
            
            setTimeout(function() {
                serverIP.innerHTML = originalText;
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy:', err);
        });
    };

    // ===========================================
    // Scroll Animations (Intersection Observer)
    // ===========================================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-fade-in-up');

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(function(el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // ===========================================
    // Gallery Lightbox (Simple)
    // ===========================================
    function initGalleryLightbox() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(function(item) {
            item.addEventListener('click', function() {
                const img = item.querySelector('img');
                if (!img) return;

                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.style.cssText = 'position: fixed; inset: 0; background: rgba(0,0,0,0.95); display: flex; align-items: center; justify-content: center; z-index: 9999; cursor: pointer;';
                
                const lightboxImg = document.createElement('img');
                lightboxImg.src = img.src;
                lightboxImg.style.cssText = 'max-width: 90%; max-height: 90%; object-fit: contain;';
                
                lightbox.appendChild(lightboxImg);
                document.body.appendChild(lightbox);
                
                lightbox.addEventListener('click', function() {
                    lightbox.remove();
                });
            });
        });
    }

    // ===========================================
    // Initialize Everything
    // ===========================================
    document.addEventListener('DOMContentLoaded', function() {
        initMobileNav();
        initSmoothScroll();
        initNavbarScroll();
        initCounters();
        initFormProgress();
        initFormSubmission();
        initScrollAnimations();
        initGalleryLightbox();
    });

    window.addEventListener('load', function() {
        hidePreloader();
    });

})(jQuery);
