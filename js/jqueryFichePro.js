// première ligne obligatoire, dit : quand mon doc html est pret, lance la fonction
$(document).ready(function(){
  console.log('Bienvenue dans jquery');


  /*
  ******************************************************************************************************************************************************
  *
  * Ennoncé du formulaire:  Formulaire de Création de Produit Numérique
  * Chapitre: Vérifications par Regex
  *******************************************************************************************************************************************************
  *
  *
  * Formulaire de Création de Produit Numérique
  *
  *

  ***************************************************** Toutes les vérifications pourront se faire à la saisie du texte
  et la bordure sera rouge quand le champs est invalide et vert quand le champs ************************************************************************
  *****************************************************************************************************************************************************************
  *
  *
  *
  * Champs texte "Titre du Produit"
  * Vérification par Regex. : Min. 4 caractères et que des caractères alpha avec espace et tiret compris
  *
  */

//var générales
var titreProduit = /^[A-Z\- ]{4,}$/i;
var acrrocheProduit = /^[a-z0-9\-\. ]{8,}$/i;
var couleurProduit =/^\#[a-z0-9]{3,6}$/i;
var quantiteProduit = /^(([0-9]{1,3})|(1000))$/i;
var numeroSerie = /^([a-z]{2})\-([0-9]{4})\-([a-z]{2})$/i;
var prixHT = /^[0-9]{1,}[\.\,][0-9]{2}\€$/i;
var resumeProduit = /^[a-z\-\.\;\(\)\'\, ]{20,}$/i;
var dateFrancaise = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/i;
var poidsNet = /^[0-9]{1,}(\,|\.)[0-9]{2}kg$/i;
var anneeGarantie = /^[0-5]{1}$/i;
var formatTVA = /^[0-9]{1,2}(\.|\,)[0-9]{1,2}\%$/i;
var fonctionnaliteProduit = /^[^|~µ]+$/;
var checkURLimage = /^(https?)(\:\/\/)(www)?[a-z0-9\.\/\_\-\%]+.(jpg|png|pdf)$/i;
var checkURLvideo = /^(https?)(\:\/\/)(www\.)?(youtube\.com\/|youtu\.be\/|vimeo\.com\/|dai\.ly\/)[a-z0-9\.\/\_\-\%]+$/i;
var companyName = /^[a-z0-9\. ]{3,}$/i;
var companyMail = /^[a-z0-9\.\-\_]+\@[a-z0-9\.\-\_]+\.[a-z0-9\.\-\_]{2,}$/i;
var companyNumber = /^0[0-9][\.\- ]?([0-9]{2}[\.\- ]?){4}$/i;
var companySiren = /^[0-9]{9}$/i;
var CBnumber = /^([0-9]{4}\-){3}([0-9]{4})$/i;
var CBcrypto = /^[0-9]{3}$/i;
var CBDate = /^[0-9]{1,2}[\/\-][0-9]{4}$/i;
var checkURLmanuel = /^(https?)(\:\/\/)(www)?[a-z0-9\.\/\_\-\%]+.(html|pdf)$/i;
var errorArray = [];










/*
*
* Champs texte "Titre du Produit"
* Vérification par Regex. : Min. 4 caractères et que des caractères alpha avec espace et tiret compris
*
*/



  $('form input#TitrePro').blur(function(){
    var elt = $(this)

    // test() permet de tester une regex
    if(titreProduit.test($('input#TitrePro').val())){
      elt.css({
        "border":"1px solid green",
      });

    }else{
      errorArray.push('input#TitrePro');
      elt.css({
        "border":"1px solid red",
      });
      console.log(errorArray);
    }
  }); //end function

/*
  *
  * Champs texte "Accroche du Produit"
  * Vérification par Regex. : Min. 8 caractères et que des caractères alpha-numérique avec espace compris
  *
*/

  $('input#accroPro').blur(function(){
    var elt = $(this);

    if(acrrocheProduit.test($('input#accroPro').val())) {
      elt.css({
        "border":"1px solid green",
      });
      $('input#accroPro').popover("hide");

    }else {
      elt.css({
        "border":"1px solid red",
      });
      $('input#accroPro').popover("show");

    }

  }); //end function

/*
*
* Champs texte" Couleur de produit":  #AA66EE: vérification de la saisie d'une couleur hexadecimal
*
*/

$('input#choixColor').keyup(function(){
  var elt =$(this);

  if (couleurProduit.test($('input#choixColor').val())) {
    elt.css({
      "border":"1px solid green",
    });

  }else {
    elt.css({
      "border":"1px solid red",
    });

  }

}); //end function

/*
*
* Champ texte "Quantité du produit":  La quantité sera vérifié et devra etre comprise entre 1 et 1000 unités
*
*/
$('input#quantity').keyup(function(){
  var elt =$(this);

  if (quantiteProduit.test($('input#quantity').val())) {
    elt.css({
      "border":"1px solid green",
    });

  }else {
    elt.css({
      "border":"1px solid red",
    });

  }
}); //end function

/*
* Livraison Offerte ? Oui ou Non : Boutons Radios.
* Si le bouton Non est coché, faire apparaitre un champs texte "Prix de la Livraison(€)" (voir les fonctions hide() ou show())
*
*/
$('[name="offreLiv"]').click(function(){

  if ($('input#offrLivNok').is(':checked')) {
    $('input#prixOffrLivNok').show();

  }else {
      $('input#prixOffrLivNok').hide();

  }

}); //end function

//obligation de saisi du radio sur focus -> temporaire --- a ajouter plutot au submit
$('input#refProduit').focus(function(){
//console.log("statut Offre Liv" + $('input[name="offreLiv"]:checked').length);

  if ($('input[name="offreLiv"]:checked').length == 0) {
    $('input[name="offreLiv"] + label').css({
      "color":"red",
    });
  }else {
    $('input[name="offreLiv"] + label').css({
      "color":"black",
    });
  }

}); //end function



/*
*
* Payable en 3 fois : Checkbox (facultative)
*
* Retrait OFFERT en magasin: CheckBox (facultative)
*
* Un champs texte "Référence du produit"
* Format: AA-XXXX-BB avec vérification du format (A et B sont des lettres et X des chiffres)
*
*/

$('input#refProduit').keyup(function(){
var elt=$(this);
//console.log(elt.val())

  if (numeroSerie.test($('input#refProduit').val())) {
    elt.css({
      "border":"1px solid green"
    });
  }else {
    errorArray.push('input#refProduit');
    elt.css({
      "border":"1px solid red"
    });
  }

}); //end function


/*
* Champs texte Prix HT(€) avec vérfification du format du prix au format 00.00€
*
*/

$('input#prixHT').keyup(function(){
var elt=$(this);
//console.log(elt.val())

  if (prixHT.test($('input#prixHT').val())) {
    elt.css({
      "border":"1px solid green"
    });
  }else {
    errorArray.push('input#prixHT');
    elt.css({
      "border":"1px solid red"
    });
  }

}); //end function

/*

* Champs zone de saisie "Résumé du produit" avec minimum 10 caractères, que des caracatères alpha avec tiret, point,parenthèses,apostrophe, point-virgule et  espace compris
*
*
*/

$('textarea#resumePro').keyup(function(){
var elt = $(this)
//console.log(elt.val());

if (resumeProduit.test($('textarea#resumePro').val())) {
  elt.css({
    "border":"1px solid green"
  });
}else {
  errorArray.push('textarea#resumePro');
  elt.css({
    "border":"1px solid red"
  });
}

}); // end function

/*
* Boutons radios pour la Capacité Mémoire en Go.: 5Go, 10 Go, 20Go, 50Go, 100Go, 1To, Autre
* Quand je selectionne "Autre", un champs texte apparait pou saisir manuellement la capacité
*
*/
$('[name="stockage"]').click(function(){

  if ($('input#stockaAutre').is(':checked')) {
    $('input#stockaAutreTxt').show();

  }else {
      $('input#stockaAutreTxt').hide();

  }

}); //end function


/*
* Un champs texte "Date de sortie du produit":  à valider et vérifier au format française "JJ/MM/XXXX"

* Bonus: Vérifier que la date de sortie soit ultérieur à aujourd'hui au niveau de l'année
*/

$('input#dateSortie').keyup(function(){
var elt = $(this)
//console.log(elt.val());
var todayUnix = new Date();
// var today = todayUnix.getDate()+"/"+todayUnix.getMonth()+"/"+todayUnix.getFullYear();
var productDay = new Date (elt.val().substr(6,4), elt.val().substr(3,2)-1,elt.val().substr(0,2));
//console.log("essai de date du jour : " + today + " date de sortie :" + productDay);
//console.log(elt.val().substr(0,2), elt.val().substr(3,2));


if (dateFrancaise.test($('input#dateSortie').val()) == false) {
  elt.css({
    "border":"1px solid red"
  });
}else if (productDay < todayUnix) {
  elt.css({
    "border":"1px solid orange"
  });
}else {
  elt.css({
    "border":"1px solid green"
  });
}

}); // end function

/*
* Liste déroulante pour le choix du Transporteur du produit:  UPS, DHL, SoCollissimo,TNT, GLS, FretBay, LaPoste, Point Relay, Autre
* Une des options est obligatoire: nous sommes obligés de selectionner 1 transporteur
* Bonus: Quand je selectionne "Autre", un champs apparait en dessous permettant la saisie manuelle d'un transporteur (voir les fonction hide() et show())
*
*/

$('select#transporteur').blur(function(){
  var elt=$(this);
//console.log(elt.val());

  if ($('select#transporteur').val() == "none") {
    console.log("choisir un transporteur");
    elt.css({
      "border":"1px solid red"
    });

  }else if ($('select#transporteur').val() == "Autre") {

    $('input#transporteurAutre').show();
    elt.css({
      "border":"1px solid green"
    });
  }else {
      $('input#transporteurAutre').hide();
      elt.css({
        "border":"1px solid green"
      });
  }

}); //end function

/*
* Boutons radios "Délai d'Expédition du produit": Expédié sous 24h, Expédié sous 48h.,Expédié sous 5J.,Expédié sous 1 semaine. Autre
* Bonus: Quand je selectionne "Autre", un champs apparait en dessous permettant la saisie manuelle le délai d'expédition (voir les fonction hide() et show())
*
 */

$('input#poidsPro').focus(function(){
// $('input[name="delaiExpe"]').click(function(){
 //console.log($('input[name="delaiExpe"]').val());

   if ($('input[name="delaiExpe"]:checked').length == 0){
     $('input[name="delaiExpe"] + label').css({
       "color":"red",
     });

   }else {
     $('input[name="delaiExpe"] + label').css({
       "color":"black",
     });
   }

}); //end function

$('').click(function(){
   if ($('input[name="delaiExpe"]:checked').length == 0) {
     $('input#expeAutreTxt').show();

   }else {
     $('input#expeAutreTxt').hide();

   }

}); //end function


/*

* Un champs texte Poids Net de format XXX.X Kg.
* Case a cocher en dessous "Prendre en compte le poids du colis": Si je coche cette case, la valeur du Poids Net augmente de 5%.
*
*/

$('input#poidsPro').keyup(function(){
var elt = $(this)

  if (poidsNet.test($('input#poidsPro').val())){
    elt.css({
      "border":"1px solid green"
    });
  }else {
    elt.css({
      "border":"1px solid red"
    });
  }

}); //end function

$('input#poidsProExpe').click(function(){
var poidsHorsExp = $('input#poidsPro').val().substr(0,$('input#poidsPro').val().length - 2);
console.log(poidsHorsExp);

  if ($('input#poidsProExpe').is(':checked')) {
    $('input#poidsPro').val((poidsHorsExp * 1.05).toFixed(2)+"Kg");
  }else {
    $('input#poidsPro').val((poidsHorsExp / 1.05).toFixed(2)+"Kg");
  }

}); //end function



/*
* Boutons radios: Disponible en stocke, Disponible hors-stock, Affichage simple des détails du produit hors-stock
*
*
* Champs texte "Garantie du Produit":  Nb d'année avec la vérification du nombre de 0 à 5 ans
* Zone de saisie de la Ganrantie: Elle doit faire au minimum 15 caractères si le nb d'année est strictement supérieur à 0
*
*/

$('input#garantiePro').keyup(function(){
var elt = $(this)
console.log(elt.val());
  if (anneeGarantie.test($('input#garantiePro').val()) == false){
    elt.css({
      "border":"1px solid red"
    });
  }else if ($('input#garantiePro').val() >= 1) {
    elt.css({
      "border":"1px solid green"
    });
    $('textarea#TxtGarantiePro').show();

  }else {
    elt.css({
      "border":"1px solid green"
    });
    $('textarea#TxtGarantiePro').hide();
  }

}); //end function

/*
*
* Champs texte "Taxe du Produit": Au Format "00.00%"
* Bonus: Quand je quitte le champs Taxe, cela me calcule le prix TTC a partir du Prix HT et de la Taxe (La fonction val() peut aussi modifier une valeur d'un input...)
*
* Champs texte Prix TTC avec TVA inclue au format XX.XX€
* Bonus: Quand je quitte la saisie de ce champs, le symbole € est mis à la fin du prix
*
*
*/

$('input#tauxTVA').keyup(function(){
  var elt = $(this)
//  console.log(elt.val());

  if (formatTVA.test($('input#tauxTVA').val())) {
    elt.css({
      "border":"1px solid green"
    });
  }else {
    elt.css({
      "border":"1px solid red"
    });
  }

});  //end function

$('input#tauxTVA').blur(function(){
  var tauxTVA = parseFloat($('input#tauxTVA').val().substr(0,$('input#tauxTVA').val().length - 1))
  var prixHorsTaxe = parseFloat($('input#prixHT').val().substr(0,$('input#prixHT').val().length - 1))

  $('input#prixTTC').val(((prixHorsTaxe * tauxTVA)/100 + prixHorsTaxe).toFixed(2) + "€")
  console.log(tauxTVA);
  console.log(prixHorsTaxe);

}); //end function

/*
*
* Zone de saisie "Fonctionnalités du Produit (Fiche Techniques)": : Minimum 20 caractères avec prise en comptes des balises HTML <p> <h1><h3> ...
*
*/

$('textarea#fonctionPro').keyup(function(){
  var elt = $(this);

  if (fonctionnaliteProduit.test($('textarea#fonctionPro').val()) && $('textarea#fonctionPro').val().length > 20){
    elt.css({
      "border":"1px solid green"
    });
  }else {
    elt.css({
      "border":"1px solid red"
    });
  }

}); //end function

/*
*
* Champ texte  "Url d'image du produit": à valider du format  d'URL distante  "http://www.....jpg" avec validation de l'extension .jpg ou .jpeg ou .png
* Bonus: Quand je quitte le champs, une prévisualisation de l'image produit est affiché en dessous
*
*/

$('input#lienImage').blur(function(){
var elt = $(this);
  if (checkURLimage.test($('input#lienImage').val())) {
    console.log("if OK");
    elt.css({
      "border":"1px solid green"
    });
    $('img#photoProPreview').fadeIn("slow").attr({
      "src": elt.val(),
      "alt": elt.val()
    })

  }else {
    elt.css({
      "border":"1px solid red"
    });
    $('img#photoProPreview').fadeOut();
  }

}); //end function

/*
* Champ texte  "Url de vidéo de démonstration": Validation d'une iframe <iframe> en provenance des plateformes  avec URL distante sur Youtube, Dailymotion ou Vimeo
* Bonus: Quand je quitte le champs, une prévisualisation de l'iframe produit est affiché en dessous
*
*/

$('input#lienVideo').blur(function(){
var elt=$(this)
//console.log(elt.val());
if (checkURLvideo.test($('input#lienVideo').val())) {
  console.log("if OK");
  elt.css({
    "border":"1px solid green"
  });
  $('div#containerVideo').fadeIn("slow")
  $('<iframe width="420" height="315" src="https://www.youtube.com/embed/Uttc2ffl7G4" frameborder="0"></iframe>').replaceAll('iframe#iframeVideo')


}else {
  elt.css({
    "border":"1px solid red"
  });
  $('div#containerVideo').fadeOut();
}

}); //end function

/*
*
* Liste de case à cocher sur la "Distribution du produit": Carrefour, Auchan, Leclerc, Boulanger, Fnac, Amazon, Vente Privée, CDiscount, Le Bon Coin.
*
*
* Information de la Société:
*
* Nom: champs texte (min 3 caractères alpha-numérique avec point compris)
*/
$('input#nomSociete').keyup(function(){
var elt = $(this)
// console.log("toto");
  if (companyName.test($('input#nomSociete').val())){
    elt.css({
      "border":"1px solid green"
    });
  }else {
    elt.css({
      "border":"1px solid red"
    });
  }

}); //end function


/*
* Email: Champs texte à valider au niveau du format
*/

$('input#mailSociete').keyup(function(){
var elt = $(this)
// console.log("toto");
  if (companyMail.test($('input#mailSociete').val())){
    elt.css({
      "border":"1px solid green"
    });
  }else {
    elt.css({
      "border":"1px solid red"
    });
  }

}); //end function

/*
* Telephone : Champos texte à valider  au niveau du format
*/

$('input#telSociete').keyup(function(){
var elt = $(this)
// console.log("toto");
  if (companyNumber.test($('input#telSociete').val())){
    elt.css({
      "border":"1px solid green"
    });
  }else {
    elt.css({
      "border":"1px solid red"
    });
  }

}); //end function



/*
* Num. SIREN de l'entreprise à valider avec une regex
* Coordonnées bancaire du responsable de la Société:
*
*/
$('input#sirenSociete').keyup(function(){
var elt = $(this)
// console.log("toto");
  if (companySiren.test($('input#sirenSociete').val())){
    elt.css({
      "border":"1px solid green"
    });
  }else {
    elt.css({
      "border":"1px solid red"
    });
  }

}); //end function

/*
* Numéro 16 chiffres avec XXXX-XXXX-XXXX-XXXX
*/
$('input#numeroCB').keyup(function(){
var elt = $(this)
// console.log("toto");
  if (CBnumber.test($('input#numeroCB').val())){
    elt.css({
      "border":"1px solid green"
    });
  }else {
    elt.css({
      "border":"1px solid red"
    });
  }

}); //end function

/*
* Cryptogramme Visuel: XXX
*/
$('input#cryptoCB').keyup(function(){
var elt = $(this)
// console.log("toto");
  if (CBcrypto.test($('input#cryptoCB').val())){
    elt.css({
      "border":"1px solid green"
    });
  }else {
    elt.css({
      "border":"1px solid red"
    });
  }

}); //end function

/*
* Date d'expiration MM/AA
*
*/

$('input#dateCB').blur(function(){
var elt = $(this)
//console.log("totototo");
var todayDateCB = new Date();
var dateREFmini = new Date(todayDateCB.getFullYear(),todayDateCB.getMonth())
var userCB = new Date (elt.val().substr(3,4), elt.val().substr(0,2)-1);

// console.log("date ref mini  :  " + dateREFmini + " date user cb  :  " + userCB);

if (CBDate.test($('input#dateCB').val()) == false) {
  elt.css({
    "border":"1px solid red"
  });
}
else if (userCB < dateREFmini) {
  elt.css({
    "border":"1px solid orange"
  });
}else {
  elt.css({
    "border":"1px solid green"
  });
}


}); //end function

/*
*
* Champ texte du "Manuel d'Utilisation": a valider au format d'une URL à extension .html, .doc, .docx ou format.pdf
*
*/
$('input#lienManuel').blur(function(){
var elt = $(this);
  if (checkURLmanuel.test($('input#lienManuel').val())) {
    console.log("if OK");
    elt.css({
      "border":"1px solid green"
    });
  }else {
    elt.css({
      "border":"1px solid red"
    });
  }

}); //end function

/*

*
* Checbox Obligatoire: J'accèpte les Conditions Générales de Ventes CGV
*
* Checbox Obligatoire: j'accèpte les Conditions Générales d'Utilisation CGU du site
*
*
* Boutton de type button "Créer le produit"
* Quand je clique dessus, je dois vérifier la valifité du Nom, de la référéncene, du Prix et du résumé ainsi que les 2 checkbox CGU et CGV soit
* bien cochées (trigger)
*
*
*/
$('button#creaProduit').click(function(){
  $('form input#TitrePro').trigger("blur");
  $('textarea#resumePro').trigger("keyup");
  $('input#prixHT').trigger("keyup");
  $('input#refProduit').trigger("keyup");
  if ($('input#cgvOk').is(':checked') && $('input#CGUok').is(':checked') && errorArray.length == 0) {
    console.log("toto");
  }else {
    console.log("titi");
    alert("Certains champs obligatoires ne sont pas remplis ( " + errorArray + " )")
  }

});



/*
****************************************************************************************************************************************************************
*
*
* Bonus: Un boutton "Prévisualiser le produit" ou quand je clique, j'ai le Récapitulatif Intégral des Informations saisi ci-dessus
* Bonus : Afficher la prévisualisation de la couleur une fois saisie
* Bonus: Affiher lors de la saisie de la CB si c'est une VISA, MASTERCARD etc... et verifier si la CB n'est pas expirée lors de la saison de la date d'expiration
* Bonus: Ajouter une progress bar sur la progression du remplissage de l'ensemnle des champs du formulaire
* Bonus: Pour toutes les vérifications sur chaque champs,
* Si elles sont fausses, en plus d'avoir une bordure rouge du le champs, ajouter un text d'erreur en dessous du champs pour etre plus explicite sur l'erreur
*/


















































































































































}); //end jQuery
