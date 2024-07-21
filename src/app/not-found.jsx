import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='text-center mt-8'>
      <h2 className='text-xl'>Oops Page Not Found!!!</h2>
      <Link href="/" className='text-blue-500'> Go Back To Home</Link>
    </div>
  )
}