async function get(){

  const res = await fetch("https://api.github.com/users");

  return res.json();

}


export default get;