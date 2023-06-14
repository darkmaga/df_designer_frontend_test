import { NodeInfo } from './Graph'

type Props = {
  nodeInfo: NodeInfo
}

const NODE_WIDTH = 120
const NODE_HEIGHT = 60
const NODE_GAP = 40

const GraphNode = ({ nodeInfo }: Props) => {
  const x =
    nodeInfo.columnNumber * NODE_WIDTH + nodeInfo.columnNumber * NODE_GAP

  const y =
    nodeInfo.rowNumber * NODE_HEIGHT + (nodeInfo.rowNumber - 1) * NODE_GAP

  return (
    <div
      style={{ left: x, top: y }}
      className={
        'w-[120px] p-4 rounded-md bg-secondary-transparent border-secondary border-2 absolute'
      }
    >
      {nodeInfo.name}
    </div>
  )
}

export default GraphNode
