<?php
/**
 * Pagrindinis Pixel Playground temos šablonas
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
  <head>
    <meta charset="<?php bloginfo('charset'); ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <?php wp_head(); ?>
  </head>
  <body <?php body_class('min-h-screen bg-background'); ?>>
    <div id="root"></div>
    <?php wp_footer(); ?>
  </body>
</html>
