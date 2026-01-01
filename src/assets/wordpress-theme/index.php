<?php
/**
 * The main template file
 *
 * @package ArgasHub
 */

get_header();
?>

<main id="main-content" class="site-main">
    
    <!-- Hero Section -->
    <section id="hero" class="hero">
        <div class="hero-background">
            <?php 
            $hero_bg = get_theme_mod('hero_background');
            if ($hero_bg): ?>
                <img src="<?php echo esc_url($hero_bg); ?>" alt="Hero Background">
            <?php else: ?>
                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/hero-bg.png" alt="Hero Background">
            <?php endif; ?>
            <div class="hero-overlay"></div>
        </div>
        
        <!-- Floating blocks -->
        <div class="floating-block" style="top: 20%; left: 10%;"></div>
        <div class="floating-block" style="top: 60%; right: 15%; animation-delay: -2s;"></div>
        <div class="floating-block" style="bottom: 20%; left: 20%; animation-delay: -4s;"></div>
        
        <div class="container">
            <div class="hero-content animate-fade-in-up">
                <h1 class="hero-title">
                    <?php echo wp_kses_post(get_theme_mod('hero_title', 'ARGAS<span class="text-emerald">HUB</span>')); ?>
                </h1>
                <p class="hero-subtitle">
                    <?php echo esc_html(get_theme_mod('hero_subtitle', 'Lietuvos Minecraft serveris su unikalia patirtimi. Prisijunk prie mūsų bendruomenės ir išgyvink nepamirštamų nuotykių!')); ?>
                </p>
                <div class="hero-buttons">
                    <a href="#apply" class="btn btn-primary btn-pixel">
                        <i class="fas fa-gamepad"></i>
                        Prisijungti
                    </a>
                    <button class="btn btn-secondary" onclick="copyServerIP()">
                        <i class="fas fa-copy"></i>
                        <?php echo esc_html(get_theme_mod('server_ip', 'play.argashub.lt')); ?>
                    </button>
                </div>
                
                <!-- Stats -->
                <div class="hero-stats">
                    <div class="stat-item">
                        <div class="stat-number" data-count="<?php echo absint(get_theme_mod('stat_players', 1000)); ?>">0</div>
                        <div class="stat-label">Žaidėjai</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number" data-count="<?php echo absint(get_theme_mod('stat_discord', 500)); ?>">0</div>
                        <div class="stat-label">Discord</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number" data-count="<?php echo absint(get_theme_mod('stat_years', 3)); ?>">0</div>
                        <div class="stat-label">Metai</div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Scroll indicator -->
        <a href="#about" class="scroll-indicator">
            <svg width="24" height="40" viewBox="0 0 24 40" fill="currentColor">
                <path d="M12 0L12 30M12 30L4 22M12 30L20 22" stroke="currentColor" stroke-width="2" fill="none"/>
            </svg>
        </a>
    </section>
    
    <!-- About Section -->
    <section id="about" class="section">
        <div class="container">
            <div class="section-title">
                <h2>Apie <span class="text-emerald">Mus</span></h2>
                <p>Kodėl ArgasHub yra geriausias pasirinkimas</p>
            </div>
            
            <div class="features-grid">
                <div class="card animate-fade-in-up">
                    <div class="card-icon">
                        <i class="fas fa-server"></i>
                    </div>
                    <h3 class="card-title">Stabilus Serveris</h3>
                    <p class="card-description">24/7 veikiantis serveris su minimalia latencija ir maksimaliu našumu.</p>
                </div>
                
                <div class="card animate-fade-in-up delay-100">
                    <div class="card-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <h3 class="card-title">Aktyvi Bendruomenė</h3>
                    <p class="card-description">Draugiška lietuvių bendruomenė, pasiruošusi padėti naujiems žaidėjams.</p>
                </div>
                
                <div class="card animate-fade-in-up delay-200">
                    <div class="card-icon">
                        <i class="fas fa-trophy"></i>
                    </div>
                    <h3 class="card-title">Unikalūs Eventai</h3>
                    <p class="card-description">Reguliarūs renginiai su puikiais prizais ir nepamirštamais nuotykiais.</p>
                </div>
                
                <div class="card animate-fade-in-up delay-300">
                    <div class="card-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <h3 class="card-title">Anti-Cheat Sistema</h3>
                    <p class="card-description">Pažangi apsauga nuo sukčių užtikrina sąžiningą žaidimą visiems.</p>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Gallery Section -->
    <section id="gallery" class="section" style="background: hsl(var(--card));">
        <div class="container">
            <div class="section-title">
                <h2>Galerija</h2>
                <p>Akimirkos iš mūsų serverio</p>
            </div>
            
            <div class="gallery-grid">
                <?php
                $gallery_items = new WP_Query(array(
                    'post_type' => 'gallery_item',
                    'posts_per_page' => 6,
                ));
                
                if ($gallery_items->have_posts()):
                    while ($gallery_items->have_posts()): $gallery_items->the_post();
                ?>
                    <div class="gallery-item">
                        <?php if (has_post_thumbnail()): ?>
                            <?php the_post_thumbnail('large'); ?>
                        <?php endif; ?>
                        <div class="gallery-overlay">
                            <span class="gallery-title"><?php the_title(); ?></span>
                        </div>
                    </div>
                <?php
                    endwhile;
                    wp_reset_postdata();
                else:
                    // Fallback static images
                    $fallback_images = array(
                        array('url' => 'gallery-1.jpg', 'title' => 'Spawn Area'),
                        array('url' => 'gallery-2.jpg', 'title' => 'PvP Arena'),
                        array('url' => 'gallery-3.jpg', 'title' => 'Community Build'),
                        array('url' => 'gallery-4.jpg', 'title' => 'Event Night'),
                    );
                    foreach ($fallback_images as $img):
                ?>
                    <div class="gallery-item">
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/<?php echo esc_attr($img['url']); ?>" alt="<?php echo esc_attr($img['title']); ?>">
                        <div class="gallery-overlay">
                            <span class="gallery-title"><?php echo esc_html($img['title']); ?></span>
                        </div>
                    </div>
                <?php
                    endforeach;
                endif;
                ?>
            </div>
        </div>
    </section>
    
    <!-- Events Section -->
    <section id="events" class="section">
        <div class="container">
            <div class="section-title">
                <h2>Artėjantys <span class="text-emerald">Eventai</span></h2>
                <p>Nepraleisk įdomiausių renginių</p>
            </div>
            
            <div class="events-grid">
                <?php
                $events = new WP_Query(array(
                    'post_type' => 'event',
                    'posts_per_page' => 3,
                    'meta_key' => '_event_date',
                    'orderby' => 'meta_value',
                    'order' => 'ASC',
                    'meta_query' => array(
                        array(
                            'key' => '_event_date',
                            'value' => date('Y-m-d'),
                            'compare' => '>=',
                            'type' => 'DATE',
                        ),
                    ),
                ));
                
                if ($events->have_posts()):
                    while ($events->have_posts()): $events->the_post();
                        $event_date = get_post_meta(get_the_ID(), '_event_date', true);
                        $event_time = get_post_meta(get_the_ID(), '_event_time', true);
                ?>
                    <article class="event-card">
                        <?php if (has_post_thumbnail()): ?>
                            <div class="event-image">
                                <?php the_post_thumbnail('medium_large'); ?>
                            </div>
                        <?php endif; ?>
                        <div class="event-content">
                            <span class="event-date">
                                <i class="fas fa-calendar"></i>
                                <?php echo esc_html(date_i18n('F j, Y', strtotime($event_date))); ?>
                                <?php if ($event_time): ?>
                                    - <?php echo esc_html($event_time); ?>
                                <?php endif; ?>
                            </span>
                            <h3><?php the_title(); ?></h3>
                            <p><?php the_excerpt(); ?></p>
                        </div>
                    </article>
                <?php
                    endwhile;
                    wp_reset_postdata();
                else:
                ?>
                    <div class="card text-center" style="grid-column: 1 / -1;">
                        <p>Šiuo metu nėra planuojamų eventų. Sekite naujienas!</p>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </section>
    
    <!-- Discord Section -->
    <section id="discord" class="discord-section section">
        <div class="container">
            <div class="discord-content">
                <div class="discord-info">
                    <i class="fab fa-discord discord-icon"></i>
                    <h2>Prisijunk prie mūsų <span class="text-emerald">Discord</span></h2>
                    <p>Bendraukite su kitais žaidėjais, gaukite naujienas pirmieji ir dalyvaukite exclusive eventuose!</p>
                    <?php 
                    $discord_url = get_theme_mod('social_discord', 'https://discord.gg/argashub');
                    if ($discord_url): ?>
                        <a href="<?php echo esc_url($discord_url); ?>" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-discord"></i>
                            Prisijungti į Discord
                        </a>
                    <?php endif; ?>
                </div>
                <div class="discord-widget hide-mobile">
                    <!-- Discord widget can be embedded here -->
                    <div class="card">
                        <h4>ArgasHub Discord</h4>
                        <p class="stat-number"><?php echo esc_html(get_theme_mod('stat_discord', '500')); ?>+</p>
                        <p>narių online</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Application Form Section -->
    <section id="apply" class="section">
        <div class="container">
            <div class="section-title">
                <h2>Pateikti <span class="text-emerald">Paraišką</span></h2>
                <p>Užpildyk formą ir tapk ArgasHub dalimi</p>
            </div>
            
            <div class="form-section" style="max-width: 600px; margin: 0 auto;">
                <!-- XP Progress Bar -->
                <div class="xp-bar mb-xl">
                    <div class="xp-bar-fill" id="form-progress" style="width: 0%;"></div>
                    <span class="xp-bar-text">0% Užpildyta</span>
                </div>
                
                <form id="application-form" class="application-form">
                    <?php wp_nonce_field('argashub_nonce', 'application_nonce'); ?>
                    
                    <div class="form-group">
                        <label class="form-label" for="name">Vardas *</label>
                        <input type="text" id="name" name="name" class="form-input" required 
                               placeholder="Tavo vardas">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="email">El. paštas *</label>
                        <input type="email" id="email" name="email" class="form-input" required 
                               placeholder="tavo@email.com">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="minecraft_name">Minecraft Vardas *</label>
                        <input type="text" id="minecraft_name" name="minecraft_name" class="form-input" required 
                               placeholder="Tavo Minecraft IGN">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="age">Amžius</label>
                        <input type="number" id="age" name="age" class="form-input" min="10" max="99" 
                               placeholder="18">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="experience">Minecraft patirtis</label>
                        <select id="experience" name="experience" class="form-select">
                            <option value="">Pasirink...</option>
                            <option value="beginner">Naujokas (< 1 metai)</option>
                            <option value="intermediate">Vidutinis (1-3 metai)</option>
                            <option value="advanced">Patyręs (3+ metai)</option>
                            <option value="expert">Ekspertas (5+ metai)</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="message">Kodėl nori prisijungti?</label>
                        <textarea id="message" name="message" class="form-textarea" rows="4" 
                                  placeholder="Papasakok apie save ir kodėl nori tapti ArgasHub dalimi..."></textarea>
                    </div>
                    
                    <button type="submit" class="btn btn-primary btn-pixel" style="width: 100%;">
                        <i class="fas fa-paper-plane"></i>
                        Siųsti Paraišką
                    </button>
                </form>
                
                <div id="form-message" class="mt-lg text-center" style="display: none;"></div>
            </div>
        </div>
    </section>
    
</main>

<?php get_footer(); ?>
