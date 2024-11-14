import React from 'react'

interface TagProps { 
    text: string
}

const Tag:React.FC<TagProps> = ({ text }) => {
  return (
    <div>
        <span className='duration-300 group-hover:bg-blue-700 px-3 py-2 text-xs rounded-full bg-slate-600'> {/* On utilise la propriété id du tag comme clé */}
            {text}
        </span>
    </div>
  )
}

export default Tag
