import LandingPage from '../routes/LandingPage'
import LoginPage from '../routes/LoginPage'
import RegisterPage from '../routes/RegisterPage'
import LoggoutPage from '../routes/LoggoutPage'
import BookingListPage from '../routes/BookingListPage'
import AccountPage from '../routes/AccountPage'
import ContactPage from '../routes/ContactPage'
import EtablissementListPage from '../routes/EtablissementListPage'
import BookingPage from '../routes/BookingPage'
import EtablissementPage from '../routes/EtablissementPage'
import AccountGestionSuiteCreate from '../routes/AccountGestionSuiteCreate'
import AccountGestionSuiteUpdate from '../routes/AccountGestionSuiteUpdate'
import AccountGestionSuiteList from '../routes/AccountGestionSuiteList'
import AccountAdminUsersList from '../routes/AccountAdminUsersList'
import AccountAdminHouseList from '../routes/AccountAdminHouseList'
import AccountAdminHouseCreate from '../routes/AccountAdminHouseCreate'
import AccountAdminHouseUpdate from '../routes/AccountAdminHouseUpdate'
import AccountAdminHouseDelete from '../routes/AccountAdminHouseDelete'
import AccountGestionSuiteDelete from '../routes/AccountGestionSuiteDelete'
import AccountUserinfosList from '../routes/AccountUserInfosList'

const pages = [
  {
    name: 'Acceuil',
    path: '/',
    access: 'public',
    component: LandingPage,
  },
  {
    name: 'Etablissements',
    path: '/liste-des-etablissements',
    access: 'public',
    component: EtablissementListPage,
  },
  {
    name: 'Etablissement',
    path: '/liste-des-etablissements/:slug',
    access: 'public',
    component: EtablissementPage,
  },
  {
    name: 'Contact',
    path: '/contact',
    access: 'public',
    component: ContactPage,
  },
  {
    name: 'Réserver',
    path: '/reservation',
    access: 'public',
    component: BookingPage,
  },
  {
    name: 'Mes Mon compte',
    path: '/mon-compte',
    access: 'user',
    component: AccountPage,
  },
  {
    name: 'Mes informations',
    path: '/mon-compte/mes-informations-liste',
    access: 'user',
    component: AccountUserinfosList,
  },
  {
    name: 'Modifier mes informations',
    path: '/mon-compte/mes-informations-mofifier',
    access: 'user',
    component: AccountUserinfosList,
  },
  {
    name: 'Mes reservations',
    path: '/mon-compte/mes-reservations',
    access: 'user',
    component: BookingListPage,
  },
  {
    name: 'gestion',
    path: '/mon-compte/gestion',
    access: 'gerant',
    component: AccountPage,
  },
  {
    name: 'Gestion des suites',
    path: '/mon-compte/gestion-suite',
    access: 'gerant',
    component: AccountPage,
  },
  {
    name: 'Liste des suites',
    path: '/mon-compte/gestion-suite/list',
    access: 'gerant',
    component: AccountGestionSuiteList,
  },
  {
    name: 'Creation Suite',
    path: '/mon-compte/gestion-suite/creation',
    access: 'gerant',
    component: AccountGestionSuiteCreate,
  },
  {
    name: 'Modification Suite',
    path: '/mon-compte/gestion-suite/modification',
    access: 'gerant',
    component: AccountGestionSuiteUpdate,
  },
  {
    name: 'Supprimer Suite',
    path: '/mon-compte/gestion-suite/suppression',
    access: 'gerant',
    component: AccountGestionSuiteDelete,
  },
  {
    name: 'Administration',
    path: '/mon-compte/administration',
    access: 'admin',
    component: AccountPage,
  },
  {
    name: 'Liste des utilisateurs',
    path: '/mon-compte/administration/utilisateurs',
    access: 'admin',
    component: AccountAdminUsersList,
  },
  {
    name: 'Liste des établissements',
    path: '/mon-compte/administration/liste-etablissements',
    access: 'admin',
    component: AccountAdminHouseList,
  },
  {
    name: 'Creer un établissement',
    path: '/mon-compte/administration/etablissements/creation',
    access: 'admin',
    component: AccountAdminHouseCreate,
  },
  {
    name: 'Modifier un établissement',
    path: '/mon-compte/administration/etablissements/modification',
    access: 'admin',
    component: AccountAdminHouseUpdate,
  },
  {
    name: 'Supprimer un établissement',
    path: '/mon-compte/administration/etablissements/suppression',
    access: 'admin',
    component: AccountAdminHouseDelete,
  },
  {
    name: 'Deconnection',
    path: '/mon-compte/loggout',
    access: 'user',
    component: LoggoutPage,
  },
  {
    name: 'Se Connecter',
    path: '/login',
    access: 'public',
    component: LoginPage,
  },
  {
    name: 'Inscription',
    path: '/register',
    access: 'public',
    component: RegisterPage,
  },
]

export default pages
