const FilterForm = ({filter, onChange}) => {
  return (
      <div>
      Filter shown with: <input onChange={onChange} value={filter}/>
      </div>
  )
}

export default FilterForm