type AnchorProps = {
    className: string
    href: string
    children: React.ReactNode
}

const Anchor = ({ className, href, children }: AnchorProps) => {
    return (
        <a href={href} className={className}>{children}</a>
    )
}

export default Anchor