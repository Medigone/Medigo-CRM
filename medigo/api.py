import frappe
from frappe import auth
from frappe.model.document import Document

# Déplacez la fonction generate_keys au-dessus de la fonction login
def generate_keys(user):
    user_details = frappe.get_doc('User', user)
    api_secret = frappe.generate_hash(length=15)

    if not user_details.api_key:
        api_key = frappe.generate_hash(length=15)
        user_details.api_key = api_key

    user_details.api_secret = api_secret
    user_details.save()

    return api_secret

@frappe.whitelist(allow_guest=True)
def login(usr, pwd):
    try:
        login_manager = frappe.auth.LoginManager()
        login_manager.authenticate(user=usr, pwd=pwd)
        login_manager.post_login()
    except frappe.exceptions.AuthenticationError:
        frappe.clear_messages()
        frappe.local.response["message"] = {
            "success_key": 0,
            "message": "Erreur Authentification!"
        }
        return

    # Déplacez ces lignes à l'intérieur de la fonction login
    api_generate = generate_keys(frappe.session.user)
    user = frappe.get_doc('User', frappe.session.user)

    frappe.local.response["message"] = {
        "success_key": 1,
        "message": "Authentification réussie!",
        "sid": frappe.session.sid,
        "api_key": user.api_key,
        "api_secret": api_generate,
        "username": user.username,
        "email": user.email
    }

    


@frappe.whitelist()
def get_prescripteur(service):
    # Je suppose que l'objectif_visite est stocké dans le doctype "Visites Services" lui-même.
    # Vous devez vous assurer que le nom du champ est correct.
    objectif_visite = frappe.db.get_value('Visites Services', {'service': service}, 'objectif_visite')

    prescripteurs = frappe.db.sql("""SELECT name FROM `tabPrescripteurs` WHERE service=%s""", (service,), as_dict=True)

    # Ajoute l'objectif_visite à chaque prescripteur pour le retour.
    for prescripteur in prescripteurs:
        prescripteur['objectif_visite'] = objectif_visite

    return prescripteurs


