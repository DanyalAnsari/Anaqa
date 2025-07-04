import { assets } from '@/assets/assets'
import Title from '@/components/common/Title'
import React from 'react'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-10">
        <img src={assets.about_img} className='w-full md:max-w-[450px]' />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum excepturi repellendus corporis ab animi? Delectus eveniet, soluta debitis quis fugiat nam temporibus officia aspernatur laborum aliquam commodi, dolorem quam amet.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum eaque tempora minima ipsa blanditiis! Ullam provident, eligendi animi, magni delectus tempora quam soluta quae, dolorem iusto saepe error facilis minus?</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem ratione nisi similique quas dolores perspiciatis odio ea distinctio placeat ipsa laudantium eaque ab, unde cum ullam. Inventore totam ad placeat?</p>
        </div>
      </div>
        <div className="text-xl py-4 text-center">
          <Title text1={'WHY'} text2={'CHOOSE US'}/>
        </div>
        <div className="flex flex-col md:flex-row text-sm mb-20">
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Quality Assurance:</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit iure ipsum voluptates enim provident repellat hic modi, iusto exercitationem sed, quam consequuntur ut, corrupti rerum quos ratione voluptatum ex quod.</p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Convenience:</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit iure ipsum voluptates enim provident repellat hic modi, iusto exercitationem sed, quam consequuntur ut, corrupti rerum quos ratione voluptatum ex quod.</p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Exceptional Customer Service:</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit iure ipsum voluptates enim provident repellat hic modi, iusto exercitationem sed, quam consequuntur ut, corrupti rerum quos ratione voluptatum ex quod.</p>
          </div>
        </div>
    </div>
  )
}

export default About