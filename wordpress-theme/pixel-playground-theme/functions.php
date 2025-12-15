<?php
/**
 * Pixel Playground WordPress tema
 */

if (!defined('ABSPATH')) {
    exit;
}

function pixel_playground_enqueue_assets() {
    $theme_dir = get_template_directory();
    $theme_uri = get_template_directory_uri();
    $manifest_path = $theme_dir . '/build/.vite/manifest.json';

    if (!file_exists($manifest_path)) {
        return;
    }

    $manifest = json_decode(file_get_contents($manifest_path), true);

    if (!isset($manifest['index.html'])) {
        return;
    }

    $entry = $manifest['index.html'];

    if (!empty($entry['css']) && is_array($entry['css'])) {
        foreach ($entry['css'] as $index => $css_file) {
            wp_enqueue_style(
                'pixel-playground-style-' . $index,
                $theme_uri . '/build/' . $css_file,
                [],
                null
            );
        }
    }

    if (!empty($entry['file'])) {
        wp_enqueue_script(
            'pixel-playground-app',
            $theme_uri . '/build/' . $entry['file'],
            [],
            null,
            true
        );
    }

    if (!empty($entry['imports'])) {
        foreach ($entry['imports'] as $import) {
            if (isset($manifest[$import]['file'])) {
                wp_enqueue_script(
                    'pixel-playground-import-' . sanitize_title($import),
                    $theme_uri . '/build/' . $manifest[$import]['file'],
                    ['pixel-playground-app'],
                    null,
                    true
                );
            }
        }
    }
}
add_action('wp_enqueue_scripts', 'pixel_playground_enqueue_assets');
