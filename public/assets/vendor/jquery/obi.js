// JavaScript Document

 $(document).ready(function (){
	   //Init Side nav
	   //$('.button-collapse').sideNav();
	   
	   //slider
	   
	   /*$('.slider').slider({
		   indicators: false,
		   height:600,
		   transition:500,
		   interval:6000
		   
		   
		   });*/
		   
		//counter    
		   
	$('.counter-count').each(function () {
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        }, {
            duration: 5000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
		
		
		//scrop to top
		
		$('a[href^="#"]').on('click',function (e) {
        e.preventDefault();

        var target = this.hash ;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 700, 'swing', function () {
            window.location.hash = target;
        });
    });

		
		
    });
	
	 $("a[name='hod']").click(function(){
		//alert("pp");
	     $(".menu").slideToggle(700); 
	})	   
});