import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import { Box, Toolbar, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import IconButton from '@mui/material/IconButton'

import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'

import { useHistory, useLocation } from 'react-router-dom'

import ButtonNavbar from './customs/ButtonNavBar'
import StyledNavLink from './customs/StyledNavLink'
import pages from './constants/pages'

import getRandomKey from './utils/getRandomkey'
import useAppContext from './hook/useAppContext'

const routesExclusions = ['/register', '/login', '/mon-compte/loggout']

const headerRoutes = [
  '/',
  '/liste-des-etablissements',
  '/contact',
  '/reservation',
  '/contact',
]

const settingsEclusions = [
  '/mon-compte/gestion',
  '/mon-compte/gestion-suite/modification',
  '/mon-compte/administration/etablissements/modification',
  '/mon-compte/loggout',
]
const loginRoute = pages.find((page) => page.path === '/login')
const routes = pages.filter(
  (route) => route.access === 'public' && !routesExclusions.includes(route.path)
)
const settings = pages.filter(
  (route) =>
    route.access !== 'public' && !settingsEclusions.includes(route.path)
)

const noclickSettings = [
  '/mon-compte/administration',
  '/mon-compte/gestion',
  '/mon-compte/gestion-suite',
  '/mon-compte',
]

const userSettings = settings.filter(
  (setting) => setting.access === 'user' && !settingsEclusions.includes(setting)
)
const managerSettings = settings.filter(
  (setting) =>
    setting.access === 'gerant' && !settingsEclusions.includes(setting)
)
const adminSettings = settings.filter(
  (setting) =>
    setting.access === 'admin' && !settingsEclusions.includes(setting)
)

function Header() {
  const theme = useTheme()
  const {
    state: { userInfo },
  } = useAppContext()

  const isUser = userInfo && userInfo.exp > new Date().getTime() / 1000

  const isManager =
    userInfo && userInfo?.house && userInfo?.house?.uuid ? true : false
  const isLogged = isUser
  const isAdmin = userInfo && userInfo.roles && userInfo.roles.includes('admin')

  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const { pathname } = useLocation()
  const history = useHistory()
  const { palette } = useTheme()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ background: palette.tertiary.main }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                color: palette.primary.main,
                flexGrow: 1,
              }}
            >
              Green Suits
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {routes
                  .filter((route) => headerRoutes.includes(route.path))
                  .map((page) => (
                    <MenuItem
                      key={getRandomKey(99999999)}
                      onClick={handleCloseNavMenu}
                    >
                      <StyledNavLink
                        to={{
                          pathname: page.path,
                          state: {
                            pagename: page.name,
                            from: pathname,
                            origin: 'header',
                          },
                        }}
                      >
                        <Typography textAlign="center">{page.name}</Typography>
                      </StyledNavLink>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' },
                color: palette.primary.main,
              }}
            >
              LOGO
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'flex-end',
                pr: '4rem',
              }}
            >
              {routes
                .filter((route) => headerRoutes.includes(route.path))
                .map((page) => (
                  <StyledNavLink
                    key={getRandomKey(99999999)}
                    to={{
                      pathname: page.path,
                      state: {
                        pagename: page.name,
                        from: pathname,
                        origin: 'header',
                      },
                    }}
                  >
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,
                        mx: 3,
                        color: palette.secondarytext.main,
                        textTransform: 'capitalize',
                        display: 'block',
                      }}
                    >
                      {page.name}
                    </Button>
                  </StyledNavLink>
                ))}
            </Box>
            {!isLogged ? (
              <StyledNavLink
                to={{
                  pathname: loginRoute.path,
                  state: {
                    from: pathname,
                    pagename: 'Se connecter',
                  },
                }}
              >
                <ButtonNavbar>{loginRoute.name}</ButtonNavbar>
              </StyledNavLink>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {isUser &&
                    userSettings.map((set) => (
                      <MenuItem
                        sx={
                          noclickSettings.includes(set.path)
                            ? {
                                pointerEvents: 'none ! important',
                                bgcolor: theme.palette.tertiary.main,
                              }
                            : {}
                        }
                        key={getRandomKey(999999999)}
                        onClick={() => {
                          handleCloseUserMenu()
                          history.push({
                            pathname: set.path,
                            state: {
                              pagename: set.name,
                              from: pathname,
                            },
                          })
                        }}
                      >
                        <Typography textAlign="center">{set.name}</Typography>
                      </MenuItem>
                    ))}
                  {isManager &&
                    managerSettings.map((set) => (
                      <MenuItem
                        sx={
                          noclickSettings.includes(set.path)
                            ? {
                                pointerEvents: 'none ! important',
                                bgcolor: theme.palette.tertiary.main,
                              }
                            : {}
                        }
                        key={getRandomKey(999999999)}
                        onClick={() => {
                          handleCloseUserMenu()
                          history.push({
                            pathname: set.path,
                            state: {
                              pagename: set.name,
                              from: pathname,
                            },
                          })
                        }}
                      >
                        <Typography textAlign="center">{set.name}</Typography>
                      </MenuItem>
                    ))}
                  {isAdmin &&
                    adminSettings.map((set) => (
                      <MenuItem
                        key={getRandomKey(999999999)}
                        onClick={() => {
                          handleCloseUserMenu()
                          history.push({
                            pathname: set.path,
                            state: {
                              pagename: set.name,
                              from: pathname,
                            },
                          })
                        }}
                      >
                        <Typography textAlign="center">{set.name}</Typography>
                      </MenuItem>
                    ))}

                  <MenuItem>
                    <StyledNavLink
                      to={{
                        pathname: '/mon-compte/loggout',
                        state: {
                          pagename: 'loggout',
                          from: pathname,
                        },
                      }}
                    >
                      <ButtonNavbar>Se deconnceter</ButtonNavbar>
                    </StyledNavLink>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}

export default Header
