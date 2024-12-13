// MEdiante un HOC (High order component)
// HOC to fetch data
function withDataFetching(WrappedComponent, url) {
  return function WithDataFetchingComponent(props) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setData(data)
          setLoading(false)
        })
    }, [url])
    return <WrappedComponent data={data} loading={loading} {...props} />
  }
}
// Component using the HOC
function MyComponent({ data, loading }) {
  if (loading) {
    return <p>Loading...</p>
  }
  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}
export default withDataFetching(MyComponent, 'https://api.example.com/data')
