import { ReactNode, createContext, useState } from 'react'

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

interface Cycle{
      id: string,
      task: string,
      minutesAmount: number,
      startDate: Date,
      interruptedDate?: Date,
      finishedDate?: Date
}

interface CyclesContextProviderProps{
      children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({ children }: CyclesContextProviderProps){
      const [ cycles, setCycles] = useState<Cycle[]>([])
      const [ activeCycleId, setActiveCycleId ] = useState<string | null>(null)
      const [ amountSecondsPassed, setAmountSecondsPassed ] = useState(0)

      const activeCycle = cycles.find(cycle => cycle.id == activeCycleId)

      function setSecondsPassed(seconds: number){
            setAmountSecondsPassed(seconds)
      }

      function markCurrentCycleAsFinished(){
            setCycles(state => state.map((cycle) => {
                  if(cycle.id == activeCycleId){
                        return {...cycle, finishedDate: new Date()}
                  }else{
                        return cycle
                  }
            }))
      }

      function createNewCicle(data: CreateCycleData){
            const id = String(new Date().getTime())

            const newCycle: Cycle = {
                  id,
                  task: data.task,
                  minutesAmount: data.minutesAmount,
                  startDate: new Date()
            }

            setCycles((state) => [...state, newCycle])
            setActiveCycleId(id)
            setAmountSecondsPassed(0)
      }

      function interruptCurrentCycle(){
            setCycles(state => state.map((cycle) => {
                  if(cycle.id == activeCycleId){
                        return {...cycle, interruptedDate: new Date()}
                  }else{
                        return cycle
                  }
            }))

            setActiveCycleId(null)
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