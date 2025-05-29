import React from 'react'

const Title = ({text1, text2}) => {
  return (
     <div className="inline-flex gap-2 items-center mb-3 text-3xl font-medium">
      <p className="text-neutral">
        {text1} <span className="text-secondary">{text2}</span>
      </p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-slate-700"></p>
    </div>
  )
}

export default Title