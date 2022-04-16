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

const pages = [
  {
    name: 'Acceuil',
    path: '/',
    access: 'public',
    element: <LandingPage />,
  },
  {
    name: 'Etablissements',
    path: '/liste-des-etablissements',
    access: 'public',
    element: <EtablissementListPage />,
  },
  {
    name: 'Etablissement',
    path: '/liste-des-etablissements/:slug',
    access: 'public',
    element: <EtablissementPage />,
  },
  {
    name: 'Contact',
    path: '/contact',
    access: 'public',
    element: <ContactPage />,
  },
  {
    name: 'Réserver',
    path: '/reservation',
    access: 'public',
    element: <BookingPage />,
  },
  {
    name: 'Mes Mon compte',
    path: '/mon-compte',
    access: 'user',
    element: <AccountPage />,
  },
  {
    name: 'Mes informations',
    path: '/mon-compte/mes-informations',
    access: 'user',
    element: <AccountPage />,
  },
  {
    name: 'Mes reservations',
    path: '/mon-compte/mes-reservations',
    access: 'user',
    element: <BookingListPage />,
  },
  {
    name: 'gestion',
    path: '/mon-compte/gestion',
    access: 'gerant',
    element: <AccountPage />,
  },
  {
    name: 'Gestion des suites',
    path: '/mon-compte/gestion-suite',
    access: 'gerant',
    element: <AccountPage />,
  },
  {
    name: 'Liste des suites',
    path: '/mon-compte/gestion-suite/list',
    access: 'gerant',
    element: <AccountGestionSuiteList />,
  },
  {
    name: 'Creation Suite',
    path: '/mon-compte/gestion-suite/creation',
    access: 'gerant',
    element: <AccountGestionSuiteCreate />,
  },
  {
    name: 'Modification Suite',
    path: '/mon-compte/gestion-suite/modification',
    access: 'gerant',
    element: <AccountGestionSuiteUpdate />,
  },
  {
    name: 'Supprimer Suite',
    path: '/mon-compte/gestion-suite/suppression',
    access: 'gerant',
    element: <AccountGestionSuiteDelete />,
  },
  {
    name: 'Administration',
    path: '/mon-compte/administration',
    access: 'admin',
    element: <AccountPage />,
  },
  {
    name: 'Liste des utilisateurs',
    path: '/mon-compte/administration/utilisateurs',
    access: 'admin',
    element: <AccountAdminUsersList />,
  },
  {
    name: 'Liste des établissements',
    path: '/mon-compte/administration/liste-etablissements',
    access: 'admin',
    element: <AccountAdminHouseList />,
  },
  {
    name: 'Creer un établissement',
    path: '/mon-compte/administration/etablissements/creation',
    access: 'admin',
    element: <AccountAdminHouseCreate />,
  },
  {
    name: 'Modifier un établissement',
    path: '/mon-compte/administration/etablissements/modification',
    access: 'admin',
    element: <AccountAdminHouseUpdate />,
  },
  {
    name: 'Supprimer un établissement',
    path: '/mon-compte/administration/etablissements/suppression',
    access: 'admin',
    element: <AccountAdminHouseDelete />,
  },
  {
    name: 'Deconnection',
    path: '/mon-compte/loggout',
    access: 'user',
    element: <LoggoutPage />,
  },
  {
    name: 'Se Connecter',
    path: '/login',
    access: 'public',
    element: <LoginPage />,
  },
  {
    name: 'Inscription',
    path: '/register',
    access: 'public',
    element: <RegisterPage />,
  },
]

export default pages
