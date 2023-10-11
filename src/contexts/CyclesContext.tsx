import { ReactNode, createContext, useState, useReducer, useEffect } from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import { addNewCycleAction, markCurrentCycleAsFinishedAction, interruptCurrentCycleAction } from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

interface CreateCycleData{
      task: string
      minutesAmount: number
}

interface CyclesContextType{
      activeCycle: Cycle | undefined
      activeCycleId: string | null
      amountSecondsPassed: number
      cycles: Cycle[]
      markCurrentCycleAsFinished: () => void
      setSecondsPassed: (seconds: number) => void
      createNewCicle: (data: CreateCycleData) => void
      interruptCurrentCycle: () => void
}

interface CyclesContextProviderProps{
      children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({ children }: CyclesContextProviderProps){
      const [ cyclesState, dispatch ] = useReducer(cyclesReducer, {
            cycles: [],
            activeCycleId: null
      }, (initialState) => {
            const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')

            if (storedStateAsJSON){
                 return JSON.parse(storedStateAsJSON)
            }

            return initialState
      })

      const { cycles, activeCycleId } = cyclesState
      const activeCycle = cycles.find(cycle => cycle.id == activeCycleId)

      const [ amountSecondsPassed, setAmountSecondsPassed ] = useState(() => {
            if(activeCycle){
                  return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
            }

            return 0
      })

      useEffect(() => {
            const stateJSON = JSON.stringify(cyclesState)

            localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
      }, [cyclesState])

      function setSecondsPassed(seconds: number){
            setAmountSecondsPassed(seconds)
      }

      function markCurrentCycleAsFinished(){
            dispatch(markCurrentCycleAsFinishedAction())
      }

      function createNewCicle(data: CreateCycleData){
            const id = String(new Date().getTime())

            const newCycle: Cycle = {
                  id,
                  task: data.task,
                  minutesAmount: data.minutesAmount,
                  startDate: new Date()
            }

            dispatch(addNewCycleAction(newCycle))

            setAmountSecondsPassed(0)
      }

      function interruptCurrentCycle(){
            dispatch(interruptCurrentCycleAction())
      }

      return(
            <CyclesContext.Provider value={{ 
                  activeCycle, 
                  activeCycleId,  
                  amountSecondsPassed,
                  cycles,
                  markCurrentCycleAsFinished,
                  setSecondsPassed,
                  createNewCicle,
                  interruptCurrentCycle
            }}>
                  {children}
            </CyclesContext.Provider>
      )
}