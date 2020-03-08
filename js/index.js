$(document).ready(function() {

    //  animation d'écriture
    (function($) {
        $.fn.writeText = function(content) {
            var contentArray = content.split(""),
                current = 0,
                elem = this;
            setInterval(function() {
                if(current < contentArray.length) {
                    elem.text(elem.text() + contentArray[current++]);
                }
            }, 80);
        };

    })(jQuery);

    // texte pour l'animation d'écriture
    $("#holder").writeText("ETUDIANT EN INFORMATIQUE A L'IUT DE MONTPELLIER");

    // initialisation de wow.js
    new WOW().init();



    // initialisation page plein écran

    $('#fullpage').fullpage({
        scrollBar: true,
        responsiveWidth: 400,
        navigation: true,
        navigationTooltips: ['acceuil', 'a propos', 'centres intêrets','parcours','presentation','projet', 'contact', 'réseaux sociaux'],
        anchors: ['acceuil', 'apropos', 'centreinteret', 'parcours','presentation','projet','contact', 'réseauxsociaux'],
        menu: '#myMenu',
        fitToSection: false,

        afterLoad: function ( anchorLink, index){
            var loadedSection = $(this);


            //using index
            if(index==1){
                /* add opacity to arrow */
                $('.fa-chevron-down').each(function(){
                    $(this).css('opacity','1')
                });
                $('.header-links a').each(function(){
                    $(this).css('color','white')
                });
                $('.header-links').css("background-color","transparent");
            }

            else if(index!=1){
                $('.header-links a').each(function(){
                    $(this).css('color','black')
                });
                $('.header-links').css('background-color', 'white');
            }

            //using index
            if(index == 2){

                /* animation barres de compétences */
                $('.skillbar').each(function(){
                    $(this).find('.skillbar-bar').animate({
                        width:jQuery(this).attr('data-percent')
                    },2500);
                });
            }
        }
    });


    // Faire descendre la section
    $(document).on('click', '#moveDown', function(){
        $.fn.fullpage.moveSectionDown();
    });

    // fullpage.js link navigation
    $(document).on('click', '#apropos', function(){
        $.fn.fullpage.moveTo(2);
    });

    $(document).on('click', '#centreinteret', function(){
        $.fn.fullpage.moveTo(3);
    });

    $(document).on('click', '#contact', function(){
        $.fn.fullpage.moveTo(7);
    });

    $(document).on('click', '#parcours', function(){
        $.fn.fullpage.moveTo(4);
    });

    $(document).on('click', '#presentation', function(){
        $.fn.fullpage.moveTo(5);
    });

    $(document).on('click', '#projet', function(){
        $.fn.fullpage.moveTo(6);
    });

    // animation page qui défile à chaque coup de souris
    $(function() {
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 700);
                    return false;
                }
            }
        });
    });

    //ajax form
    $(function() {

        // Get the form.
        var form = $('#ajax-contact');

        // Get the messages div.
        var formMessages = $('#form-messages');

        // Set up an event listener for the contact form.
        $(form).submit(function(e) {
            // Stop the browser from submitting the form.
            e.preventDefault();

            // Serialize the form data.
            var formData = $(form).serialize();

            // Submit the form using AJAX.
            $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })
                .done(function(response) {
                    // Make sure that the formMessages div has the 'success' class.
                    $(formMessages).removeClass('error');
                    $(formMessages).addClass('success');

                    // Set the message text.
                    $(formMessages).text(response);

                    // Clear the form.
                    $('#name').val('');
                    $('#email').val('');
                    $('#message').val('');
                })
                .fail(function(data) {
                    // Make sure that the formMessages div has the 'error' class.
                    $(formMessages).removeClass('success');
                    $(formMessages).addClass('error');

                    // Set the message text.
                    if (data.responseText !== '') {
                        $(formMessages).text(data.responseText);
                    } else {
                        $(formMessages).text('Oops! Une erreur est survenue ! Votre message n\'a pas pu être envoyé.');
                    }
                });

        });

    });

});

