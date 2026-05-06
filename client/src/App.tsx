
const App = () => {
  return (
    <>
<button onClick={() => {
  fetch("localhost:3000/get-data")
    .then(response => response.text())
    .then(data => console.log(data));
}}>Get Data</button>

    </>

  )
}

export default App
