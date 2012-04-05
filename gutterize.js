(function () {
  
  self = this;

    selectorsDb = {
        'gigaom.com':{
            "bg":"body",
      "displayAds":"#google_ads_div_GigaOM_ATF_right_300x250, .ads-widget-medium-rectangle, .ads-widget-medium-rectangle-2, .ads-widget-medium-rectangle-3, .ads-widget-medium-rectangle-4"
        },
    'nytimes.com':{ // Bg color is messed up
      "content":"#shell",
      "bg":"fake",
      "displayAds":".singleAd"
    },
    'hypem.com':{ // Nope!
      "content":"#container",
      "bg":"body",
      "displayAds":"#ad-rectangle1, #ad-rectangle21"
    },
    "theregister.co.uk":{ // Great!
      "content":"#page",
      "bg":"body",
      "displayAds":".ad-now"
    },
    "stuff.co.nz":{ // Great
      "content":"#container",
      "bg":"body",
      "displayAds":".right_col_ad"
    },
    "msn.com":{ // Janky
      "content":"#content",
      "bg":"body",
      "displayAds":".advertisement"
    },
    'kbb.com':{ // Great!
      'content':'detect',
      'bg':'body',
      'displayAds':'#adLeaderBox, .mrec, .adBoxContainer'
    }
    }
  
  function getSelectors() {
      var dom = location.hostname;
      if (dom.slice(0,4) == 'www.') dom = dom.slice(4);
      return selectorsDb[dom];
  }
  
    
    base = 'http://topher515.github.com/gutterads/resources/'
    adsDb = {
      'mlb':{
        "left":base+"mlb12_left.jpg",
        "right":base+"mlb12_right.jpg",
        "bg":{"background-color":"white","background-image":"none",background:"white"}
      },
      'tiger':{
        'left':base+'tiger_left.jpg',
        'right':base+'tiger_right.jpg',
        'bg':{"background-color":"#222222","background-image":"none",background:"#222222"}
      }
    };
    
    function getAd() {
        return adsDb.tiger
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
  
  function stripAds() {
    var selectors = getSelectors();
    if (!selectors) return;
    var $displayAds = $(selectors.displayAds);
    $displayAds.each(function(i,elem) {
      stripAd($(elem));
    })
  }
  
  function scoreCandidates(candidates) {
    $c = $(candidates)
    $c.each(function(i,elem) {
      var $el = $(elem)
      elem.gutterize = {score:0}
      
      // Subtract one point for distance from 970px
      elem.gutterize.score -= Math.abs($el.width() - 970);
      
      // Bonus if it has equidistant margins
      var marginDiff = Math.abs(parseInt($el.css('marginLeft')) - parseInt($el.css('marginRight')))
      if (marginDiff < 2) elem.gutterize.score += 150;
      
      // For every pixel taller than 200px, add a point
      elem.gutterize.score += ($el.height() - 200)/2;
    })
    return $c;
  }
  
  function guessContent() {
    // Otherwise try to figure it out.
    candidates = scoreCandidates('div')
    candidates.sort(function(a,b) {
      return b.gutterize.score - a.gutterize.score;
    })
    contentElem = candidates[0];
    return contentElem
  }
  
  
  function findPageElements() {
    var selectors = getSelectors()
    if (selectors) {
      // If we have data on this site then return the bg and content elems
      return {
        'bg':$(selectors.bg),
        'content':$((!selectors.content || selectors.content == 'detect') ? guessContent() : $(selectors.content)[0]),
      }
    } else {
      return {
        'bg':$('body'),
        'content':$(guessContent())
      }
    }
  }
  
    function gutterize() {

    var c = findPageElements()
    , $content = c.content
    , $bg = c.bg
    ;
        
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

    stripAds()

    }
  
  gutterize();
  
  
  //var doc = readability.prepDocument();
  //var art = readability.grabArticle();
  
  
})();
void(0);
