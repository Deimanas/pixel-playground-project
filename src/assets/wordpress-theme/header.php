<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php bloginfo('description'); ?>">
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon.png">
    
    <!-- Open Graph / Social Media Meta -->
    <meta property="og:title" content="<?php wp_title('|', true, 'right'); ?><?php bloginfo('name'); ?>">
    <meta property="og:description" content="<?php bloginfo('description'); ?>">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo esc_url(home_url('/')); ?>">
    <meta property="og:image" content="<?php echo get_template_directory_uri(); ?>/assets/images/og-image.png">
    
    <!-- Theme Color -->
    <meta name="theme-color" content="#16a34a">
    
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- Skip to content link for accessibility -->
<a class="screen-reader-text" href="#main-content"><?php _e('Skip to content', 'argashub'); ?></a>

<!-- Preloader -->
<div id="preloader" class="preloader">
    <div class="preloader-content">
        <img src="<?php echo argashub_get_logo_url(); ?>" alt="<?php bloginfo('name'); ?>" class="preloader-logo">
        <div class="preloader-spinner"></div>
    </div>
</div>

<!-- Navigation -->
<header class="navbar" id="navbar">
    <div class="container navbar-container">
        <!-- Logo -->
        <a href="<?php echo esc_url(home_url('/')); ?>" class="navbar-logo">
            <?php if (has_custom_logo()): ?>
                <?php the_custom_logo(); ?>
            <?php else: ?>
                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo.png" alt="<?php bloginfo('name'); ?>">
            <?php endif; ?>
        </a>
        
        <!-- Navigation Menu -->
        <nav class="navbar-nav" id="navbar-menu">
            <?php
            if (has_nav_menu('primary')) {
                wp_nav_menu(array(
                    'theme_location' => 'primary',
                    'container'      => false,
                    'items_wrap'     => '%3$s',
                    'walker'         => new ArgasHub_Nav_Walker(),
                ));
            } else {
                // Default menu items
                ?>
                <li><a href="#hero" class="navbar-link">Pradžia</a></li>
                <li><a href="#about" class="navbar-link">Apie</a></li>
                <li><a href="#gallery" class="navbar-link">Galerija</a></li>
                <li><a href="#events" class="navbar-link">Eventai</a></li>
                <li><a href="#discord" class="navbar-link">Discord</a></li>
                <li><a href="#apply" class="navbar-link">Prisijungti</a></li>
                <?php
            }
            ?>
        </nav>
        
        <!-- Mobile Menu Toggle -->
        <button class="navbar-toggle" id="navbar-toggle" aria-label="Toggle navigation">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </div>
</header>
