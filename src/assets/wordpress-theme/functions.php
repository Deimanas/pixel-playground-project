<?php
/**
 * ArgasHub Theme Functions
 *
 * @package ArgasHub
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Theme Setup
 */
function argashub_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 300,
        'flex-height' => true,
        'flex-width'  => true,
    ));
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    add_theme_support('customize-selective-refresh-widgets');
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'argashub'),
        'footer'  => __('Footer Menu', 'argashub'),
    ));
}
add_action('after_setup_theme', 'argashub_setup');

/**
 * Enqueue Styles and Scripts
 */
function argashub_scripts() {
    // Theme stylesheet
    wp_enqueue_style(
        'argashub-style',
        get_stylesheet_uri(),
        array(),
        wp_get_theme()->get('Version')
    );
    
    // Google Fonts - Inter
    wp_enqueue_style(
        'argashub-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        array(),
        null
    );
    
    // Font Awesome for icons
    wp_enqueue_style(
        'font-awesome',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
        array(),
        '6.4.0'
    );
    
    // Theme JavaScript
    wp_enqueue_script(
        'argashub-script',
        get_template_directory_uri() . '/assets/js/main.js',
        array('jquery'),
        wp_get_theme()->get('Version'),
        true
    );
    
    // Localize script for AJAX
    wp_localize_script('argashub-script', 'argashub_ajax', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce'    => wp_create_nonce('argashub_nonce'),
    ));
}
add_action('wp_enqueue_scripts', 'argashub_scripts');

/**
 * Theme Customizer Settings
 */
function argashub_customize_register($wp_customize) {
    
    // Hero Section
    $wp_customize->add_section('argashub_hero', array(
        'title'    => __('Hero Section', 'argashub'),
        'priority' => 30,
    ));
    
    // Hero Title
    $wp_customize->add_setting('hero_title', array(
        'default'           => 'ARGAS<span class="text-emerald">HUB</span>',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hero_title', array(
        'label'   => __('Hero Title', 'argashub'),
        'section' => 'argashub_hero',
        'type'    => 'text',
    ));
    
    // Hero Subtitle
    $wp_customize->add_setting('hero_subtitle', array(
        'default'           => 'Lietuvos Minecraft serveris su unikalia patirtimi',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hero_subtitle', array(
        'label'   => __('Hero Subtitle', 'argashub'),
        'section' => 'argashub_hero',
        'type'    => 'textarea',
    ));
    
    // Hero Background
    $wp_customize->add_setting('hero_background', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
    ));
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'hero_background', array(
        'label'   => __('Hero Background Image', 'argashub'),
        'section' => 'argashub_hero',
    )));
    
    // Server IP
    $wp_customize->add_setting('server_ip', array(
        'default'           => 'play.argashub.lt',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('server_ip', array(
        'label'   => __('Server IP Address', 'argashub'),
        'section' => 'argashub_hero',
        'type'    => 'text',
    ));
    
    // Stats Section
    $wp_customize->add_section('argashub_stats', array(
        'title'    => __('Statistics', 'argashub'),
        'priority' => 35,
    ));
    
    // Players Count
    $wp_customize->add_setting('stat_players', array(
        'default'           => '1000',
        'sanitize_callback' => 'absint',
    ));
    $wp_customize->add_control('stat_players', array(
        'label'   => __('Total Players', 'argashub'),
        'section' => 'argashub_stats',
        'type'    => 'number',
    ));
    
    // Discord Members
    $wp_customize->add_setting('stat_discord', array(
        'default'           => '500',
        'sanitize_callback' => 'absint',
    ));
    $wp_customize->add_control('stat_discord', array(
        'label'   => __('Discord Members', 'argashub'),
        'section' => 'argashub_stats',
        'type'    => 'number',
    ));
    
    // Experience Years
    $wp_customize->add_setting('stat_years', array(
        'default'           => '3',
        'sanitize_callback' => 'absint',
    ));
    $wp_customize->add_control('stat_years', array(
        'label'   => __('Years Active', 'argashub'),
        'section' => 'argashub_stats',
        'type'    => 'number',
    ));
    
    // Social Links Section
    $wp_customize->add_section('argashub_social', array(
        'title'    => __('Social Links', 'argashub'),
        'priority' => 40,
    ));
    
    // Discord Link
    $wp_customize->add_setting('social_discord', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
    ));
    $wp_customize->add_control('social_discord', array(
        'label'   => __('Discord Invite URL', 'argashub'),
        'section' => 'argashub_social',
        'type'    => 'url',
    ));
    
    // YouTube Link
    $wp_customize->add_setting('social_youtube', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
    ));
    $wp_customize->add_control('social_youtube', array(
        'label'   => __('YouTube Channel URL', 'argashub'),
        'section' => 'argashub_social',
        'type'    => 'url',
    ));
    
    // TikTok Link
    $wp_customize->add_setting('social_tiktok', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
    ));
    $wp_customize->add_control('social_tiktok', array(
        'label'   => __('TikTok Profile URL', 'argashub'),
        'section' => 'argashub_social',
        'type'    => 'url',
    ));
}
add_action('customize_register', 'argashub_customize_register');

/**
 * Custom Walker for Navigation Menu
 */
class ArgasHub_Nav_Walker extends Walker_Nav_Menu {
    public function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
        $classes = empty($item->classes) ? array() : (array) $item->classes;
        $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args, $depth));
        
        $output .= '<li class="' . esc_attr($class_names) . '">';
        
        $atts = array();
        $atts['href'] = !empty($item->url) ? $item->url : '';
        $atts['class'] = 'navbar-link';
        
        $attributes = '';
        foreach ($atts as $attr => $value) {
            if (!empty($value)) {
                $attributes .= ' ' . $attr . '="' . esc_attr($value) . '"';
            }
        }
        
        $output .= '<a' . $attributes . '>' . esc_html($item->title) . '</a>';
    }
}

/**
 * AJAX Handler for Application Form
 */
function argashub_submit_application() {
    // Verify nonce
    if (!wp_verify_nonce($_POST['nonce'], 'argashub_nonce')) {
        wp_send_json_error('Invalid security token');
    }
    
    // Sanitize form data
    $name = sanitize_text_field($_POST['name']);
    $email = sanitize_email($_POST['email']);
    $minecraft_name = sanitize_text_field($_POST['minecraft_name']);
    $age = absint($_POST['age']);
    $message = sanitize_textarea_field($_POST['message']);
    
    // Validate required fields
    if (empty($name) || empty($email) || empty($minecraft_name)) {
        wp_send_json_error('Prašome užpildyti visus privalomus laukus');
    }
    
    // Save as custom post type or send email
    $admin_email = get_option('admin_email');
    $subject = 'Nauja ArgasHub paraiška: ' . $minecraft_name;
    $body = "Vardas: $name\n";
    $body .= "El. paštas: $email\n";
    $body .= "Minecraft vardas: $minecraft_name\n";
    $body .= "Amžius: $age\n";
    $body .= "Žinutė:\n$message";
    
    $sent = wp_mail($admin_email, $subject, $body);
    
    if ($sent) {
        wp_send_json_success('Paraiška sėkmingai išsiųsta!');
    } else {
        wp_send_json_error('Klaida siunčiant paraišką. Bandykite dar kartą.');
    }
}
add_action('wp_ajax_submit_application', 'argashub_submit_application');
add_action('wp_ajax_nopriv_submit_application', 'argashub_submit_application');

/**
 * Register Custom Post Type for Events
 */
function argashub_register_post_types() {
    // Events Post Type
    register_post_type('event', array(
        'labels' => array(
            'name'          => __('Events', 'argashub'),
            'singular_name' => __('Event', 'argashub'),
            'add_new'       => __('Add New Event', 'argashub'),
            'add_new_item'  => __('Add New Event', 'argashub'),
            'edit_item'     => __('Edit Event', 'argashub'),
        ),
        'public'       => true,
        'has_archive'  => true,
        'supports'     => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon'    => 'dashicons-calendar-alt',
        'show_in_rest' => true,
    ));
    
    // Gallery Post Type
    register_post_type('gallery_item', array(
        'labels' => array(
            'name'          => __('Gallery', 'argashub'),
            'singular_name' => __('Gallery Item', 'argashub'),
        ),
        'public'       => true,
        'has_archive'  => false,
        'supports'     => array('title', 'thumbnail'),
        'menu_icon'    => 'dashicons-format-gallery',
        'show_in_rest' => true,
    ));
}
add_action('init', 'argashub_register_post_types');

/**
 * Add Event Meta Boxes
 */
function argashub_add_event_meta_boxes() {
    add_meta_box(
        'event_details',
        __('Event Details', 'argashub'),
        'argashub_event_meta_box_callback',
        'event',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'argashub_add_event_meta_boxes');

function argashub_event_meta_box_callback($post) {
    wp_nonce_field('argashub_event_meta', 'argashub_event_nonce');
    
    $event_date = get_post_meta($post->ID, '_event_date', true);
    $event_time = get_post_meta($post->ID, '_event_time', true);
    ?>
    <p>
        <label for="event_date"><?php _e('Event Date:', 'argashub'); ?></label><br>
        <input type="date" id="event_date" name="event_date" value="<?php echo esc_attr($event_date); ?>">
    </p>
    <p>
        <label for="event_time"><?php _e('Event Time:', 'argashub'); ?></label><br>
        <input type="time" id="event_time" name="event_time" value="<?php echo esc_attr($event_time); ?>">
    </p>
    <?php
}

function argashub_save_event_meta($post_id) {
    if (!isset($_POST['argashub_event_nonce']) || !wp_verify_nonce($_POST['argashub_event_nonce'], 'argashub_event_meta')) {
        return;
    }
    
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if (isset($_POST['event_date'])) {
        update_post_meta($post_id, '_event_date', sanitize_text_field($_POST['event_date']));
    }
    
    if (isset($_POST['event_time'])) {
        update_post_meta($post_id, '_event_time', sanitize_text_field($_POST['event_time']));
    }
}
add_action('save_post_event', 'argashub_save_event_meta');

/**
 * Widget Areas
 */
function argashub_widgets_init() {
    register_sidebar(array(
        'name'          => __('Footer Widget 1', 'argashub'),
        'id'            => 'footer-1',
        'before_widget' => '<div class="footer-widget">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="footer-title">',
        'after_title'   => '</h4>',
    ));
    
    register_sidebar(array(
        'name'          => __('Footer Widget 2', 'argashub'),
        'id'            => 'footer-2',
        'before_widget' => '<div class="footer-widget">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="footer-title">',
        'after_title'   => '</h4>',
    ));
}
add_action('widgets_init', 'argashub_widgets_init');

/**
 * Helper Functions
 */

// Get theme mod with default
function argashub_get_option($key, $default = '') {
    return get_theme_mod($key, $default);
}

// Get custom logo URL
function argashub_get_logo_url() {
    $custom_logo_id = get_theme_mod('custom_logo');
    if ($custom_logo_id) {
        return wp_get_attachment_image_url($custom_logo_id, 'full');
    }
    return get_template_directory_uri() . '/assets/images/logo.png';
}

// Format large numbers (1000 -> 1K)
function argashub_format_number($number) {
    if ($number >= 1000000) {
        return round($number / 1000000, 1) . 'M';
    } elseif ($number >= 1000) {
        return round($number / 1000, 1) . 'K';
    }
    return $number;
}

/**
 * Security Headers
 */
function argashub_security_headers() {
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: SAMEORIGIN');
    header('X-XSS-Protection: 1; mode=block');
}
add_action('send_headers', 'argashub_security_headers');
