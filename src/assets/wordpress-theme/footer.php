    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <!-- Logo & Description -->
                <div class="footer-column">
                    <div class="footer-logo">
                        <img src="<?php echo argashub_get_logo_url(); ?>" alt="<?php bloginfo('name'); ?>">
                    </div>
                    <p class="footer-description">
                        Lietuvos Minecraft serveris su unikalia patirtimi ir draugiška bendruomene.
                    </p>
                    
                    <!-- Social Links -->
                    <div class="social-links mt-lg">
                        <?php if ($discord = get_theme_mod('social_discord')): ?>
                            <a href="<?php echo esc_url($discord); ?>" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                                <i class="fab fa-discord"></i>
                            </a>
                        <?php endif; ?>
                        
                        <?php if ($youtube = get_theme_mod('social_youtube')): ?>
                            <a href="<?php echo esc_url($youtube); ?>" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                <i class="fab fa-youtube"></i>
                            </a>
                        <?php endif; ?>
                        
                        <?php if ($tiktok = get_theme_mod('social_tiktok')): ?>
                            <a href="<?php echo esc_url($tiktok); ?>" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                                <i class="fab fa-tiktok"></i>
                            </a>
                        <?php endif; ?>
                    </div>
                </div>
                
                <!-- Quick Links -->
                <div class="footer-column">
                    <h4 class="footer-title">Nuorodos</h4>
                    <?php
                    if (has_nav_menu('footer')) {
                        wp_nav_menu(array(
                            'theme_location' => 'footer',
                            'container'      => false,
                            'menu_class'     => 'footer-links',
                        ));
                    } else {
                    ?>
                        <ul class="footer-links">
                            <li><a href="#hero">Pradžia</a></li>
                            <li><a href="#about">Apie Mus</a></li>
                            <li><a href="#gallery">Galerija</a></li>
                            <li><a href="#events">Eventai</a></li>
                            <li><a href="#apply">Prisijungti</a></li>
                        </ul>
                    <?php } ?>
                </div>
                
                <!-- Server Info -->
                <div class="footer-column">
                    <h4 class="footer-title">Serveris</h4>
                    <ul class="footer-links">
                        <li>
                            <strong>IP:</strong> 
                            <span id="server-ip-footer"><?php echo esc_html(get_theme_mod('server_ip', 'play.argashub.lt')); ?></span>
                        </li>
                        <li><strong>Versija:</strong> 1.20.x</li>
                        <li><strong>Tipas:</strong> Survival / SMP</li>
                    </ul>
                </div>
                
                <!-- Widget Area -->
                <div class="footer-column">
                    <?php if (is_active_sidebar('footer-1')): ?>
                        <?php dynamic_sidebar('footer-1'); ?>
                    <?php else: ?>
                        <h4 class="footer-title">Kontaktai</h4>
                        <ul class="footer-links">
                            <li><a href="mailto:info@argashub.lt">info@argashub.lt</a></li>
                        </ul>
                    <?php endif; ?>
                </div>
            </div>
            
            <!-- Footer Bottom -->
            <div class="footer-bottom">
                <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. Visos teisės saugomos.</p>
                <p class="mt-sm">Sukurta Lietuvoje 🇱🇹</p>
            </div>
        </div>
        
        <!-- Decorative Blocks -->
        <div class="floating-block" style="bottom: 20%; right: 5%; opacity: 0.3; animation-delay: -1s;"></div>
        <div class="floating-block" style="bottom: 40%; left: 3%; opacity: 0.2; animation-delay: -3s;"></div>
    </footer>

    <?php wp_footer(); ?>
</body>
</html>
