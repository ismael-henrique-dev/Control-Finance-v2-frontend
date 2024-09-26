import { createContext, ReactNode, useEffect, useState } from "react"
import { api } from "../services/api"
import { CreateTransactionFormSchema } from "../components/NewTransactionModal/transactionFormSchema"

export interface Transaction {
  Id: string
  Title: string
  Value: number
  Type: "DEP" | "SAL"
  AccountId: string
  CreatedAt: string
  Categories: string
}

interface TransactionsContextType {
  createTransaction: (transaction: CreateTransactionFormSchema) => Promise<void>
  transactions: Transaction[]
  deleteTransaction: (transactionId: string) => Promise<void>
}

interface TransactionsContextProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsContextProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function createTransaction(
    transactionsData: CreateTransactionFormSchema
  ) {
    try {
      const token = localStorage.getItem("@token")
      await api.post("/transaction/create", transactionsData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (err) {
      console.log(err)
    }
  }

  async function fetchTransactions() {
    try {
      const token = localStorage.getItem("@token")
      const { data } = await api.get("/transaction", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTransactions(data.TransactionList)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  async function deleteTransaction(transactionId: string) {
    try {
      const token = localStorage.getItem("@token")

      await api.delete(`/transaction/delete/${transactionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      console.log(`A transação com Id: ${transactionId} foi deletada com sucesso! `)
    } catch (error) {
      console.error(error)
    }
  }

  async function updateTransaction(transactionId: string) {try {
    const token = localStorage.getItem("@token")

    await api.delete(`/transaction/update/${transactionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log(
      `A transação com Id: ${transactionId} foi deletada com sucesso! `
    )
  } catch (error) {
    console.error(error)
  }}

  return (
    <TransactionsContext.Provider value={{ createTransaction, transactions, deleteTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}
