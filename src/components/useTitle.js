import { useState, useEffect } from 'react'

const useTitle = (title) => {
  const [docTitle, setDocTitle] = useState(title);

  useEffect(() => {
    document.title = docTitle;
  }, [docTitle])

  return [docTitle, setDocTitle];
}

export default useTitle;