<?php
function register_my_pattern()
{
    if (function_exists('register_block_pattern')) {
        register_block_pattern(
            'price-box/group/3price box',
            array(
                'title' => 'Regs - Hazem Price Box',
                'description' => '3 ready amazing price boxes',
                'keywords'      => array('price', 'box', 'price box', 'hazem'),
                'content' => '<!-- wp:columns --><div class="wp-block-columns"><!-- wp:column --><div class="wp-block-column"><!-- wp:price-box/group --><div class="price-box-container "><h3 class="price-box-plan-name">Basic</h3><div class="price-tag-wrapper"><p class="price-tag-initial">$20</p><h1 class="price-tag">$50</h1></div><p class="price-description">For small teams or office</p><ul class="price-box-ul"><li>Great support</li><li>Faster times</li><li>More features</li><li>+ 2 more</li></ul><a href="https://www.google.com"><button class="cta-button">Buy Now</button></a></div><!-- /wp:price-box/group --></div><!-- /wp:column --><!-- wp:column --><div class="wp-block-column"><!-- wp:price-box/group {"planName":"Pro"} --><div class="price-box-container "><h3 class="price-box-plan-name">Pro</h3><div class="price-tag-wrapper"><p class="price-tag-initial">$20</p><h1 class="price-tag">$50</h1></div><p class="price-description">For small teams or office</p><ul class="price-box-ul"><li>Great support</li><li>Faster times</li><li>More features</li><li>+ 2 more</li></ul><a href="https://www.google.com"><button class="cta-button">Buy Now</button></a></div><!-- /wp:price-box/group --></div><!-- /wp:column --><!-- wp:column --><div class="wp-block-column"><!-- wp:price-box/group {"planName":"Vip"} --><div class="price-box-container "><h3 class="price-box-plan-name">Vip</h3><div class="price-tag-wrapper"><p class="price-tag-initial">$20</p><h1 class="price-tag">$50</h1></div><p class="price-description">For small teams or office</p><ul class="price-box-ul"><li>Great support</li><li>Faster times</li><li>More features</li><li>+ 2 more</li></ul><a href="https://www.google.com"><button class="cta-button">Buy Now</button></a></div><!-- /wp:price-box/group --></div><!-- /wp:column --></div><!-- /wp:columns -->',
            )
        );
    }
}
add_action('init', 'register_my_pattern');
