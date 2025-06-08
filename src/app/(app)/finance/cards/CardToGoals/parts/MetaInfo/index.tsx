import React from 'react'

interface MetaInfoItem {
  label: string
  value: React.ReactNode
  valueClass?: string
  valueStyle?: React.CSSProperties
  key: string
}

interface MetaInfoProps {
  metaInfo: MetaInfoItem[]
}

const MetaInfo: React.FC<MetaInfoProps> = ({ metaInfo }) => (
  <>
    {metaInfo.map((item) => (
      <div key={item.key} className="flex justify-between items-center">
        <span className="text-[14.5px] font-medium text-white">
          {item.label}
        </span>
        <span className={item.valueClass} style={item.valueStyle}>
          {item.value}
        </span>
      </div>
    ))}
  </>
)

export default MetaInfo
