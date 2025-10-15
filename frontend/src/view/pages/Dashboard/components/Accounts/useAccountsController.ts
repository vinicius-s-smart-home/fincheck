import { useEffect, useMemo, useState } from 'react'
import { useWindowWidth } from '../../../../../app/hooks/useWindowWidth'
import { useDashboard } from '../DashboardContext/useDashboard'
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts'
import { useTransactions } from '../../../../../app/hooks/useTransactions'
import { TransactionsFilters } from '../../../../../app/services/transactionsService/getAll'

export function useAccountsController() {
  const windowWidth = useWindowWidth()
  const {
    areValuesVisible,
    toggleValueVisibility,
    openNewAccountModal,
  } = useDashboard()

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  })

  const { accounts, isFetching } = useBankAccounts()

  const currentBalance = useMemo(() => {
    return accounts.reduce((total, account) => total + account.currentBalance, 0)
  }, [accounts])

  const filters: TransactionsFilters = {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  }

  const { transactions, isLoading, isInitialLoading, refetchTransactions } = useTransactions(filters)

  const currentRevenue = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.type === "INCOME")
      .reduce((total, transaction) => total + transaction.value, 0)
  }, [transactions])

  const currentExpenses = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.type === "EXPENSE")
      .reduce((total, transaction) => total + transaction.value, 0)
  }, [transactions])

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValueVisibility,
    isLoading: isFetching,
    accounts,
    openNewAccountModal,
    currentBalance,
    currentRevenue,
    currentExpenses,
  }
}
