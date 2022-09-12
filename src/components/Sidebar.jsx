import React from 'react'
import CreateEventButton from './CreateEventButton'
import Labels from './Labels'
import SmallCalender from './SmallCalender'

const Sidebar = () => {
  return (
    <aside className='border p-5 w-64'>
      <CreateEventButton />
      <SmallCalender />
      <Labels />
    </aside>
  )
}

export default Sidebar