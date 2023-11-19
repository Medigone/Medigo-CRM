// Copyright (c) 2023, Amine Melizi and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Services", {
// 	refresh(frm) {

// 	},
// });
frappe.ui.form.on('Services', {
    // Ajoutez un événement de changement pour le champ "Etablissement"
    etablissement: function(frm) {
        // Obtenir la valeur du champ "Etablissement"
        let etablissement = frm.doc.etablissement;

        // Obtenir la valeur du champ "Type Service" (si déjà sélectionné)
        let type_service = frm.doc.type_service;

        // Vérifiez si le champ "Type Service" est sélectionné
        if (type_service) {
            // Concaténer les deux valeurs pour obtenir le champ "Nom"
        
            let nom_service = type_service + " - " + etablissement;
            // Mettre à jour le champ "Nom" dans le formulaire avec la nouvelle valeur
            frm.set_value('nom', nom_service);
        }
    },

    // Ajoutez un événement de changement pour le champ "Type Service"
    type_service: function(frm) {
        // Obtenir la valeur du champ "Type Service"
        let type_service = frm.doc.type_service;

        // Obtenir la valeur du champ "Etablissement" (si déjà sélectionné)
        let etablissement = frm.doc.etablissement;

        // Vérifiez si le champ "Etablissement" est sélectionné
        if (etablissement) {
            // Concaténer les deux valeurs pour obtenir le champ "Nom"
            let nom_service = type_service + " - " + etablissement;

            // Mettre à jour le champ "Nom" dans le formulaire avec la nouvelle valeur
            frm.set_value('nom_service', nom_service);
        }
    }
});