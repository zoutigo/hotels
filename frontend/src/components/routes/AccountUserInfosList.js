import React from 'react'
import { useTheme, styled } from '@mui/material/styles'
import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material'
import StyledSection from '../customs/StyledSection'
import StyledPage from '../customs/StyledPage'
import Bread from '../customs/Bread'
import PageTitle from '../customs/PageTitle'
import useAppContext from '../hook/useAppContext'

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  width: '50%',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}))

const StyledKeyTypo = styled(Typography)(({ theme }) => ({
  textTransform: 'uppercase',
  letterSpacing: 1,
}))

function AccountUserinfosList() {
  const { palette } = useTheme()
  const {
    state: { userInfo },
  } = useAppContext()

  return (
    <StyledPage>
      <StyledSection background={palette.white.main}>
        <Bread>Mes informations</Bread>

        <PageTitle>Mes informations</PageTitle>

        <StyledTableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <StyledKeyTypo variant="h5">Nom </StyledKeyTypo>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{userInfo?.lastname} </Typography>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <StyledKeyTypo variant="h5">Prénom </StyledKeyTypo>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">
                    {userInfo?.firstname}{' '}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <StyledKeyTypo variant="h5">email </StyledKeyTypo>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{userInfo?.email} </Typography>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <StyledKeyTypo variant="h5">role </StyledKeyTypo>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{userInfo?.roles[0]} </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </StyledTableContainer>
      </StyledSection>
    </StyledPage>
  )
}

export default AccountUserinfosList
