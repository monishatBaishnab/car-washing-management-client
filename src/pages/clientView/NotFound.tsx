import { Button, Empty, EmptyDescription, EmptyImage, EmptyTitle } from 'keep-react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <Empty>
      <EmptyImage>
        <img
          src="https://staticmania.cdn.prismic.io/staticmania/ed90f683-c1df-4bad-afa4-65ce4c65287e_Property+1%3DSpaceship_+Property+2%3DMd.svg"
          height={234}
          width={350}
          alt="404"
        />
      </EmptyImage>
      <EmptyTitle className="mb-[14px] mt-5">404 Not Found</EmptyTitle>
      <EmptyDescription className="mb-8">
      Oops! The page you're looking for doesn't exist. It might have been moved or deleted. Please check the URL or head back to our homepage. If you need assistance, feel free to contact us.
      </EmptyDescription>
      <Link to="/">
        <Button className='bg-cws-yellow hover:bg-cws-yellow'>Go to home</Button>
      </Link>
    </Empty>
  )
}
