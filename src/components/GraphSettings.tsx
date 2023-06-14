import axios from 'axios'
import { useState } from 'react'
import useSwr from 'swr'
import useAppContext from '../hooks/useAppContext'
import Select, { Option } from './ui/Select'

const GraphSettings = () => {
  const { data, isLoading } = useSwr('api/graphs', (url) =>
    axios<number[]>(url).then((r) => r.data)
  )
  const { setSelectedGraph, selectedGraph } = useAppContext()
  const [selectValue] = useState<Option | null>(null)

  console.log(data)
  return (
    <div className='fixed top-5 right-5 bg-main-transparent border-main border-2 rounded-md p-10'>
      <Select
        onChange={(e) => {
          setSelectedGraph(e.target.value)
        }}
        options={(data ?? []).map((option) => ({
          label: String(option),
          value: option,
        }))}
      />
    </div>
  )
}

export default GraphSettings
