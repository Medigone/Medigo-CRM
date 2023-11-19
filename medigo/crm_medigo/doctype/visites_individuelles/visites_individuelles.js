// Copyright (c) 2023, Amine Melizi and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Visites Individuelles", {
// 	refresh(frm) {

// 	},
// });

frappe.ui.form.on('Visites Individuelles', {
    refresh: function (frm) {
      frm.add_custom_button(__('Début Visite'), function () {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
  
            // Mettre à jour le champ "GPS Début Visite"
            frm.set_value('gps_debut_visite', latitude + ', ' + longitude);
            frm.set_value('status', 'En Cours');
            frappe.msgprint(__('Latitude : {0}, Longitude : {1}', [latitude, longitude]));
          }, function (error) {
            frappe.msgprint(__('Erreur lors de la récupération de la localisation : {0}', [error.message]));
          });
        } else {
          frappe.msgprint(__('La géolocalisation n\'est pas prise en charge par votre navigateur.'));
        }
        
        // Obtenir la date et l'heure actuelles
        var now = new Date();
        var formattedDate = frappe.datetime.str_to_user(now);
        frm.set_value('heure_debut_visite', formattedDate);
      });
      
      frm.add_custom_button(__('Fin Visite'), function () {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
  
            // Mettre à jour le champ "GPS Fin Visite"
            frm.set_value('gps_fin_visite', latitude + ', ' + longitude);
            frm.set_value('status', 'Terminée');
            frappe.msgprint(__('Latitude : {0}, Longitude : {1}', [latitude, longitude]));
          }, function (error) {
            frappe.msgprint(__('Erreur lors de la récupération de la localisation : {0}', [error.message]));
          });
        } else {
          frappe.msgprint(__('La géolocalisation n\'est pas prise en charge par votre navigateur.'));
        }
        
        // Obtenir la date et l'heure actuelles
        var now = new Date();
        var formattedDate = frappe.datetime.str_to_user(now);
        frm.set_value('heure_fin_visite', formattedDate);
      });
    },
  });
  
  

  