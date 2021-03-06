import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { redirectTo } from '@utils/Tools'

const Container = dynamic(() => import('@components/Container'))

const Redirect = ({ to }:RedirectProps):JSX.Element => {
	const router = useRouter()
	if(!to) throw new Error('No Link')
	redirectTo(router, to)
	return <Container paddingTop>
		<div>
			<a href={to} className='text-blue-400'>자동으로 리다이렉트되지 않는다면 클릭해세요.</a>
		</div>
	</Container>
}

interface RedirectProps {
  to: string
}

export default Redirect