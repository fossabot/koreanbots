import Link from 'next/link'

const Button = ({ type='button', className, children, href, onClick }: ButtonProps):JSX.Element => {
	return href ? <Link href={href}>
		<a className={`cursor-pointer rounded-md px-4 py-2 m-2 transition duration-500 ease select-none outline-none foucs:outline-none ${className ?? 'bg-discord-blurple hover:opacity-80 dark:bg-very-black dark:hover:bg-discord-dark-hover text-white'}`}>
			{ children }
		</a>
	</Link> : onClick ? <button type={type} onKeyDown={onClick} onClick={onClick} className={`cursor-pointer rounded-md px-4 py-2 m-2 transition duration-500 ease select-none outline-none foucs:outline-none ${className ?? 'bg-discord-blurple hover:opacity-80 dark:bg-very-black dark:hover:bg-discord-dark-hover text-white'}`}>
		{ children }
	</button> : <button type={type} className={`cursor-pointer rounded-md px-4 py-2 m-2 transition duration-500 ease select-none outline-none foucs:outline-none ${className ?? 'bg-discord-blurple hover:opacity-80 dark:bg-very-black dark:hover:bg-discord-dark-hover text-white'}`}>
		{ children }
	</button>
}

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  className?: string
  children: JSX.Element | string
  href?: string
  onClick?: () => void
}

export default Button