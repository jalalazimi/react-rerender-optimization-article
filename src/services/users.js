async function get () {
  const res = await fetch('https://api.github.com/users', {
    headers: {
      Authorization: process.env.GITHUB_TOKEN,
    },
  })
  return res.json()
}

export default get;
