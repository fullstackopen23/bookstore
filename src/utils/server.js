import axios from 'axios'

const getBooks = async (query, page, free) => {
  if (!query) return
  try {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${
        page * 10
      }${free ? `&filter=${free}` : ''}`
    )
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export { getBooks }
