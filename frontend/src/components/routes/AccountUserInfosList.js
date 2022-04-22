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
import userInfoRenames from '../constants/renames'

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

  const excludedKeys = ['token', 'iat', 'exp', 'uuid']

  const usefullInfos = Object.entries(userInfo)
    .filter(([key, value]) => !excludedKeys.includes(key))
    .map(([key, value]) => {
      const objectArray = Object.entries(userInfoRenames).find(
        ([k, v]) => k === key
      )

      const newKey = objectArray ? objectArray[1] : key

      return [newKey, value]
    })

  return (
    <StyledPage>
      <StyledSection background={palette.white.main}>
        <Bread>Mes informations</Bread>
        <PageTitle>Mes informations</PageTitle>

        <StyledTableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              {usefullInfos.map(([key, value]) => (
                <TableRow
                  key={key}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <StyledKeyTypo variant="h5">{key} </StyledKeyTypo>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{value} </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </StyledSection>
    </StyledPage>
  )
}

export default AccountUserinfosList
