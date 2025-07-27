const viewlist = {
  title:true,
  name:true,
  number:true,
  uc:true,
  lc:true,
  sh:true,
  ha:true,
  ba:true,
  hair:true,
  face:true,
  skin:true
}

Object.keys(viewlist).forEach(function(vv){
  ChangeView( vv, false );
});

const BtnView = document.getElementsByClassName('change_view');
for (let i = 0; i < BtnView.length; i++) {
  BtnView[i].setAttribute( "style","border-radius:4px");
  if( BtnView[i].getAttribute("id") != "btn_view_none" && BtnView[i].getAttribute("id") != "btn_view_all" ){
    BtnView[i].style.color = "#555555";
    BtnView[i].style.backgroundColor="#cccccc";
  }
  BtnView[i].addEventListener('click', function() {
    var parts = this.getAttribute("id").slice(9);
    if( parts == "all" || parts == "none" ){
      Object.keys(viewlist).forEach(function(vv){
        ChangeView( vv, parts == "all" );
      });
    }else if( parts in viewlist ){
      ChangeView( parts, !viewlist[parts] );
    }
  });
}

function ChangeView( parts, bView ){
  if( parts in viewlist ){
    viewlist[parts] = bView;
    //document.getElementById( "btn_view_" + parts ).style.border = bView ? "2px solid" : "1px solid";
    document.getElementById( "btn_view_" + parts ).style.color = bView ? "#0000ff" : "#555555";
    document.getElementById( "btn_view_" + parts ).style.backgroundColor = bView ? "#aaaaff" : "#cccccc";
    const list = document.getElementsByClassName( 'list_' + parts );
    for( let i = 0; i < list.length; i++ ){
      list[ i ].setAttribute("style", viewlist[parts] ? "" : "display:none");
    }
  }
}

window.addEventListener( "resize" , function(){
  ResizeList();
});

function ResizeList() {
  var height = window.innerHeight - document.getElementById( "viewmain" ).getBoundingClientRect().height - 64;
  document.getElementById( "partslist" ).setAttribute("style","overflow-x: auto; height:" + height + "px");
}
