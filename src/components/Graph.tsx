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
  children: number[]
}

const Graph = () => {
  const { selectedGraph } = useAppContext()
  const { trigger } = useSWRMutation(
    'api/graphs',
    (url, { arg }: { arg: number | string }) =>
      axios.get<Graph>(`${url}/${arg}`).then((r) => r.data)
  )
  const [nodes, setNodes] = useState<NodeInfo[] | null>(null)

  useEffect(() => {
    if (selectedGraph === null) return

    trigger(selectedGraph).then((data) => {
      if (!data) return

      const nodes = data.nodes
      const edges = data.edges

      const neighborMap: Record<string, number> = {}

      const getColumnNumber = (node: Node, columnCount: number): number => {
        const nodeParents = edges.filter((edge) => edge.toId === node.id)
        if (!nodeParents.length) return columnCount

        const nodeParent = nodes[nodeParents[0].fromId]

        return getColumnNumber(nodeParent, 0) + 1
      }

      const getNodeChildren = (node: Node) => {
        const relations = edges.filter((edge) => edge.fromId === node.id)

        return relations.map((edge) => edge.toId)
      }

      const nodesWithInfo = nodes.map<NodeInfo>((node) => {
        const columnNumber = getColumnNumber(node, 0)
        const children = getNodeChildren(node)

        neighborMap[columnNumber] = (neighborMap[columnNumber] ?? 0) + 1

        return {
          ...node,
          children,
          childrenCount: children.length,
          columnNumber,
          rowNumber: neighborMap[columnNumber],
        }
      })

      // const rowLength = nodesWithInfo.filter((n) => n.columnNumber === 0).length
      // const availableRowsMap: Record<string, number[]> = {}

      // const getRowNumber = (
      //   node: Node,
      //   {
      //     childrenCount,
      //     columnNumber,
      //   }: { childrenCount: number; columnNumber: number }
      // ) => {
      //   if (columnNumber === 1) {
      //     let rowNumber

      //     if (childrenCount <= 1) {
      //       rowNumber = availableRowsMap[columnNumber].includes(0)
      //         ? availableRowsMap[columnNumber].includes(rowLength)
      //           ?
      //           : rowLength
      //         : 0
      //     } else {
      //       rowNumber = neighborMap[columnNumber].includes(2) ? 3 : 2
      //     }

      //     neighborMap[columnNumber].push(rowNumber)
      //     return rowNumber
      //   } else {
      //     const singleParent = edges.filter((edge) => edge.toId === node.id)

      //     if (singleParent.length === 1) {
      //     }
      //   }
      // }

      setNodes(nodesWithInfo)
    })
  }, [selectedGraph])

  if (!nodes) return null

  return (
    <div className='relative'>
      {nodes.map((node) => (
        <GraphNode nodeInfo={node} key={node.id} nodes={nodes} />
      ))}
    </div>
  )
}

export default Graph
