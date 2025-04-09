'use client'

import { useFormContext } from 'react-hook-form'

type PaymentFormValues = {
  paymentTypes: string[]
  avistaType?: string
  cardType?: string
  installments?: string
  boletoCondition?: string
  observations?: string
}
export const PaymentForm = () => {
  const {
    watch,
    register,
    setValue
  } = useFormContext<PaymentFormValues>()

  const paymentTypes = watch('paymentTypes')
  const cardType = watch('cardType')

  const handleCheckbox = (type: string, checked: boolean) => {
    const current = paymentTypes || []
    const updated = checked
      ? [...current, type]
      : current.filter((t) => t !== type)
    setValue('paymentTypes', updated)
  }

  return (
    <>
      {/* Tipos de pagamento */}
      <div className="flex flex-wrap gap-4 text-black">
        {['À vista', 'Cartão', 'Boleto', 'Cheque'].map((type) => (
          <label key={type} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={paymentTypes?.includes(type)}
              onChange={(e) => handleCheckbox(type, e.target.checked)}
              className="h-4 w-4"
            />
            {type}
          </label>
        ))}
      </div>

      {/* À Vista */}
      {paymentTypes?.includes('À vista') && (
        <div className='text-black'>
          <label className="block mb-1">Tipo de pagamento à vista</label>
          <select {...register('avistaType')} className="w-full border rounded px-3 py-2">
            <option value="">Selecione</option>
            <option value="dinheiro">Dinheiro</option>
            <option value="pix">Pix</option>
          </select>
        </div>
      )}

      {/* Cartão */}
      {paymentTypes?.includes('Cartão') && (
        <>
          <div className='text-black'>
            <label className="block mb-1">Tipo de cartão</label>
            <select {...register('cardType')} className="w-full border rounded px-3 py-2">
              <option value="">Selecione</option>
              <option value="credito">Crédito</option>
              <option value="debito">Débito</option>
            </select>
          </div>

          {cardType === 'credito' && (
            <div className='text-black'>
              <label className="block mb-1">Quantidade de parcelas</label>
              <select {...register('installments')} className="w-full border rounded px-3 py-2">
                <option value="">Selecione</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={(i + 1).toString()}>{i + 1}x</option>
                ))}
              </select>
            </div>
          )}
        </>
      )}

      {/* Boleto ou Cheque */}
      {(paymentTypes?.includes('Boleto') || paymentTypes?.includes('Cheque')) && (
        <div className='text-black'>
          <label className="block mb-1">Condições de pagamento</label>
          <select {...register('boletoCondition')} className="w-full border rounded px-3 py-2">
            <option value="">Selecione</option>
            <option value="30">30 dias</option>
            <option value="30_60">30 e 60 dias</option>
            <option value="30_60_90">30, 60 e 90 dias</option>
          </select>
        </div>
      )}

      {/* Observações */}
      <div className='text-black'>
        <label className="block mb-1">Observações</label>
        <textarea
          {...register('observations')}
          className="w-full border rounded px-3 py-2"
          placeholder="Adicione observações sobre o pagamento..."
        />
      </div>
    </>
  )
}

