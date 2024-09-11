( function( window ) {

  'use strict';
  /* set true to enable static sidebar */
  var activeStaticSidebar = true

  function classReg( className ) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
  }

  var hasClass, addClass, removeClass;

  if ( 'classList' in document.documentElement ) {
    hasClass = function( elem, c ) {
      return elem.classList.contains( c );
    };
    addClass = function( elem, c ) {
      elem.classList.add( c );
    };
    removeClass = function( elem, c ) {
      elem.classList.remove( c );
    };
  }
  else {
    hasClass = function( elem, c ) {
      return classReg( c ).test( elem.className );
    };
    addClass = function( elem, c ) {
      if ( !hasClass( elem, c ) ) {
        elem.className = elem.className + ' ' + c;
      }
    };
    removeClass = function( elem, c ) {
      elem.className = elem.className.replace( classReg( c ), ' ' );
    };
  }

  function toggleClass( elem, c ) {
    var fn = hasClass( elem, c ) ? removeClass : addClass;
    fn( elem, c );
  }

  window.classie = {
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass,
    has: hasClass,
    add: addClass,
    remove: removeClass,
    toggle: toggleClass
  };

  function addElements (){
    $( '<div id="menu"><div class="burger"><div class="one"></div><div class="two"></div><div class="three"></div></div><div class="circle"></div></div>' ).insertBefore( $( "#top-menu" ) );
    var menuLeft = document.getElementById( 'top-menu' ),
        showLeft = document.getElementById( 'menu' ),
        body = document.body,
        search = document.getElementById( 'quick-search' ),
        menuButton = document.getElementById( 'menu' );

    showLeft.onclick = function() {
      classie.toggle( this, 'active' );
      classie.toggle( body, 'menu-push-toright' );
      classie.toggle( menuButton, 'menu-push-toright' );
      if (search != null) {
        classie.toggle( search, 'menu-push-toright' );
      }
      classie.toggle( menuLeft, 'open' );
    };
  }
  if (!activeStaticSidebar) {
    $(document).ready(addElements)
  }
  function addLogo () {
    $( "#loggedas" ).prepend( "<div class='redmine-logo'></div>" );
    // body...
  }
  $(document).ready(addLogo)

  $(window).on("load",function() {
    $( "#quick-search form" ).css('margin-right', $( "#s2id_project_quick_jump_box" ).width() + 60);
    $( 'input[name$="q"]' ).attr( 'placeholder','Enter Search Text' );
    // 选择class为"home"的<a>元素

    // $.get("/my/account.json",function (data){
    //   console.log(data);

    // });


  var pathname = window.location.pathname;
    console.log("Current pathname:", pathname);

    // 检查是否为根路径
    if (pathname === "/") {
        window.location.href = "/projects/our-home/wiki";
    }

    // 拆分路径
    var pathParts = pathname.split('/');

    // 检查路径的第二个部分是否为 "attachments"
    if (pathParts[1] === "attachments" || pathParts[1] === "onlyoffice") {
        $("#header").css("display", "none");
    }
    //检测甘特图界面
    if ( ((pathParts[1] === "projects") && (pathParts[3] === "issues")&& (pathParts[4] === "gantt")) || ((pathParts[1] === "issues") && (pathParts[2] === "gantt"))) {

      <script type="text/javascript" src="html2canvas.js"></script>
      <script type="text/javascript" src="FileSaver.js"></script>

      function convert() {
        html2canvas(document.getElementById('gantt-table'), {
          function(canvas) {
            // 创建一个canvas
            // document.body.appendChild(canvas);
            let dataUrl;
            dataUrl=canvas.toDataURL("image/jpeg", 1.0);
            DownLoadImg(dataUrl.replace("data:image/jpeg;base64,", ""))
          },
        });
      }

      convert();
    }


    // 修改主页链接
    var homeLink = document.querySelector('a.home');
    if (homeLink) {
        homeLink.href = "/projects/our-home/wiki";
    }

    // 检查并设置侧边栏样式
    if (activeStaticSidebar) {
        $("#content").css("margin-left", "215px");
        $("#header").css("margin-left", "215px");
        $("#wrapper3").css("margin-left", "215px");
        $("#quick-search").css("left", "200px");
        $("#top-menu").css("left", "0");
        $("#top-menu").css("width", "215px");
        $("#top-menu").css("transition", "none");
        $("#quick-search").css("transition", "none");
    }})
  $( document ).on( "click", "#main, #header", function() {
    $( "#top-menu" ).removeClass( "open" );
    $( ".menu-push-toright" ).removeClass( "menu-push-toright" );
  });
  window.onerror = function myErrorFunction(message, url, linenumber) {
    if (location.href.indexOf("/dmsf") != -1 || location.href.indexOf("/master_backlog") != -1){
      $(document).ready(addLogo)
      if (!activeStaticSidebar) {
        $(document).ready(addElements)
      }
    }
  };

  function removeRule() {
    if(typeof window.CSSMediaRule !== "function")
      return false; //Your browser doesn't support media query feature

    var s = document.styleSheets, r,
        i, j, k;

    if(!s) return false; //no style sheets found

    // walk throuth css sheets
    for(i=0; i<s.length; i++) {
      // get all rules
      r = s[i].cssRules;
      if(!r) continue;

      for(j=0; j<r.length; j++) {
        //If there's a rule for media query
        if(r[j] instanceof CSSMediaRule &&
            r[j].media.mediaText == "screen and (max-width: 899px)") {
          for(k=0; k<r[j].cssRules.length; k++) {
            // remove all rules of it
            r[j].deleteRule(r[j].cssRules[k]);
          }
          return true;
        }
      }
    }
  }
  removeRule();
})( window );
