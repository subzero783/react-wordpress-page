<?php 

add_action('wp_enqueue_scripts', 'cashback_react_app');
function cashback_react_app(){
  wp_enqueue_style( 
    'create-react-app', 
    get_stylesheet_directory_uri() . '/page-templates/template-cashback/build/index.css', 
    [], 
    '1.0', 
    'all' 
  );
	wp_enqueue_script(
		'cashback-react-app',
    get_stylesheet_directory_uri() . '/page-templates/template-cashback/build/index.js', // This refer to the built React app
		array('wp-blocks', 'wp-element', 'wp-editor'), //This dependency indicates that you need React at Frontend
		rand(), // This could be changed to the theme version for production
		true
	);
}



function create_ACF_site_options_in_REST() {
  register_rest_route( 
    'ascent/v1', 
    '/sidebar-lorp/', 
    array(
      'methods' => 'GET',
      'callback' => 'expose_ACF_site_options',
    ) 
  );
}

function expose_ACF_site_options(  ) {
  $content = get_field( 'sidebar_lorp', 'option' );
  $data = array('data' => $content);
  return $data;
}

add_action( 'rest_api_init', 'create_ACF_site_options_in_REST' );