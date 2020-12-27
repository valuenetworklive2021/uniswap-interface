import { ChainId, TokenAmount } from '@valueswap/sdk'
import React, { useMemo } from 'react'
import { X } from 'react-feather'
import styled from 'styled-components'
import tokenLogo from '../../assets/images/token-logo.png'
import { VNTW } from '../../constants'
import { useTotalSupply } from '../../data/TotalSupply'
import { useActiveWeb3React } from '../../hooks'
import { useMerkleDistributorContract } from '../../hooks/useContract'
import useCurrentBlockTimestamp from '../../hooks/useCurrentBlockTimestamp'
import { useTotalVntwEarned } from '../../state/stake/hooks'
import { useAggregateVntwBalance, useTokenBalance } from '../../state/wallet/hooks'
import { ExternalLink, StyledInternalLink, TYPE, VntwTokenAnimated } from '../../theme'
import { computeVntwCirculation } from '../../utils/computeVntwCirculation'
import useUSDCPrice from '../../utils/useUSDCPrice'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import { Break, CardBGImage, CardNoise, CardSection, DataCard } from '../earn/styled'

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
`

const ModalUpper = styled(DataCard)`
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #ff007a 0%, #021d43 100%);
  padding: 0.5rem;
`

const StyledClose = styled(X)`
  position: absolute;
  right: 16px;
  top: 16px;

  :hover {
    cursor: pointer;
  }
`

/**
 * Content for balance stats modal
 */
export default function VntwBalanceContent({ setShowVntwBalanceModal }: { setShowVntwBalanceModal: any }) {
  const { account, chainId } = useActiveWeb3React()
  const vntw = chainId ? VNTW[chainId] : undefined

  const total = useAggregateVntwBalance()
  const vntwBalance: TokenAmount | undefined = useTokenBalance(account ?? undefined, vntw)
  const vntwToClaim: TokenAmount | undefined = useTotalVntwEarned()

  const totalSupply: TokenAmount | undefined = useTotalSupply(vntw)
  const vntwPrice = useUSDCPrice(vntw)
  const blockTimestamp = useCurrentBlockTimestamp()
  const unclaimedVntw = useTokenBalance(useMerkleDistributorContract()?.address, vntw)
  const circulation: TokenAmount | undefined = useMemo(
    () =>
      blockTimestamp && vntw && chainId === ChainId.MAINNET
        ? computeVntwCirculation(vntw, blockTimestamp, unclaimedVntw)
        : totalSupply,
    [blockTimestamp, chainId, totalSupply, unclaimedVntw, vntw]
  )

  return (
    <ContentWrapper gap="lg">
      <ModalUpper>
        <CardBGImage />
        <CardNoise />
        <CardSection gap="md">
          <RowBetween>
            <TYPE.white color="white">Your VNTW Breakdown</TYPE.white>
            <StyledClose stroke="white" onClick={() => setShowVntwBalanceModal(false)} />
          </RowBetween>
        </CardSection>
        <Break />
        {account && (
          <>
            <CardSection gap="sm">
              <AutoColumn gap="md" justify="center">
                <VntwTokenAnimated width="48px" src={tokenLogo} />{' '}
                <TYPE.white fontSize={48} fontWeight={600} color="white">
                  {total?.toFixed(2, { groupSeparator: ',' })}
                </TYPE.white>
              </AutoColumn>
              <AutoColumn gap="md">
                <RowBetween>
                  <TYPE.white color="white">Balance:</TYPE.white>
                  <TYPE.white color="white">{vntwBalance?.toFixed(2, { groupSeparator: ',' })}</TYPE.white>
                </RowBetween>
                <RowBetween>
                  <TYPE.white color="white">Unclaimed:</TYPE.white>
                  <TYPE.white color="white">
                    {vntwToClaim?.toFixed(4, { groupSeparator: ',' })}{' '}
                    {vntwToClaim && vntwToClaim.greaterThan('0') && (
                      <StyledInternalLink onClick={() => setShowVntwBalanceModal(false)} to="/vntw">
                        (claim)
                      </StyledInternalLink>
                    )}
                  </TYPE.white>
                </RowBetween>
              </AutoColumn>
            </CardSection>
            <Break />
          </>
        )}
        <CardSection gap="sm">
          <AutoColumn gap="md">
            <RowBetween>
              <TYPE.white color="white">VNTW price:</TYPE.white>
              <TYPE.white color="white">${vntwPrice?.toFixed(2) ?? '-'}</TYPE.white>
            </RowBetween>
            <RowBetween>
              <TYPE.white color="white">VNTW in circulation:</TYPE.white>
              <TYPE.white color="white">{circulation?.toFixed(0, { groupSeparator: ',' })}</TYPE.white>
            </RowBetween>
            <RowBetween>
              <TYPE.white color="white">Total Supply</TYPE.white>
              <TYPE.white color="white">{totalSupply?.toFixed(0, { groupSeparator: ',' })}</TYPE.white>
            </RowBetween>
            {vntw && vntw.chainId === ChainId.MAINNET ? (
              <ExternalLink href={`https://valuenetworklive2021.github.io/valueswap-info/token/${vntw.address}`}>View VNTW Analytics</ExternalLink>
            ) : null}
          </AutoColumn>
        </CardSection>
      </ModalUpper>
    </ContentWrapper>
  )
}
