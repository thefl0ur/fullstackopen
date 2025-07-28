const AddForm = (props) => {
  return (
    <form onSubmit={props.submit}>
      <div>
      name: <input value={props.newName} onChange={props.changeNameInput}/>
      </div>
      <div>
      number: <input value={props.newPhone} onChange={props.changePhoneInput}/>
      </div>
      <div>
      <button type="submit">add</button>
      </div>
    </form>
  )
}

export default AddForm