import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineAddBox } from 'react-icons/md'
import axios from 'axios'
import Spinner from '../components/Spinner'
import BookCardGrid from '../components/Books/BookCardGrid'

function Home() {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios
            .get('http://localhost:5000/api/books')
            .then((res) => {
                setBooks(res.data.data)
                setLoading(false)
            })
            .catch((err) => {
                setBooks.log(err)
                setLoading(false)
            })
    }, [])
    return (
        <article className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Books List</h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox className='text-slate-200 text-4xl' />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    {books?.length
                        ? (
                            <BookCardGrid books={books} />
                        ) : <p>No books to display</p>
                    }
                </>
            )}
        </article>
    )
}

export default Home