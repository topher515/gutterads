(function () {
	
	self = this;

    selectorsDb = {
        'gigaom.com':{
            "content":"#init-grid-tech",
            "bg":"body",
			"displayAds":".ads-widget-medium-rectangle, .ads-widget-medium-rectangle-2, .ads-widget-medium-rectangle-3, .ads-widget-medium-rectangle-4"
        },
		'nytimes.com':{
			"content":"#shell",
			"bg":"body",
			"displayAds":".singleAd"
		},
		'hypem.com':{
			"content":"#container",
			"bg":"body",
			"displayAds":"#ad-rectangle1, #ad-rectangle21"
		},
		"theregister.co.uk":{
			"content":"#main-content",
			"bg":"body",
			"displayAds":".ad-now"
		},
		"stuff.co.nz":{
			"content":"#container",
			"bg":"body",
			"displayAds":".right_col_ad"
		},
		"msn.com":{
			"content":"#content",
			"bg":"body",
			"displayAds":".advertisement"
		}
    }
    
    base = 'http://localhost/~cwilcox/gutterads/resources/'
    adsDb = {
        'mlb':{
            "left":base+"mlb12_left.jpg",
            "right":base+"mlb12_right.jpg",
			"bg":{"background-color":"white","background-image":"none",background:"white"}
        }
    };
    
    function getAd() {
        return adsDb.mlb
    }
    
	function stripAd($ad) {
		var w = $ad.outerWidth()
		, h = $ad.outerHeight()
		, $placeholder = $('<div>Ad Placeholder</div>')
		;
		$placeholder.css({width:w-2,height:h-2,'background-color':'#ddd',
		border:'1px solid #777','text-align':'center',
		color:'#777'
		})
		$ad.html($placeholder)
	}
	
    function gutterize() {
        var dom = location.hostname;
        if (dom.slice(0,4) == 'www.') dom = dom.slice(4);
        var selectors = selectorsDb[dom];
        

        var $content = $(selectors.content);
        var $bg = $(selectors.bg);
        
        var ad = getAd();
        var $left = $('<div><img src="'+ad.left+'" /></div>');
        var $right = $('<div><img src="'+ad.right+'" /></div>');
        $bg.css(ad.bg)
		if ($content.css('position') != 'absolute') $content.css({position:'relative'})
		
        $left.css({
            position:'absolute',
            right:$content.outerWidth()+'px',
            top:0,
        })
        $right.css({
            position:'absolute',
            left:$content.outerWidth(),
            top:0
        })
        $content.prepend($left, $right);

		var $displayAds = $(selectors.displayAds);
		$displayAds.each(function(i,elem) {
			stripAd($(elem))
		})

    }
	gutterize();
	
})();
void(0);
