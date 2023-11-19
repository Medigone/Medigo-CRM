// Copyright (c) 2023, Amine Melizi and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Prescripteurs", {
// 	refresh(frm) {

// 	},
// });

frappe.ui.form.on("Prescripteurs", {
	onload: function(frm) {
		frm.set_query("service", function() {
			return {
				filters: [
					["etablissement", "in", [frm.doc.etablissement]]
				]
			};
		});
	}
});


frappe.ui.form.on('Prescripteurs', {
    nom_prescripteur: function(frm) {
        updateNomCompletPrescripteur(frm);
    },

    prenom_prescripteur: function(frm) {
        updateNomCompletPrescripteur(frm);
    }
});

function updateNomCompletPrescripteur(frm) {
    let nom_prescripteur = frm.doc.nom_prescripteur;
    let prenom_prescripteur = frm.doc.prenom_prescripteur;

    if (nom_prescripteur && prenom_prescripteur) {
        let nom_complet_prescripteur = nom_prescripteur + " " + prenom_prescripteur;
        frm.set_value('nom_complet_prescripteur', nom_complet_prescripteur);
    }
}
