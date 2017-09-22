//select.js
(function($){
  $('select').on('change',function(e){
    e.preventDefault();
    // location = $(this).selected().val();
    var l = $('select').find('option:selected').val();
    console.log(l);
    location = l;
  });//on

})(this.jQuery); 