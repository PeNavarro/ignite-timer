import { HandPalm, Play } from 'phosphor-react'
import { 
      HomeContainer, 
      StartCountdownButton, 
      StopCountdownButton,
} from './styles'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useContext } from 'react'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { CyclesContext } from '../../contexts/CyclesContext'

const newCycleFormValidationSchema = zod.object({
      task: zod.string().min(1, 'Informe a tarefa'),
      minutesAmount: zod.number().min(5, 'Pelo menos 5 minutos né!').max(60, 'Te recomendo no máximo 60 minutos ;)')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home(){
      const { activeCycle, createNewCicle, interruptCurrentCycle } = useContext(CyclesContext)

      const newCycleForm = useForm<NewCycleFormData>({
            resolver: zodResolver(newCycleFormValidationSchema),
            defaultValues: {
                  task: '',
                  minutesAmount: 0
            }
      })

      const { reset, watch, handleSubmit } = newCycleForm

      function handleCreateNewCycle(data: NewCycleFormData){
            createNewCicle(data)
            reset()
      }

      const task = watch('task')
      const isSubmitDisabled = !task

      return(
            <HomeContainer>
                  <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                        <FormProvider {...newCycleForm}> {/* Repassa todas as funções da const newCycleForm como várias propriedades individuais */}
                              <NewCycleForm />
                        </FormProvider>

                        <Countdown />

                        {activeCycle ? (
                              <StopCountdownButton onClick={interruptCurrentCycle} type="button">
                                    <HandPalm size={24} />
                                    Interromper
                              </StopCountdownButton>
                        ): (
                              <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                                    <Play size={24} />
                                    Começar
                              </StartCountdownButton>
                        )}
                  </form>
            </HomeContainer>
      )
}