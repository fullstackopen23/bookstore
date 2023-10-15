export default function Filter({ setPage, page }) {
  return (
    <div className="filterContainer">
      <button
        onClick={() => {
          if (page - 1 < 0) {
            console.log('page -1')
            return
          }
          setPage(page - 1)
        }}
      >
        <span className="material-symbols-outlined">
          arrow_back_ios_new
        </span>
      </button>
      {page + 1}
      <button
        onClick={() => {
          setPage(page + 1)
        }}
      >
        <span className="material-symbols-outlined">
          arrow_forward_ios
        </span>
      </button>
    </div>
  )
}
