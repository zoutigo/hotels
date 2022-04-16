import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { useTheme } from '@mui/styles'
import { useNavigate } from 'react-router-dom'

import ButtonNavbar from './customs/ButtonNavBar'
import StyledNavLink from './customs/StyledNavLink'
import pages from './constants/pages'
import useStyles from '../style'
import useIslogged from './hook/useIsLogged'

const routesExclusions = [
  '/liste-des-etablissements/slug',
  '/register',
  '/login',
]
const settingsEclusions = [
  '/mon-compte/gestion',
  '/mon-compte/gestion-suite/modification',
  '/mon-compte/administration/etablissements/modification',
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

function Header() {
  const isLogged = useIslogged()
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

  const navigate = useNavigate()
  const { palette } = useTheme()
  const classes = useStyles()

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
                {routes.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <StyledNavLink to={page.path}>
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
              {routes.map((page) => (
                <StyledNavLink key={page.path} to={page.path}>
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
                  {settings.map((setting) => (
                    <MenuItem
                      className={
                        noclickSettings.includes(setting.path)
                          ? classes.noclicksetting
                          : ''
                      }
                      key={setting}
                      onClick={() => {
                        handleCloseUserMenu()
                        navigate(setting.path)
                      }}
                    >
                      {setting.path === '/mon-compte/loggout' ? (
                        <StyledNavLink
                          to={{
                            pathname: setting.path,
                          }}
                        >
                          <ButtonNavbar>{setting.name}</ButtonNavbar>
                        </StyledNavLink>
                      ) : (
                        <Typography textAlign="center">
                          {setting.name}
                        </Typography>
                      )}
                    </MenuItem>
                  ))}
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
