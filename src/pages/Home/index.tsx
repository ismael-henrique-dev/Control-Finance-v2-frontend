import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { AccountsContext } from "../../contexts/accountsContext"
import { AccountCard } from "../../components/Cards/AccountCard"
import { GoalCard } from "../../components/Cards/GoalCard"
import { DonutChart } from "./Chart"
import { Summary } from "./HomeSummary"
import { GoalsContext } from "../../contexts/goalsContext"
import { EmptyAccounts } from "../../components/EmptyComponent"
import { LinearProgressCustom } from "../Accounts/styles"
import {
  DefaultContainer,
  EstatisticCard,
  HomeContainer,
  TopContainer,
} from "./styles"

export function Home() {
  const { accountsList, isLoading } = useContext(AccountsContext)
  const { goalsList, isLoadingGoals } = useContext(GoalsContext)
  const goals = [
    ...goalsList.CompletedGoals,
    ...goalsList.ExpiredGoals,
    ...goalsList.unCompletedGoals,
  ]

  return (
    <HomeContainer>
      <DefaultContainer content="center">
        <EstatisticCard>
          <h1>Saldo total</h1>
          <Summary />
        </EstatisticCard>
        <EstatisticCard>
          <h1>Resumo dos depósitos</h1>
          <DonutChart chartType="DEP" />
        </EstatisticCard>
        <EstatisticCard>
          <h1>Resumo dos saques</h1>
          <DonutChart chartType="SAL" />
        </EstatisticCard>
      </DefaultContainer>
      <TopContainer>
        <h1>Contas</h1>
        <NavLink to="/contas">ver mais</NavLink>
      </TopContainer>
      <DefaultContainer content="start">
        <main>
          {accountsList.length === 0 && <EmptyAccounts mensageType="conta" />}
          {isLoading === true ? (
            <LinearProgressCustom />
          ) : (
            accountsList
              .slice(0, 3)
              .map((account) => (
                <AccountCard
                  accountTitle={account.accountTitle}
                  accountId={account.AcId}
                  accountType={account.Type}
                  income={account.DepositValue}
                  outcome={account.WithdrawValue}
                  total={account.sum}
                  isPageAccounts={false}
                  key={account.AcId}
                />
              ))
          )}
        </main>
      </DefaultContainer>
      <TopContainer>
        <h1>Metas</h1>
        <NavLink to="/metas">ver mais</NavLink>
      </TopContainer>
      <DefaultContainer content="start">
        {goals.length === 0 && <EmptyAccounts mensageType="meta" />}
        <main>
          {isLoadingGoals ? (
            <LinearProgressCustom />
          ) : (
            goals
              .slice(0, 3)
              .map((goal, index) => (
                <GoalCard
                  key={index}
                  title={goal.Title}
                  currentValue={goal.Value}
                  targetValue={goal.TargetedValue}
                  goalDate={goal.EndTime}
                  goalId={goal.Id}
                  isGoalsPage={false}
                />
              ))
          )}
        </main>
      </DefaultContainer>
    </HomeContainer>
  )
}
