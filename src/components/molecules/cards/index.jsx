import Card from '../card'

const Cards = (props) => {
  const {data} = props
  return (
    <div>
      {data && (
        <div >
          {data.map((item) => {
            return <Card key={item.id} item={item} />
          })}
        </div>
      )}
    </div>
  )
}

export default Cards