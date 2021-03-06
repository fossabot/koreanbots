import { NextPage } from 'next'
import dynamic from 'next/dynamic'

import { get } from '@utils/Query'
import { BotList } from '@types'

const Hero = dynamic(() => import('@components/Hero'))
const Advertisement = dynamic(() => import('@components/Advertisement'))
const SEO = dynamic(() => import('@components/SEO'))
const BotCard = dynamic(() => import('@components/BotCard'))
const Container = dynamic(() => import('@components/Container'))

const New:NextPage<NewProps> = ({ data }) => {
	return <>
		<Hero header='새로운 봇' description='최근에 한국 디스코드봇 리스트에 추가된 봇들입니다!' />
		<SEO title='새로운 봇' description='최근에 추가된 봇들입니다!' />
		<Container>
			<Advertisement />
			<div className='grid gap-x-4 2xl:grid-cols-4 md:grid-cols-2 mt-20'>
				{
					data.data.map(bot => <BotCard key={bot.id} bot={bot} /> )
				}
			</div>
			<Advertisement />
		</Container>
	</>
}

export const getServerSideProps = async () => {
	const data = await get.list.new.load(1)
	return {
		props: {
			data
		}
	}
}

interface NewProps {
  data: BotList
}

export default New