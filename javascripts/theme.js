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


    // document.write('<script src="https://html2canvas.hertzen.com/dist/html2canvas.js" type="text/javascript" charset="utf-8"></script>');
    // var  JSElement=document.createElement("script");
    //
    // JSElement.setAttribute("type","text/javascript");
    //
    // JSElement.setAttribute("src","https://html2canvas.hertzen.com/dist/html2canvas.js");
    //
    // document.body.appendChild(JSElement);
    //检测甘特图界面
    // if (pathParts.indexOf("gantt") != -1) {
    //
    //   function DownLoadImg(content){
    //     // 格式
    //     var imageType='png';
    //     // 文件名
    //     var fileName=Date.now();
    //     var raw = window.atob(content);
    //     var rawLength = raw.length;
    //     var uInt8Array = new Uint8Array(rawLength);
    //     for(var i = 0; i < rawLength; ++i) {
    //       uInt8Array[i] = raw.charCodeAt(i);
    //     }
    //     var blob = new Blob([uInt8Array], {type:'image/'+imageType});
    //     var aLink = document.createElement('a');
    //     var evt = document.createEvent("HTMLEvents");
    //     evt.initEvent("click", true, true);
    //     aLink.download = fileName;
    //     aLink.href = URL.createObjectURL(blob);
    //     aLink.click();
    //   }
    //   function convert() {
    //     html2canvas(document.getElementById('gantt-table'), {
    //       function(canvas) {
    //         // 创建一个canvas
    //         // document.body.appendChild(canvas);
    //         let dataUrl;
    //         dataUrl=canvas.toDataURL("image/jpeg", 1.0);
    //         DownLoadImg(dataUrl.replace("data:image/jpeg;base64,", ""))
    //       },
    //     });
    //   }
    //
    //   convert();
    // }

    // 动态加载 html2canvas
    function loadScript(url, callback) {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.onload = function() {
        callback();
      };
      document.head.appendChild(script);
    }

// html2canvas 的 CDN 链接
    var html2canvasURL = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.3.2/html2canvas.min.js';
// jsPDF 的 CDN 链接
    var jspdfURL = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';

// 首先加载 html2canvas
    loadScript(html2canvasURL, function() {
      // html2canvas 加载完成后，加载 jsPDF
      loadScript(jspdfURL, function() {
        // 两个库都加载完成后的回调函数
        console.log('html2canvas and jsPDF are loaded.');


      });
    });

    //切分成A4的实现

    if (pathParts.indexOf("gantt") != -1) {

      var link = document.querySelector('a.pdf');
      link.removeAttribute("rel");
      link.removeAttribute("href");
      link.addEventListener('click', function (event){

        html2canvas(document.querySelector(".gantt-table")).then(function(canvas) {
          var imgData = canvas.toDataURL('image/png');

          var canvasWidth = canvas.width;
          var canvasHeight = canvas.height;

          // 定义边距
          var margin = 10;

          // 计算PDF页面的宽度和高度
          var pdfWidth = canvasWidth + 2 * margin;
          var pdfHeight = canvasHeight + 2 * margin;
          var pageHeight = canvasWidth * 0.7;
          var heightLeft = canvasHeight;
          var position = margin;
          var pageIndex =0;
          // 如果甘特图只能填满一页，就塞到一页里面
          if (canvasHeight <= pageHeight) {
            // 创建 PDF 实例
            var pdf = new window.jspdf.jsPDF('l', 'pt',[pdfWidth, pageHeight + 2 * margin]);

            // 添加图像到 PDF，宽度和高度设置为 PDF 页面的宽度和高度减去边距
            pdf.addImage(imgData, 'PNG', margin, margin, pdfWidth - 2 * margin, pdfHeight - 2 * margin );

            // 保存 PDF
            pdf.save('gantt-table.pdf');
          }else{
            var pdf = new window.jspdf.jsPDF('l', 'pt',[pdfWidth, pageHeight + 2 * margin]);

            // 添加图像到 PDF，宽度和高度设置为 PDF 页面的宽度和高度减去边距
            pdf.addImage(imgData, 'PNG', margin, position, pdfWidth - 2 * margin, pageHeight - 2 * margin );
            heightLeft -= pageHeight;
            pageIndex++;
            while (heightLeft >= 0) {
              position = pageIndex * pageHeight * -1 + 10;
              pdf.addPage();
              pdf.addImage(imgData, 'PNG', margin, position, pdfWidth - 2 * margin, pageHeight);
              heightLeft -= pageHeight;
              pageIndex++;
            }
            // 保存 PDF
            pdf.save('gantt-table.pdf');
          }

        });
      });

    }

    //切整页的实现

    // if (pathParts.indexOf("gantt") != -1) {
    //
    //   var link = document.querySelector('a.pdf');
    //   link.removeAttribute("rel");
    //   link.removeAttribute("href");
    //   link.addEventListener('click', function (event){
    //
    //     html2canvas(document.querySelector(".gantt-table")).then(function(canvas) {
    //       var imgData = canvas.toDataURL('image/png');
    //
    //       var canvasWidth = canvas.width;
    //       var canvasHeight = canvas.height;
    //
    //       // 定义边距
    //       var margin = 10;
    //
    //       // 计算PDF页面的宽度和高度
    //       var pdfWidth = canvasWidth + 2 * margin;
    //       var pdfHeight = canvasHeight + 2 * margin;
    //       // 创建 PDF 实例
    //       var pdf = new window.jspdf.jsPDF('', 'pt', [pdfWidth, pdfHeight]);
    //       // 添加图像到 PDF，宽度和高度设置为 PDF 页面的宽度和高度减去边距
    //       pdf.addImage(imgData, 'PNG', margin, margin, pdfWidth - 2 * margin, pdfHeight - 2 * margin);
    //       // 保存 PDF
    //       pdf.save('gantt-table.pdf');
    //     });
    //   });
    //
    // }




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
