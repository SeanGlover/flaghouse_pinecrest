$(document).ready(function(){
  document.querySelectorAll('img').forEach(item => {
  item.addEventListener('mouseenter', event => {
    starEntered(item);
  })
})
});
function starEntered(element) {
  StarEnter(element.x, element.y);
}
function StarEnter(x, y) {
    var elem = document.elementFromPoint(x, y)
    // console.log(elem);
    if (elem != null)
    {
        var elemSz = elem.getBoundingClientRect();
        var starId = elem.id;
        var starIndex = parseInt(starId.substring(0, 1));
        for (var i = 1; i <= 5; i++)
        {
            var stars = `#${i}${starId.substring(1, starId.length)}`;
            $(stars).attr("src", "/images/starEmpty.png");
        }
        for (var i = 1; i < starIndex; i++)
        {
            var stars = `#${i}${starId.substring(1, starId.length)}`;
            $(stars).attr("src", `/images/starFill.png`);
        }
        var lastStar = `#${starIndex}${starId.substring(1, starId.length)}`;
        var halfFull = x < elemSz.left + elemSz.width / 2 ? `Half` : `Fill`;
        $(lastStar).attr("src", `/images/star${halfFull}.png`);

        // all stars
        var images = document.getElementsByTagName('img');
        if (images.length > 0)
        {
            var fillPoints = 0;
            var allPoints = 0;
            var bigStars = new Array();
            for (var i = 0; i <= images.length; i++)
            {
                var img = images.item(i);
                if (img != null)
                {
                    var starSz = img.getBoundingClientRect();
                    if (starSz.width == 16) {
                        allPoints++;
                        fillPoints += img.src.includes('Fill') ? 1 : img.src.includes('Half') ? .5 : 0;
                    } else { bigStars.push(img); }
                }
            }
            allPoints = (allPoints == 0 ? 1 : allPoints);
            var avgStars = bigStars.length * (fillPoints / allPoints);
            var fullStars = Math.floor(avgStars);
            //console.log(`Big=${bigStars.length}, Fill=${fillPoints}, All=${allPoints}, Avg=${avgStars}, Full=${fullStars}`);
            for (var i = 0; i < bigStars.length; i++)
            {
                var bigStar = bigStars[i];
                if (bigStar != null) { bigStar.src = `/images/starEmpty.png`; }
            }
            for (var i = 0; i < fullStars; i++)
            {
                var bigStar = bigStars[i];
                if (bigStar != null) {bigStar.src = `/images/starFill.png`; }
            }
            if (avgStars - fullStars >= .5) { bigStars[fullStars].src = `/images/starHalf.png`;}
        }
    }
    return null;
}
function regexMatch(input, pattern) {
  let text = input.toString();
  return text.match(pattern);
}
function roundHalf(x) {
    return Math.ceil(x/.5)*.5;
}
function roundNumber(num, scale) {
  if(!("" + num).includes("e")) {
    return +(Math.round(num + "e+" + scale)  + "e-" + scale);
  } else {
    var arr = ("" + num).split("e");
    var sig = ""
    if(+arr[1] + scale > 0) {
      sig = "+";
    }
    return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
  }
}
function countStars(element) {
  var children = element.children;
  var starCount = 0;
  for (var i = 0; i < children.length; i++) {
    var starChild = children[i];
    var isStar = starChild.getAttribute('alt')=='fill';
    if(isStar){starCount++};
  }
  return starCount;
}
