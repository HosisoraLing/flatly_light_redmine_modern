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
    var homeLink = document.querySelector('a.home');
    // 修改href属性
    homeLink.href = "/projects/our-home/wiki";
    // $.get("/my/account.json",function (data){
    //   console.log(data);

    // });


    var pathname=window.location.pathname;
    
    if (pathname === "/"){
        window.location.href = "/projects/our-home/wiki";
    }

    pathname.split('/');

    if(pathname[1]==="attachments"){
      $( "#header").css("display", "none");
    }
    if(pathname[1]==="login"){// 创建一个新的 <a> 元素
  const link = document.createElement('a');
  
  // 设置 <a> 元素的属性
  link.href = 'https://www.example.com'; // 替换为你需要的 URL
  link.textContent = 'Example Link'; // 替换为你需要的文本
  
  // 设置 <a> 元素的样式
  link.style.position = 'fixed'; // 固定位置
  link.style.top = '10px'; // 距离顶部 10px
  link.style.right = '10px'; // 距离右边 10px
  link.style.backgroundColor = '#f0f0f0'; // 背景颜色
  link.style.padding = '10px'; // 内边距
  link.style.borderRadius = '5px'; // 圆角
  link.style.boxShadow = '0 0 5px rgba(0,0,0,0.3)'; // 阴影效果
  link.style.zIndex = '1000'; // 确保在最上层显示
  
  // 将 <a> 元素添加到文档的 <body> 元素中
  document.body.appendChild(link);
}
    if (activeStaticSidebar) {
      $( "#content" ).css( "margin-left", "215px" );
      $( "#header" ).css( "margin-left", "215px" );
      $( "#wrapper3" ).css( "margin-left", "215px" );
      $( "#quick-search" ).css( "left", "200px" );
      $( "#top-menu" ).css( "left", "0" );
      $( "#top-menu" ).css( "width", "215px" );
      $( "#top-menu" ).css( "transition", "none" );
      $( "#quick-search" ).css( "transition", "none" );
    }
  })
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
