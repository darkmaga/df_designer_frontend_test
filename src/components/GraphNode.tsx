import { NodeInfo } from './Graph'

type Props = {
  nodeInfo: NodeInfo
  nodes: NodeInfo[]
}

const NODE_WIDTH = 120
const NODE_HEIGHT = 60
const NODE_GAP = 80

const getNodeCoordinates = (nodeInfo: NodeInfo) => {
  const x =
    nodeInfo.columnNumber * NODE_WIDTH + nodeInfo.columnNumber * NODE_GAP

  const y =
    nodeInfo.rowNumber * NODE_HEIGHT + (nodeInfo.rowNumber - 1) * NODE_GAP

  return { x, y }
}

const GraphNode = ({ nodeInfo, nodes }: Props) => {
  const { x, y } = getNodeCoordinates(nodeInfo)

  return (
    <>
      <div
        style={{ left: x, top: y }}
        className={
          'w-[120px] p-4 rounded-md bg-secondary-transparent border-secondary border-2 absolute'
        }
      >
        {nodeInfo.name}
      </div>
      <svg className='absolute h-screen w-screen'>
        {nodeInfo.children.map((childNodeId) => {
          const childNode = nodes.find((n) => n.id === childNodeId)
          if (!childNode) return

          const { x: childX, y: childY } = getNodeCoordinates(childNode)

          return (
            <line
              key={`${childNode.id}-line`}
              x1={x + NODE_WIDTH}
              y1={y + NODE_HEIGHT / 2}
              x2={childX}
              y2={childY + NODE_HEIGHT / 2}
              stroke='grey'
              strokeWidth={2}
            />
          )
        })}
      </svg>
    </>
  )
}

export default GraphNode
