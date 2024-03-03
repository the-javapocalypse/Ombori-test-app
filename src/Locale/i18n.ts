import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: {
                    register: {
                        tagline: 'Register with email',
                        haveAccount: 'Already have an account?',
                        createSuccess: 'Account Created',
                        creationMailSent: 'An activation email has been sent to you,',
                        email: 'Email',
                        password: 'Password',
                    },
                    login: {
                        tagline: 'Enter your email and password to login',
                        dontHaveAccount: 'Don\'t have an account?',
                        loginFailed: 'Login Failed',
                        email: 'Email',
                        password: 'Password',
                        invalidCredentials: 'Invalid login credentials'
                    },
                    common: {
                        add: 'Add',
                        edit: 'Update',
                        delete: 'Delete',
                        cancel: 'Cancel',
                        view: 'View',
                        success: 'Success',
                        allRecords: 'All Records',
                        recordDetails: 'Record Details',
                        tryAgain: 'Please try again later',
                        somethingWentWrong: 'Something went wrong',
                        createSuccess: 'Record created successfully',
                        editSuccess: 'Record updated successfully',
                        deleteSuccess: 'Record deleted successfully',
                        genericSuccess: 'Operation completed successfully',
                        addResults: 'Add Results',
                        overview: 'Overview'
                    },
                    module: {
                        register: 'Register',
                        login: 'Login',
                        user: 'Users',
                        report: 'Reports',
                        export: 'Exports',
                        dashboard: 'Dashboard'
                    },
                    user: {
                        lazyLoadCompleted: 'All Users Fetched',
                        firstName: 'First Name',
                        lastName: 'Last Name',
                        email: 'Email',
                        contact: 'Contact',
                        password: 'Password',
                        total: 'Total Users',
                        active: 'Active Users',
                        inactive: 'In-Active Users',
                        userList: 'Users List',
                    },
                }
            },
            de: {
                translation: {
                    register: {
                        tagline: 'Registrieren mit E-Mail',
                        haveAccount: 'Haben Sie bereits ein Konto?',
                        createSuccess: 'Konto erstellt',
                        creationMailSent: 'Eine Aktivierungs-E-Mail wurde an Sie gesendet.',
                        email: 'E-Mail',
                        password: 'Passwort',
                    },
                    login: {
                        tagline: 'Geben Sie Ihre E-Mail und Ihr Passwort ein, um sich anzumelden',
                        dontHaveAccount: 'Haben Sie kein Konto?',
                        loginFailed: 'Anmeldung fehlgeschlagen',
                        email: 'E-Mail',
                        password: 'Passwort',
                        invalidCredentials: 'Ungültige Anmeldeinformationen'
                    },
                    common: {
                        add: 'Hinzufügen',
                        edit: 'Bearbeiten',
                        delete: 'Löschen',
                        cancel: 'Abbrechen',
                        view: 'Ansehen',
                        success: 'Erfolg',
                        allRecords: 'Alle Aufzeichnungen',
                        recordDetails: 'Aufzeichnungsdetails',
                        tryAgain: 'Bitte versuchen Sie es später erneut',
                        somethingWentWrong: 'Etwas ist schief gelaufen',
                        createSuccess: 'Aufzeichnung erfolgreich erstellt',
                        editSuccess: 'Aufzeichnung erfolgreich aktualisiert',
                        deleteSuccess: 'Aufzeichnung erfolgreich gelöscht',
                        genericSuccess: 'Operation abgeschlossen',
                        addResults: 'Ergebnisse hinzufügen',
                        overview: 'Übersicht'
                    },
                    module: {
                        register: 'Registrieren',
                        login: 'Anmelden',
                        user: 'Benutzer',
                        report: 'Berichte',
                        export: 'Exporte',
                        dashboard: 'Dashboard'
                    },
                    user: {
                        lazyLoadCompleted: 'Alle Benutzer abgerufen',
                        firstName: 'Vorname',
                        lastName: 'Nachname',
                        email: 'E-Mail',
                        contact: 'Kontakt',
                        password: 'Passwort',
                        total: 'Gesamtzahl der Benutzer',
                        active: 'Aktive Benutzer',
                        inactive: 'Inaktive Benutzer',
                        userList: 'Benutzerliste',
                    },
                }
            },
            fr: {
                translation: {
                    register: {
                        tagline: 'Inscription par e-mail',
                        haveAccount: 'Vous avez déjà un compte ?',
                        createSuccess: 'Compte créé',
                        creationMailSent: 'Un e-mail d\'activation vous a été envoyé.',
                        email: 'E-mail',
                        password: 'Mot de passe',
                    },
                    login: {
                        tagline: 'Entrez votre e-mail et votre mot de passe pour vous connecter',
                        dontHaveAccount: 'Vous n\'avez pas de compte ?',
                        loginFailed: 'Échec de la connexion',
                        email: 'E-mail',
                        password: 'Mot de passe',
                        invalidCredentials: 'Identifiants de connexion invalides'
                    },
                    common: {
                        add: 'Ajouter',
                        edit: 'Modifier',
                        delete: 'Supprimer',
                        cancel: 'Annuler',
                        view: 'Voir',
                        success: 'Succès',
                        allRecords: 'Tous les enregistrements',
                        recordDetails: 'Détails de l\'enregistrement',
                        tryAgain: 'Veuillez réessayer plus tard',
                        somethingWentWrong: 'Quelque chose s\'est mal passé',
                        createSuccess: 'Enregistrement créé avec succès',
                        editSuccess: 'Enregistrement mis à jour avec succès',
                        deleteSuccess: 'Enregistrement supprimé avec succès',
                        genericSuccess: 'Opération terminée avec succès',
                        addResults: 'Ajouter des résultats',
                        overview: 'Aperçu'
                    },
                    module: {
                        register: 'Inscription',
                        login: 'Connexion',
                        user: 'Utilisateurs',
                        report: 'Rapports',
                        export: 'Exportations',
                        dashboard: 'Tableau de bord'
                    },
                    user: {
                        lazyLoadCompleted: 'Tous les utilisateurs ont été récupérés',
                        firstName: 'Prénom',
                        lastName: 'Nom de famille',
                        email: 'E-mail',
                        contact: 'Contact',
                        password: 'Mot de passe',
                        total: 'Total des utilisateurs',
                        active: 'Utilisateurs actifs',
                        inactive: 'Utilisateurs inactifs',
                        userList: 'Liste des utilisateurs',
                    },
                }
            },


        }
    });

export default i18n;
