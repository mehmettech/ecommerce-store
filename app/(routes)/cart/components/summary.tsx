import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import Button from '@/components/ui/button'
import Currency from '@/components/ui/currency'
import useCart from '@/hooks/use-cart'
import { toast } from 'react-hot-toast'

const Summary = () => {
  const searchParams = useSearchParams()
  const items = useCart(state => state.items)
  const removeAll = useCart(state => state.removeAll)

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.')
      removeAll()
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.')
    }
  }, [searchParams, removeAll])

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price)
  }, 0)

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    const formData = {
      name,
      address,
      phoneNumber
    }

    try {
      await axios.post('app/api/submitClientInfo', formData)
      console.log('Data sent to the backend successfully.')
    } catch (error) {
      console.error('Error sending data to the backend:', error)
    }
  }
  return (
    <div className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
      <h2 className='text-lg font-medium text-gray-900'>Order summary</h2>
      <div className='mt-6 space-y-4'>
        {/* Your existing summary content */}
        {/* ... */}

        {/* Client Information Form */}
        <form className='max-w-md mx-auto p-4' onSubmit={handleSubmit}>
          <h2 className='text-2xl font-semibold mb-4'>Client Information</h2>
          {/* Name Field */}
          <div>
            <label htmlFor='name' className='block mb-1 font-medium'>
              Name:
            </label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className='w-full border rounded p-2'
            />
          </div>
          {/* Address Field */}
          <div>
            <label htmlFor='address' className='block mb-1 font-medium'>
              Address:
            </label>
            <input
              type='text'
              id='address'
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
              className='w-full border rounded p-2'
            />
          </div>
          {/* Phone Number Field */}
          <div>
            <label htmlFor='phoneNumber' className='block mb-1 font-medium'>
              Phone Number:
            </label>
            <input
              type='tel'
              id='phoneNumber'
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              required
              className='w-full border rounded p-2'
            />
          </div>
        </form>
        {/* End of Client Information Form */}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={items.length === 0}
        className='w-full mt-6'
      >
        Checkout
      </Button>
    </div>
  )
}

export default Summary
