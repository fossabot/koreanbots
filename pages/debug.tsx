import { useTheme } from 'next-themes'
import { useFormik } from 'formik'

import Container from '../components/Container'
import Divider from '../components/Divider'
import Segment from '../components/Segment'
import Package from '../package.json'
import { anchorHeader, checkBrowser } from '../utils/Tools'
import MarkdownView from 'react-showdown'
import sanitizeHtml from 'sanitize-html'

const ClientInfo = ( ):JSX.Element => {
	const formik = useFormik({
		initialValues: {
			markdown: `<div align="center">
<h1>Hello, World</h1>
</div>
<kbd>X</kbd>키를 눌러 Joy를 표하세요.
\`\`\`
코드 블럭
\`\`\`

*도* **레** ***미*** __***파***__

[트위터](https://twitter.com/koreanbots)
https://github.com/koreanbots
`
		},
		onSubmit: ()=>{ alert('Pong') }
	})
	const { theme, systemTheme } = useTheme()
	return <Container paddingTop className='mb-10'>
		<h1 className='text-4xl font-bold mb-3 mt-3'>개발자모드</h1>
		<h2 className='text-3xl font-semibold mb-4'>정보들</h2>
		<Segment>
			<div className='markdown-body text-black dark:text-white'>
				<h1>빌드정보</h1>
				<ul className='list-disc'>
					<li>버전: <code>{Package.version}</code></li>
				
					<li>
					해시: <a href={`https://github.com/koreanbots/koreanbots/commit/${process.env.NEXT_PUBLIC_COMMIT_HASH}`}><code>{process.env.NEXT_PUBLIC_COMMIT_HASH}</code></a>
					</li>
					<li>브랜치: <code>{process.env.NEXT_PUBLIC_BRANCH}</code></li>
			
				</ul>

				<h1>클라이언트 정보</h1>
				<h2>브라우저</h2>
				<code>{checkBrowser()}</code>
				<h2>User-Agent</h2>
				<pre>{navigator.userAgent}</pre>
				<h2>Darkmode</h2>
				<table>
					<thead>
						<tr>
							<th>Theme</th>
							<th>System Cached</th>
							<th>System</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{theme}</td>
							<td>{localStorage.detected}</td>
							<td>{systemTheme}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</Segment>
		<Divider />
		<h2 className='text-3xl font-semibold mb-2'>테스트</h2>
		<h3 className='text-2xl font-semibold mb-2'>마크다운</h3>
		<Segment>
			<div className='flex'>
				<div className='w-full lg:w-1/2'>
					<textarea className='resize-none w-full h-full dark:bg-discord-dark outline-none p-5' name='markdown' value={formik.values.markdown} onChange={formik.handleChange}/>
				</div>
				<div className='w-full lg:w-1/2 p-10 markdown-body'>
					<MarkdownView markdown={ formik.values.markdown } extensions={[ anchorHeader ]} options={{ openLinksInNewWindow: true, underline: true, emoji: true, omitExtraWLInCodeBlocks: true, literalMidWordUnderscores: true, simplifiedAutoLink: true, tables: true, strikethrough: true, smoothLivePreview: true, tasklists: true, ghCompatibleHeaderId: true, encodeEmails: true }} sanitizeHtml={(html)=> sanitizeHtml(html, {
						allowedTags: false,
						allowedAttributes: false
					})} />
				</div>
			</div>
		</Segment>
	</Container>
}

export default ClientInfo