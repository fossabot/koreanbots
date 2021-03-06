import { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { ParsedUrlQuery } from 'querystring'

import { BotList } from '@types'
import { get }from '@utils/Query'

import NotFound from '../404'
import { PageCount } from '@utils/Yup'

const Hero = dynamic(() => import('@components/Hero'))
const Advertisement = dynamic(() => import('@components/Advertisement'))
const SEO = dynamic(() => import('@components/SEO'))
const BotCard = dynamic(() => import('@components/BotCard'))
const Container = dynamic(() => import('@components/Container'))
const Paginator = dynamic(() => import('@components/Paginator'))

const Votes:NextPage<VotesProps> = ({ data }) => {
	const router = useRouter()
	if(!data || data.data.length === 0 || data.totalPage < Number(router.query.page)) return <NotFound />
	return <>
		<Hero header='하트 랭킹' description='하트를 많이 받은 봇들의 순위입니다!'/>
		<SEO title='하트 랭킹' description='하트를 많이 받은 봇들의 순위입니다!'/>
		<Container>
			<Advertisement />
			<div className='grid gap-x-4 2xl:grid-cols-4 md:grid-cols-2 mt-20'>
				{
					data.data.map(bot => <BotCard key={bot.id} bot={bot} /> )
				}
			</div>
			<Paginator totalPage={data.totalPage} currentPage={data.currentPage} pathname='/list/votes' />
			<Advertisement />
		</Container>
	</>
}
export const getServerSideProps = async (ctx:Context) => {
	let data: BotList
	if(!ctx.query.page) ctx.query.page = '1'
	const validate = await PageCount.validate(ctx.query.page).then(el => el).catch(() => null)
	if(!validate || isNaN(Number(ctx.query.page))) data = null
	else data = await get.list.votes.load(Number(ctx.query.page))
	return {
		props: {
			data
		}
	}
}

interface VotesProps {
  data: BotList
}

interface Context extends NextPageContext {
	query: URLQuery
}

interface URLQuery extends ParsedUrlQuery {
	page: string
}

export default Votes
