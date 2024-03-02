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
                        creationMailSent: 'An activation email has been sent to you,'
                    },
                    login: {
                        tagline: 'Enter your email and password to login',
                        dontHaveAccount: 'Don\'t have an account?',
                        loginFailed: 'Login Failed',
                        invalidCredentials: 'Invalid login credentials'
                    },
                    form: {
                        email: 'Email',
                        password: 'Password'
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
                        addResults: 'Add Results'
                    },
                    environmentVariables: {
                        name: 'Name',
                        value: 'Value',
                        details: 'Environment Variable Details'
                    },
                    module: {
                        register: 'Register',
                        login: 'Login',
                        user: 'Users',
                        boost: 'Boosts',
                        userpick: 'User Picks',
                        userleague: 'User Leagues',
                        league: 'Leagues',
                        country: 'Countries',
                        race: 'Races',
                        driver: 'Drivers',
                        team: 'Teams',
                        environmentVariables: 'Environment Variable',
                        // add new module here %TEMPLATE_MODULE_NAME%
                    },
                    user: {
                        name: 'Name',
                        email: 'Email',
                        contact: 'Contact',
                        isActive: 'Active',
                        isFacebookLinked: 'Facebook Linked',
                        isAppleLinked: 'Apple Linked',
                        isGoogleLinked: 'Google Linked',
                        password: 'Password',
                        token: 'Token',
                        lastLogin: 'Last Login',
                        dob: 'Date Of Birth',
                        gender: 'Gender',
                    },
                    boost: {
                        name: 'Name',
                        min: 'Minimum',
                        max: 'Maximum',
                        config: 'Configurations',
                    },
                    userpick: {
                        userId: 'User',
                        raceId: 'Boost',
                        leagueId: 'League',
                        picks: 'Picks',
                        score: 'Score',
                        isBoost: 'Use Boost',
                        boostId: 'Boost',
                    },
                    userleague: {
                        userId: 'User',
                        leagueId: 'League',
                    },
                    league: {
                        name: 'Name',
                        ownerId: 'Created By',
                        countryId: 'Country',
                        code: 'Invite Code',
                        isPublic: 'Public League',
                    },
                    country: {
                        name: 'Name',
                        flag: 'Flag',
                    },
                    race: {
                        name: 'Name',
                        countryId: 'Country',
                        date: 'Race Day'
                    },
                    driver: {
                        name: 'Name',
                        teamId: 'nan',
                    },
                    team: {
                        name: 'Name',
                        content: 'Content',
                    }// add new module screen items here %TEMPLATE_MODULE_SCREEN_ITEMS%
                }
            },
            de: {
                translation: {
                    description: {
                        part1: 'Ändere <1>src/App.js</1> und speichere um neu zu laden.',
                        part2: 'Lerne React'
                    }
                }
            }
        }
    });

export default i18n;
