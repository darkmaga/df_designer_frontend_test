import axios from 'axios'
import useSwr from 'swr'
import useAppContext from '../hooks/useAppContext'
import Select from './ui/Select'

const GraphSettings = () => {
  const { data } = useSwr('api/graphs', (url) =>
    axios<number[]>(url).then((r) => r.data)
  )
  const { setSelectedGraph } = useAppContext()

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
