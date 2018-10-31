class HuggyApi {
  static addWidget() {
    const huggyTag = document.createElement("script")
    const t =  document.createTextNode("var $_PowerZAP = { defaultCountry: '+55', widget_id: '2361', company: '7593' }; (function(i,s,o,g,r,a,m){ i[r]={context:{id:'d85aceee8cba1d90e6d0e5e0e5c56d5d'}};a=o;o=s.createElement(o); o.async=1;o.src=g;m=s.getElementsByTagName(a)[0];m.parentNode.insertBefore(o,m); })(window,document,'script','https://w-cdn.huggy.io/widget.min.js?v=6.20.0','pwz');")
    huggyTag.appendChild(t)
    document.head.appendChild(huggyTag)
  }
}

 export default HuggyApi;

