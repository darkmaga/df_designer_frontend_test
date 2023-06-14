import axios from 'axios'
import { useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'
import useAppContext from '../hooks/useAppContext'
import GraphNode from './GraphNode'

export type Node = {
  id: number
  name: string
}

export type Edge = {
  fromId: number
  toId: number
}

type Graph = {
  nodes: Node[]
  edges: Edge[]
}

export type NodeInfo = Node & {
  columnNumber: number
  childrenCount: number
  rowNumber: number
}

const Graph = () => {
  const { selectedGraph } = useAppContext()
  const { trigger, data } = useSWRMutation(
    'api/graphs',
    (url, { arg }: { arg: number | string }) =>
      axios.get<Graph>(`${url}/${arg}`).then((r) => r.data)
  )
  const [nodes, setNodes] = useState<NodeInfo[] | null>(null)

  useEffect(() => {
    if (selectedGraph === null) return

    trigger(selectedGraph).then((data) => {
      console.log(data)
      if (!data) return

      const nodes = data.nodes
      const edges = data.edges

      const nodesWithInfo: NodeInfo[] = []
      const neighborMap: Record<string, number> = {}

      const getColumnCount = (node: Node, columnCount: number): number => {
        const nodeParents = edges.filter((edge) => edge.toId === node.id)
        if (!nodeParents.length) return columnCount

        const nodeParent = nodes[nodeParents[0].fromId]

        return getColumnCount(nodeParent, 0) + 1
      }

      const getChildrenCount = (node: Node) => {
        const relations = edges.filter((edge) => edge.fromId === node.id)

        return relations.length
      }

      nodes.forEach((node) => {
        const columnNumber = getColumnCount(node, 0)
        const childrenCount = getChildrenCount(node)

        neighborMap[columnNumber] = (neighborMap[columnNumber] ?? 0) + 1

        nodesWithInfo.push({
          ...node,
          columnNumber,
          childrenCount,
          rowNumber: neighborMap[columnNumber],
        })
      })
      console.log(nodesWithInfo)
      setNodes(nodesWithInfo)
    })
  }, [selectedGraph])

  if (!nodes) return null

  console.log(nodes)

  return (
    <div className='relative'>
      {nodes.map((node) => (
        <GraphNode nodeInfo={node} key={node.id} />
      ))}
    </div>
  )
}

export default Graph
