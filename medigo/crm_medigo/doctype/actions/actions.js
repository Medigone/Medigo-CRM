// Copyright (c) 2023, Amine Melizi and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Actions", {
// 	refresh(frm) {

// 	},
// });
frappe.ui.form.on("Actions", "refresh", function(frm) {
    frm.fields_dict['etablissement'].grid.get_field('service').get_query = function(doc, cdt, cdn) {
        var child = locals[cdt][cdn];
        //console.log(child);
        return {    
            filters:[
                ['etablissement', '=', child.etablissement]
            ]
        }
    }
});